import { NextFunction, Request, Response } from 'express'
import moment from 'moment'
import { customAlphabet } from 'nanoid'

import { ServiceError } from '../helpers/error.helper'

import { OTPModel } from '@planetx/models'
import OTPError from '@planetx/constants/errors/otp.error.json'

// import otterio from '../instances/otterio'

const generateOtp = () => async (req: Request, res: Response, next: NextFunction) => {
  const phoneNo = req.headers.phoneNo || req.headers.phoneno

  // const otp = customAlphabet('0123456789')(6)
  const otp = '000000'
  const reference = customAlphabet('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')(6)
  try {
    const query = {
      phoneNo: String(phoneNo),
      otp,
      reference,
      isPass: false,
      attempt: 0,
      expiredAt: moment().add(5, 'minute').format('YYYY-MM-DD HH:mm:ss')
    }

    const getExistingOtp = await OTPModel.findOne({ where: { phoneNo } })

    if (getExistingOtp !== null) {
      getExistingOtp.otp = query.otp
      getExistingOtp.reference = query.reference
      getExistingOtp.isPass = false
      getExistingOtp.attempt = 0
      getExistingOtp.expiredAt = moment().add(5, 'minute').format('YYYY-MM-DD HH:mm:ss')

      await getExistingOtp.save()
    } else {
      await OTPModel.create(query)
    }

    // /*send sms
    // const message = `รหัส OTP ของท่านคือ ${otp}\n(Ref: ${reference})\nOTP ของท่านจะหมดอายุในอีก 5 นาที`
    // await otterio.http.request({
    //   method: 'POST',
    //   url: '/sms',
    //   data: {
    //     preserve: process.env.OTTERIO_PRESERVE === 'true',
    //     msisdn: '0643300584',
    //     message,
    //     sender_name: 'DigiPay'
    //   }
    // })
    // */
    res.locals.reference = reference
    next()
  } catch (error) {
    next(error)
  }
}

const verifyOtp = () => async (req: Request, res: Response, next: NextFunction) => {
  const { otp } = req.body
  const phoneNo = res.locals.phoneNo

  try {
    const getOtpByPhoneNo = await OTPModel.findOne({ where: { phoneNo } })
    if (getOtpByPhoneNo === null) {
      throw new ServiceError(OTPError.ERR_USER_OTP_NOT_FOUND)
    }
    // else if (getOtpByPhoneNo.isPass) {
    //   throw new ServiceError(OTPError.ERR_USER_USE_EXIST_PASS_OTP)
    // }
    else if (getOtpByPhoneNo.attempt >= 3) {
      throw new ServiceError(OTPError.ERR_USER_OTP_OVER_LIMIT)
    } else {
      if (String(otp) === getOtpByPhoneNo.otp) {
        const expired = moment(getOtpByPhoneNo.expiredAt as string)
        if (!moment().isAfter(expired)) {
          getOtpByPhoneNo.attempt = 0
          getOtpByPhoneNo.isPass = true
          await getOtpByPhoneNo.save()
        } else {
          throw new ServiceError(OTPError.ERR_USER_OTP_EXPIRED)
        }
      } else {
        getOtpByPhoneNo.attempt = getOtpByPhoneNo.attempt + 1
        await getOtpByPhoneNo.save()
        throw new ServiceError(OTPError.ERR_USER_OTP_INCORRECT)
      }
    }

    next()
  } catch (error) {
    next(error)
  }
  next()
}

export default {
  generateOtp,
  verifyOtp
}
