import { NextFunction, Request, Response } from 'express'

import { ServiceError } from '../helpers/error.helper'

import { UserBankModel } from '@planetx/models'
import bankError from '@planetx/constants/errors/bank.error.json'

const getUserBankById = () => async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { bankId } = req.body
    const userBank = await UserBankModel.findOne({ where: { id: bankId } })

    if (!userBank) throw new ServiceError(bankError.ERR_USER_BANK_NOT_FOUND)

    res.locals.userBank = userBank

    next()
  } catch (error) {
    next(error)
  }
}

export default {
  getUserBankById
}
