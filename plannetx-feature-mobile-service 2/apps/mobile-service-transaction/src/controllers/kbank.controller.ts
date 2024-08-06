import { NextFunction, Request, Response } from 'express'

import redisClient from '../helpers/redis.helper'
import { kbankRequest, IKbankTopupInquiry } from '../instances/kbank'
import KbankStatusMapping from '../constants/master/kbankStatusMapping.json'

import { TransactionStatus } from '@planetx/models'

const kbankGetAccessToken =
  () => async (req: Request, res: Response, next: NextFunction) => {
    try {
      const uid = req.headers.uid
      if (uid) {
        const kbankAccessToken = await redisClient.GET(`${uid}_KBANK_ACCESS_TOKEN`)
        if (kbankAccessToken) {
          res.locals.accessToken = await redisClient.GET(`${uid}_KBANK_ACCESS_TOKEN`)

          return next()
        }
      }

      const basicAuthen = Buffer.from(process.env.KBANK_CUSTOMER_ID + ':' + process.env.KBANK_CUSTOMER_SECRET).toString('base64')

      const data = new URLSearchParams();
      data.append('grant_type', 'client_credentials')

      const responseToken = await kbankRequest({
        endpoint: 'https://openapi-sandbox.kasikornbank.com',
        path: '/v2/oauth/token',
        method: 'POST',
        data,
        action: 'Token',
        header: {
          'x-test-mode': 'true',
          'env-id': 'OAUTH2',
          'content-type': 'application/x-www-form-urlencoded',
          'authorization': 'Basic ' + basicAuthen
        }
      })

      if (uid) {
        redisClient.SETEX(`${uid}_KBANK_ACCESS_TOKEN`, responseToken.data?.expires_in, responseToken.data?.access_token)
      }
      res.locals.accessToken = responseToken.data?.access_token

      next()
    } catch (error) {
      next(error)
    }
  }

const kbankTopupDeeplink =
  () => async (req: Request, res: Response, next: NextFunction) => {
    const { amount, orderId } = req.body
    const { accessToken } = res.locals
    const reference = res.locals.reference!
    try {

      const requestData = {
          partnerShopID: 'shop001',
          partnerOrderID: orderId,
          partnerPaymentID: 'TEST5678901234567',
          amount: amount,
          currencyCode: 'THB',
          payoutType: 'DELAY',
          switchBackURL: 'https://mpp-kgptest.web.app',
          sourceOfFundMerchantID: 'TEST',
          sourceOfFundShopID: 'TEST'
      }

      const responseData = await kbankRequest({
        endpoint: 'https://openapi-sandbox.kasikornbank.com',
        path: '/v1/mpp/payment/v1/appswitch/kplus',
        method: 'POST',
        data: requestData,
        action: 'Topup Deeplink',
        reference,
        header: {
          'x-test-mode': 'true',
          'PartnerID': process.env.KBANK_PARTNER_ID,
          'ProjectID': process.env.KBANK_PROJECT_ID,
          'ProjectKey': process.env.KBANK_PROJECT_KEY,
          'RequestID': process.env.KBANK_REQUEST_ID,
          'authorization': 'Bearer ' + String(accessToken),
          'env-id': 'mpp-paykplus'
        }
      })

      res.locals.body = {
        reference,
        ...responseData.data
      }

      next()
    } catch (error) {
      next(error)
    }
  }

const kbankTopupInquiry =
  () => async (req: Request, res: Response, next: NextFunction) => {
    // ถ้าทดสอบต้องใช้ partnerPaymentID: PAYMENTQR00000001
    const { partnerPaymentID } = req.body
    const { accessToken } = res.locals
    try {
      const responseData = await kbankRequest({
        endpoint: 'https://openapi-sandbox.kasikornbank.com',
        path: '/v1/mpp/payment/v1/inquiry',
        method: 'POST',
        data: { partnerPaymentID },
        header: {
          'x-test-mode': 'true',
          'PartnerID': process.env.KBANK_PARTNER_ID,
          'ProjectID': process.env.KBANK_PROJECT_ID,
          'ProjectKey': process.env.KBANK_PROJECT_KEY,
          'RequestID': 'req-inqpayment001',
          'authorization': 'Bearer ' + String(accessToken),
          'env-id': 'mpp-inquirypayment'
        }
      })

      const kbankTransaction = responseData.data as IKbankTopupInquiry

      if (kbankTransaction.paymentStatus === KbankStatusMapping.APPROVED) {
        res.locals.tranasctionStatus = TransactionStatus.APPROVED
      } else if (kbankTransaction.paymentStatus === KbankStatusMapping.PENDING) {
        res.locals.tranasctionStatus = TransactionStatus.PENDING
      } else {
        res.locals.tranasctionStatus = TransactionStatus.FAILED
      }

      next()
    } catch (error) {
      next(error)
    }
  }


export default {
  kbankGetAccessToken,
  kbankTopupDeeplink,
  kbankTopupInquiry
}