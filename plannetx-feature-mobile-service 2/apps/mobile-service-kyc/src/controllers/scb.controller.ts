import { NextFunction, Request, Response } from 'express'

import { ServiceError } from '../helpers/error.helper'
import { CustomerProfile } from '../instances/scb'
import redisClient from '../helpers/redis.helper'
import { scbRequest } from '../instances/scb'

import {
  scbEncryptData,
  scbDecryptData,
  momentAsiaBangkok
} from '@planetx/helpers'
import { UserBankModel, UserModel } from '@planetx/models'
import { generateRandomNumber } from '@planetx/commons'
import MasterBank from '@planetx/constants/masters/masterBank.json'
import UserError from '@planetx/constants/errors/user.error.json'

const scbGenerateDeeplink =
  () => async (req: Request, res: Response, next: NextFunction) => {
    try {

      const responseRedirectApi = await scbRequest({
        endpoint: 'https://api-sandbox.partners.scb',
        path: '/partners/sandbox/v2/oauth/authorize',
        method: 'GET',
        action: 'KYC Deeplink',
        header: {
          apikey: process.env.SCB_API_KEY,
          apisecret: process.env.SCB_SECRET_KEY,
          endState: 'mobile_app',
          'response-channel': 'mobile',
          'accept-language': 'EN'
        }
      })

      res.locals.body = responseRedirectApi.data?.data

      next()
    } catch (error) {
      next(error)
    }
  }

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

const scbGetCustomerDetail =
  () => async (req: Request, res: Response, next: NextFunction) => {
    const { accessToken } = res.locals
    const phoneNo = res.locals.phoneNo
    try {

      const responseCustomerDetail = await scbRequest({
        endpoint: 'https://api-sandbox.partners.scb',
        path: '/partners/sandbox/v2/customers/profile',
        method: 'GET',
        action: 'Customer Detail',
        header: {
          authorization: 'Bearer ' + String(accessToken)
        }
      })

      const customerProfile: CustomerProfile =
        responseCustomerDetail.data?.data?.profile

      res.locals.citizenID = customerProfile.citizenID

      res.locals.body = {
        ...res.locals.body,
        titleNameTh: customerProfile.thaiTitle,
        firstNameTh: customerProfile.thaiFirstName,
        lastNameTh: customerProfile.thaiLastName,
        titleNameEn: customerProfile.engTitle,
        firstNameEn: customerProfile.engFirstName,
        lastNameEn: customerProfile.engLastName,
        phoneNo: customerProfile.mobile,
        citizenId: customerProfile.citizenID,
        passportNumber: customerProfile.passportNumber,
        alienId: customerProfile.alienID,
        birthDate: customerProfile.birthDate,
        email: customerProfile.email,
        countryCode: customerProfile.address?.countryCode,
        address: customerProfile.address?.thaiAddressThanon,
        province: customerProfile.address?.thaiAddressProvince,
        postCode: customerProfile.address?.zipCode
      }

      next()
    } catch (error) {
      next(error)
    }
  }

