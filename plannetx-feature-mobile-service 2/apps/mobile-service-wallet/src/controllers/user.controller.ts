import { NextFunction, Request, Response } from 'express'

import { ServiceError } from '../helpers/error.helper'
import { maskingAccountNumber } from '../helpers/wallet.helper'

import { UserModel, UserBankModel, MasterBankModel } from '@planetx/models'
import UserError from '@planetx/constants/errors/user.error.json'

const getUserByUid = () => async (req: Request, res: Response, next: NextFunction) => {
  try {
    const uid = (req.headers.uid || req.body.uid)!

    const user = await UserModel.findOne({ where: { uid } })

    if (!user) throw new ServiceError(UserError.ERR_USER_NOT_FOUND)

    res.locals.user = user

    next()
  } catch (error) {
    next(error)
  }
}

const getListUserBank = () => async (req: Request, res: Response, next: NextFunction) => { 
  const user = res.locals.user as UserModel
  try {
    const listUserBank = await UserBankModel.findAll({
      where: {
        userId: user.id
      },
      attributes: ['id', 'bankAccountNumber', 'bankAccountName'],
      include: [{
        model: MasterBankModel,
        as: 'bank',
        required: true,
        attributes: ['shortName', 'nameTh', 'nameEn']
      }]
    })

    res.locals.body = listUserBank.map((userBank: UserBankModel) => {
      userBank.bankAccountNumber = maskingAccountNumber(userBank.bankAccountNumber)
      return userBank
    })

    next()
  } catch (error) {
    next(error)
  }
}

export default {
  getUserByUid,
  getListUserBank
}
