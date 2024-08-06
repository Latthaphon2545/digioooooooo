import { NextFunction, Request, Response } from 'express'
import moment from 'moment'

import scbStatusMapping from '../constants/master/scbStatusMapping.json'
import  scbTransferMasterStatus from '../constants/master/scbTransferMasterStatus.json'
import redisClient from '../helpers/redis.helper'
import { scbRequest } from '../instances/scb'

import { TransactionStatus, UserBankModel } from '@planetx/models'
import { momentAsiaBangkok, scbEncryptData, scbDecryptData } from '@planetx/helpers'
import MasterBankCode from '@planetx/constants/masters/masterBankCode.json'

const scbGetAccessToken =
  () => async (req: Request, res: Response, next: NextFunction) => {
    try {
      const uid = req.headers.uid
      if (uid) {
        const scbAccessToken = await redisClient.GET(`${uid}_SCB_ACCESS_TOKEN`)
        if (scbAccessToken) {
          res.locals.accessToken = await redisClient.GET(`${uid}_SCB_ACCESS_TOKEN`)

          return next()
        }
      }

      const responseToken = await scbRequest({
        endpoint: 'https://api-sandbox.partners.scb',
        path: '/partners/sandbox/v1/oauth/token',
        method: 'POST',
        action: 'Token',
        data: {
          applicationKey: process.env.SCB_API_KEY,
          applicationSecret: process.env.SCB_SECRET_KEY
        }
      })

      if (uid) {
        redisClient.SETEX(`${uid}_SCB_ACCESS_TOKEN`, responseToken.data?.data?.expiresIn , responseToken.data?.data?.accessToken)
      }
      res.locals.accessToken = responseToken.data?.data?.accessToken

      next()
    } catch (error) {
      next(error)
    }
  }

const scbTopupDirectDebit = () => async (req: Request, res: Response, next: NextFunction) => {
  const { amount } = req.body
  const { accessToken } = res.locals
  try {
    const reference = res.locals.reference!
    const userBank = res.locals.userBank!

    // เรียก service bank เพื่อทำการโอนเงินเข้า wallet
    const mockRequetsData = {
      refNumber: reference,
      refDateTime: momentAsiaBangkok().format('YYYYMMDDHHmmss'),
      amount,
      currency: 'THB',
      accountNumber: userBank.bankAccountNumber
    }
    const encryptReqeust = scbEncryptData(mockRequetsData, String(process.env.SCB_PUBLIC_KEY))

    const responseRedirectApi = await scbRequest({
      endpoint: 'https://api-sandbox.partners.scb',
      path: '/partners/sandbox/v1/payment/direct/ddpay',
      method: 'POST',
      action: 'Topup Direct Debit',
      reference,
      data: {
        merchantId: '6391081084',
        subAccountId: '827375892904',
        encryptedValue: encryptReqeust
      },
      header: {
        authorization: 'Bearer '+ String(accessToken)
      }
    })

    const { encryptedValue } = responseRedirectApi.data.data

    const resultDecrypt = scbDecryptData(encryptedValue, String(process.env.SCB_PUBLIC_KEY))
    const paymentResponse = JSON.parse(resultDecrypt)

    res.locals.tranasctionStatus = paymentResponse.statusCode === "1000" ? TransactionStatus.APPROVED : TransactionStatus.PENDING

    next()
  } catch (error) {
    next(error)
  }
}

const scbTopupDeeplink = () => async (req: Request, res: Response, next: NextFunction) => {
  const { amount } = req.body
  const { accessToken } = res.locals
  const reference = res.locals.reference!
  try {
    const responseRedirectApi = await scbRequest({
      endpoint: 'https://api-sandbox.partners.scb',
      path: '/partners/sandbox/v3/deeplink/transactions',
      method: 'POST',
      action: 'Topup Deeplink',
      reference,
      data: {
        "transactionType": "PURCHASE",
        "transactionSubType": ["BP"],
        "sessionValidityPeriod": 60,
        "sessionValidUntil": "",
        "billPayment": {
            "paymentAmount": amount,
            "accountTo": "253746897374654",
            "ref1": "ABCDEFGHIJ1234567890",
            "ref2": "ABCDEFGHIJ1234567890",
            "ref3": "BZF"
        },
        "merchantMetaData": {
            "callbackUrl": "plannetx://welcome",
            "merchantInfo": {
              "name": "SANDBOX MERCHANT NAME"
          }
        }
      },
      header: {
        authorization: 'Bearer '+ String(accessToken),
        channel: 'scbeasy'
      }
    })
    
    res.locals.body = {
      reference,
      ...responseRedirectApi.data.data
    }
    next()
  } catch (error) {
    next(error)
  }
}

