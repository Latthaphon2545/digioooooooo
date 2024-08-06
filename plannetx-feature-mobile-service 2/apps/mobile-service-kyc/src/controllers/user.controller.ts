import { NextFunction, Request, Response } from 'express'
import axios from 'axios'
import moment from 'moment'

import { ServiceError } from '../helpers/error.helper'

import { JweDecrypt, cryptoEncrypt, cryptoDecrypt, generateKeyPair } from '@planetx/helpers'
import { UserModel, UserStatus, UserKeyModel, MasterBankModel, UserBankModel } from '@planetx/models'
import UserError from '@planetx/constants/errors/user.error.json'
import BankError from '@planetx/constants/errors/bank.error.json'
import MasterBank from '@planetx/constants/masters/masterBank.json'

const createUser = () => async (req: Request, res: Response, next: NextFunction) => {
  const {
    titleNameTh, firstNameTh, lastNameTh, titleNameEn,
    firstNameEn, lastNameEn, pin, device, email,
    citizenId, passportNumber, alienId, birthDate, countryCode,
    address, province, postCode, occupation, countryOfIncome
  } = req.body

  const phoneNo = res.locals.phoneNo

  try {
    // เช็คคว่ามี user อยู่หรือไม่
    const userKey = await UserKeyModel.findOne({ where: { phoneNo } })
    if (!userKey) {
      throw new ServiceError(UserError.ERR_USER_KEY_NOT_FOUND)
    }

    // decrypt pin
    const decryptPin = await JweDecrypt(JSON.parse(cryptoDecrypt(userKey.privateKey)), pin)

    const query = {
      uid: String(moment.utc().unix()),
      titleNameTh,
      firstNameTh: cryptoEncrypt(firstNameTh),
      lastNameTh: cryptoEncrypt(lastNameTh),
      titleNameEn,
      firstNameEn: cryptoEncrypt(firstNameEn),
      lastNameEn: cryptoEncrypt(lastNameEn),
      phoneNo,
      pin: decryptPin,
      device: cryptoEncrypt(device),
      status: UserStatus.ACTIVE,
      email: cryptoEncrypt(email),
      citizenId: cryptoEncrypt(citizenId),
      passportNumber: cryptoEncrypt(passportNumber),
      alienId: cryptoEncrypt(alienId),
      birthDate,
      countryCode,
      address,
      province,
      postCode,
      occupation,
      countryOfIncome
    }

    // สร้างข้อมูลของ user
    const user = await UserModel.create(query)

    // สร้างข้อมูล user bank
    const bank = await MasterBankModel.findOne({ where: { shortName: MasterBank.SCB.shortName } })
    if (!bank) throw new ServiceError(BankError.ERR_BANK_NOT_FOUND)

    // อัพเดต ข้อมูลที่ใช้ผูกกับ user_key เปลี่ยนจาก phone_no เป็น user.id
    userKey.phoneNo = null
    userKey.userId = user.id
    await userKey.save()

    // เรียก service เพื่อขอรับ accessToken และ refreshToken
    const token = await axios.get(`${process.env.TOKEN_SERVICE_ENDPOINT}/v1/token`, {
      headers: {
        device,
        phoneNo
      }
    })

    await axios.post(`${process.env.WALLET_SERVICE_ENDPOINT}/v1/wallet`,
      { uid: user.uid },
      { 
        headers: { 
          authorization: 'Bearer ' + String(token?.data?.data?.accessToken)
        } 
      }
    )

    res.locals.body = token.data.data

    next()
  } catch (error) {
    next(error)
  }
}

const getUser = () => async (req: Request, res: Response, next: NextFunction) => {
  try {
    const phoneNo = res.locals.phoneNo
    // เช็คคว่ามี user อยู่หรือไม่
    const user = await UserModel.findOne({ where: { phoneNo } })
    if (!user) throw new ServiceError(UserError.ERR_USER_NOT_FOUND)

    res.locals.body = {
      titleNameTh: user.titleNameTh,
      firstNameTh: cryptoDecrypt(user.firstNameTh),
      lastNameTh: cryptoDecrypt(user.lastNameTh),
      titleNameEn: user.titleNameEn,
      firstNameEn: cryptoDecrypt(user.firstNameEn),
      lastNameEn: cryptoDecrypt(user.lastNameEn),
      phoneNo: user.phoneNo,
      citizenId: cryptoDecrypt(user.citizenId),
      passportNumber: cryptoDecrypt(user.passportNumber),
      alienId: cryptoDecrypt(user.alienId),
      birthDate: user.birthDate,
      email: cryptoDecrypt(user.email)
    }

    next()
  } catch (error) {
    next(error)
  }
}

const getExistUserByUid = () => async (req: Request, res: Response, next: NextFunction) => {
  try {
    const uid = req.headers.uid!

    const user = await UserModel.findOne({ where: { uid } })

    if (!user) throw new ServiceError(UserError.ERR_USER_NOT_FOUND)

    res.locals.user = user

    next()
  } catch (error) {
    next(error)
  }
}

const createUserKey = () => async (req: Request, res: Response, next: NextFunction) => {
  const phoneNo = res.locals.phoneNo
  try {
    
    const { publicKey, privateKey } = await generateKeyPair()

    // สร้าง user_key เพื่อใช้ในการเข้าถึง privateKey ของ user แต่ละคนผ่าน phone_no
    await UserKeyModel.create({
      publicKey: cryptoEncrypt(JSON.stringify(publicKey)),
      privateKey: cryptoEncrypt(JSON.stringify(privateKey)),
      phoneNo: phoneNo
    })

    res.locals.body = {
      jwePublicKey: JSON.stringify(publicKey)
    }

    next()
  } catch (error) {
    next(error)
  }
}

const creatUserBank = () => async (req: Request, res: Response, next: NextFunction) => {
  const user = res.locals.user
  const decryptData = res.locals.decryptData
  try {
    if (JSON.parse(decryptData)?.accountNo) {
      const existingUserBank = await UserBankModel.findOne({ where: { bankAccountNumber: JSON.parse(decryptData).accountNo }})
      if (!existingUserBank) {
        await UserBankModel.create({
          userId: user.id,
          bankId: MasterBank.SCB.id,
          bankAccountName: 'test',
          bankAccountNumber: JSON.parse(decryptData).accountNo
        })
      }
    } 
    next()
  } catch (error) {
    next(error)
  }
}

export default {
  createUser,
  getUser,
  getExistUserByUid,
  createUserKey,
  creatUserBank
}