const scbGetUserByCitizenID =
  () => async (_req: Request, res: Response, next: NextFunction) => {
    try {
      // const citizenID = res.locals.citizenID!

      // const responseRedirectApi = await axios.get(`https://intapigw-sit.se.scb.co.th:8448/scb/rest/ent-api/v1/party/cust-profile/individuals/findByCitizenID?citizenID=${citizenID}`, {
      //   headers: {
      //     'apikey': process.env.SCB_CITIZEN_API_KEY,
      //     'resourceOwnerId': process.env.SCB_CITIZEN_API_KEY,
      //     'apisecret': process.env.SCB_CITIZEN_SECRET_KEY,
      //     'requestUId': uuidv4()
      //   }
      // })
      const responseRedirectApi = {
        pagination: {
          pagingLimit: 20,
          pagingOffset: '1',
          previousPage: {
            pagingOffset: '250',
            href: '/v1/xxx'
          },
          firstPage: {
            pagingOffset: '250',
            href: '/v1/xxx'
          },
          lastPage: {
            pagingOffset: '250',
            href: '/v1/xxx'
          },
          nextPage: {
            pagingOffset: '250',
            href: '/v1/xxx'
          }
        },
        items: [
          {
            marketingSMSFlag: 'TMP',
            lastUpdateDate: '2012-04-23T18:25:43.511Z',
            thaiSuffixTitle: '..',
            engFullTitle: 'Somchai Saetang',
            marketingDirectMailFlag: 'TMP',
            maritalStatusCode: 'M',
            nationalityCode: 'TH',
            engLastName: 'Saetang',
            childrenFlag: '01',
            taxID: '5467628374',
            partnerID: '00006051',
            thaiMiddleName: '',
            passportNumber: 'AT126547',
            marketingEmailFlag: 'TMP',
            CountrySourceOfIncome: 'TH',
            workPositionCode: '003',
            occupationDetail: '',
            engMiddleName: 'Middle',
            thaiTitle: '',
            thaiFirstName: '',
            genderCode: 'M',
            engSuffixTitle: 'RTN.',
            lastUpdateUser: 'S2312467',
            citizenID: '3177495768774',
            religionCode: '01',
            marketingPhoneFlag: 'TMP',
            SCBStaffFlag: 'E',
            businessUnitOwnerCode: '3720',
            statusCode: 'AC',
            engTitle: 'Mr.',
            thaiSearchName: ' ',
            riskLevel: {
              reason: '01',
              level: 1
            },
            ocOverrideFlag: 'Y',
            thaiName: ' ',
            actualIncome: 1000000,
            customerTypeCode: '11',
            SCBStaffID: 'S003845',
            engSearchName: 'Somchai Saetang',
            engName: 'Somchai Saetang',
            educationLevel: '18',
            incomeRangeCode: '7',
            customerSegment: '91',
            engFirstName: 'Somchai',
            thaiLastName: '',
            internalPersonalID: '111222333555',
            alienID: '9994765',
            firstAcctOpenBranch: '0111',
            thaiFullTitle: ' ',
            internetUsageCode: 'Y',
            ISICCode: 'A010000',
            birthDate: '1965-03-25',
            occupationCode: '01',
            monitorCode: '101',
            spouseName: ' ',
            relations: [
              {
                corporateProfile: '',
                custTypeCode: 'I',
                custRelationCode: 'BUSDIR',
                lastUpdateDate: '2012-04-23T18:25:43.511Z',
                personProfile: '',
                name: 'Somchai Saetang',
                relatedPartnerID: '00000023432881',
                lastUpdateUser: 'S2312467',
                partnerID: '00006051'
              }
            ]
          }
        ]
      }
      res.locals.body.credit = responseRedirectApi
      next()
    } catch (error) {
      next(error)
    }
  }

const scbLinkDirectDebit =
  () => async (req: Request, res: Response, next: NextFunction) => {
    const { accessToken } = res.locals
    const uid = req.headers.uid
    try {
      const regRef = momentAsiaBangkok().format('YYYYMMDDHHmmssSSS') + generateRandomNumber(3)
      const ref1 = momentAsiaBangkok().format('YYYYMMDDHHmmssSSS') + generateRandomNumber(3)
      const preEncrpytData = {
        regRef,
        ref1,
        ref2: uid,
        backUrl: 'https://scbeasy.com/v1/kyc/callback/scb/direct'
      }
      const encryptData = scbEncryptData(preEncrpytData, String(process.env.SCB_PUBLIC_KEY))

      const responseRedirectApi = await scbRequest({
        endpoint: 'https://api-sandbox.partners.scb',
        path: '/partners/sandbox/v1/registration/web/init',
        method: 'POST',
        action: 'Debit Register',
        data: {
          merchantId: '6391081084',
          subAccountId: '827375892904',
          encryptedValue: encryptData
        },
        header: {
          authorization: 'Bearer ' + String(accessToken)
        }
      })

      res.locals.body = {
        webUrl: responseRedirectApi?.data?.data?.registrationResponse?.webUrl,
        regRef,
        ref1
      }
      next()
    } catch (error) {
      next(error)
    }
  }


const scbInquiryRegisterStatus =
  () => async (req: Request, res: Response, next: NextFunction) => {
    const { regRef } = req.body
    const { accessToken } = res.locals
    try {
      const encryptData = scbEncryptData({regRef}, String(process.env.SCB_PUBLIC_KEY))

      const responseRedirectApi = await scbRequest({
        endpoint: 'https://api-sandbox.partners.scb',
        path: '/partners/sandbox/v1/registration/inquiry',
        method: 'POST',
        data: {
          merchantId: '6391081084',
          encryptedValue: encryptData
        },
        action: 'Inquiry Register',
        header: {
          authorization: 'Bearer ' + String(accessToken)
        }
      })

      const scbResponse = responseRedirectApi.data.data
      const decrytData = scbDecryptData(scbResponse.encryptedValue, String(process.env.SCB_PUBLIC_KEY))

      res.locals.decryptData = decrytData
      next()
    } catch (error) {
      next(error)
    }
  }

export default {
  scbGenerateDeeplink,
  scbGetAccessToken,
  scbGetCustomerDetail,
  scbGetUserByCitizenID,
  scbLinkDirectDebit,
  scbInquiryRegisterStatus
}
