import { NextFunction, Request, Response } from 'express'

import { ServiceError } from '../helpers/error.helper'

import { UserModel, UserKeyModel } from '@planetx/models'
import { cryptoDecrypt, cryptoEncrypt } from '@planetx/helpers'
import UserError from '@planetx/constants/errors/user.error.json'

const getUserKey = () => async (req: Request, res: Response, next: NextFunction) => {
  const user: UserModel = res.locals.user!
  try {
    const userKey = await UserKeyModel.findOne({ where: { id: user.id } })
    if (!userKey) {
      throw new ServiceError(UserError.ERR_USER_KEY_NOT_FOUND)
    }

    res.locals.userKey = userKey
    next()
  } catch (error) {
    next(error)
  }
}

const getUser = () => async (req: Request, res: Response, next: NextFunction) => {
  const { device } = req.headers
  const phoneNo = res.locals.phoneNo
  try {
    const user = await UserModel.findOne({ where: { phoneNo, device: cryptoEncrypt(String(device)) } })

    if (!user) throw new ServiceError(UserError.ERR_USER_NOT_FOUND)

    res.locals.body = {
      uid: user.uid,
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

const checkExistingUser = () => async (req: Request, res: Response, next: NextFunction) => {
  const phoneNo = res.locals.phoneNo!
  try {
    const user = await UserModel.findOne({ where: { phoneNo } })

    if (!user) throw new ServiceError(UserError.ERR_USER_NOT_FOUND)

    res.locals.data = {
      titleNameTh: user.titleNameTh,
      firstNameTh: cryptoDecrypt(user.firstNameTh),
      lastNameTh: cryptoDecrypt(user.lastNameTh),
      titleNameEn: user.titleNameEn,
      firstNameEn: cryptoDecrypt(user.firstNameEn),
      lastNameEn: cryptoDecrypt(user.lastNameEn)
    }

    res.locals.user = user
    
    next()
  } catch (error) {
    next(error)
  }
}

export default {
  getUser,
  getUserKey,
  checkExistingUser
}