const scbTopupInquiry = () => async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { transactionId, reference } = req.body
    const { accessToken } = res.locals

    const responseTransaction = await scbRequest({
      endpoint: 'https://api-sandbox.partners.scb',
      path: '/partners/sandbox/v2/transactions/' + transactionId,
      method: 'GET',
      reference,
      action: 'Topup Inquiry',
      header: {
        authorization: 'Bearer '+ String(accessToken)
      }
    })

    const scbTransaction = responseTransaction.data.data

    if (scbTransaction.statusCode === scbStatusMapping.APPROVED){ 
      res.locals.tranasctionStatus = TransactionStatus.APPROVED
    } else if (scbTransaction.statusCode === scbStatusMapping.PENDING) {
      res.locals.tranasctionStatus = TransactionStatus.PENDING
    } else {
      res.locals.tranasctionStatus = TransactionStatus.FAILED
    }
    next()
  } catch (error) {
    next(error)
  }
}

const scbTransferInitial =
  () => async (req: Request, res: Response, next: NextFunction) => {
    const { accessToken } = res.locals
    const { amount } = req.body
    const userBank = res.locals.userBank! as UserBankModel
    try {
      const requestData = {
        "transactionType": "DR",
        "corporateId": "",
        "corporateName": "",
        "payer": {
            "accountInfo": {
                "accountNo": process.env.SCB_BANK_ACCOUNT_NUMBER,
                "bankCode": MasterBankCode.SCB
            },
            "taxId": "123456"
        },
        "payee": {
            "accountInfo": {
                "accountNo": userBank.bankAccountNumber,
                "bankCode": MasterBankCode.SCB
            },
            "taxId": "123456"
        },
        "tranAmount": {
            "amount": amount,
            "currency": "THB"
        },
        "fee": {
            "amount1": 0.00
        },
        "additionalNote": "NOTE",
        "annotation": "Annotation",
        "instructionIdentification": "test"
      }

      const responseData = await scbRequest({
        // endpoint: 'https://api-sandbox.partners.scb',
        endpoint: 'https://natdanai.app.n8n.cloud/webhook',
        path: '/partners/v2/payment/transfer/credit/initiate',
        method: 'POST',
        action: 'Transfer Initial',
        data: requestData,
        header: {
          authorization: 'Bearer '+ String(accessToken)
        }
      })

      res.locals.body = {
        reference: res.locals.reference,
        ...responseData.data.data[0]
      }

      next()
    } catch (error) {
      next(error)
    }
  }

const scbTransferConfirm =
  () => async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { tokenizerId } = req.body
      const { accessToken } = res.locals
      const requestData = {
        tokenizerId,
        transactionDateTime: moment().format('YYYY-MM-DDTHH:mm:ss.SSSZ')
      }

      // const responseData = await scbRequest({
      //   endpoint: 'https://api-sandbox.partners.scb',
      //   path: '/partners/v2/payment/transfer/confirm',
      //   method: 'POST',
      //   action: 'Transfer Confirm',
      //   data: requestData,
      //   header: {
      //     authorization: 'Bearer '+ String(accessToken)
      //   }
      // })
      const responseData = {
        data: {
          data: [
            {
              "tokenizerId":"D014917201627108",
              "channelDateTime":"2019-06-21T14:49:38.754+07:00"
            }
          ]
        }
      }

      res.locals.body = responseData.data.data

      next()
    } catch (error) {
      next(error)
    }
  }

const scbTransferInquiry =
  () => async (req: Request, res: Response, next: NextFunction) => {
    const { tokenizerId } = req.body
    const { accessToken } = res.locals
    try {
      const requestData = {
        transactionDateTime: moment().format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
        instructionIdentification: 'WAITING',
        tokenizerId
      }
      // const responseData = await scbRequest({
      //   endpoint: 'https://api-sandbox.partners.scb',
      //   path: '/partners/v2/payment/transfer/confirm',
      //   method: 'POST',
      //   action: 'Transfer Inquiry',
      //   data: requestData,
      //   header: {
      //     authorization: 'Bearer '+ String(accessToken)
      //   }
      // })
      const resopnseData = {
        data: {
          data: [
          {
            "paymentInformation": [
              {
                "originalPaymentInformationAndStatus": [
                  { 
                    "transactionInformation": {
                      "transactionStatus":"ACCC", 
                      "errorCode":"000", 
                      "errorDescription":"Success", 
                      "businessTransactionReference":"1234567890"
                    } 
                  }
                ]
              }
            ]
          }]
        }
      }

      const scbTransaction = resopnseData.data.data[0].paymentInformation[0].originalPaymentInformationAndStatus[0]
      const scbResponseStatus = scbTransaction.transactionInformation.transactionStatus

      if (scbResponseStatus === scbTransferMasterStatus.APPROVED) {
        res.locals.tranasctionStatus = TransactionStatus.APPROVED
      } else if (scbResponseStatus === scbTransferMasterStatus.PENDING) {
        res.locals.tranasctionStatus = TransactionStatus.PENDING
      } else {
        res.locals.tranasctionStatus = TransactionStatus.FAILED
      }

      res.locals.data = resopnseData
      next()
    } catch (error) {
      next(error)
    }
  }


export default {
  scbGetAccessToken,
  scbTopupDirectDebit,
  scbTopupDeeplink,
  scbTopupInquiry,
  scbTransferInitial,
  scbTransferConfirm,
  scbTransferInquiry
}