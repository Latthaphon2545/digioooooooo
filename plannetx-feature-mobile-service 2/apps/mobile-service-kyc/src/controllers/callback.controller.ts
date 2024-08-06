import { NextFunction, Request, Response } from 'express'

import { ScbError, ServiceError } from '../helpers/error.helper'

import {
  handleAxiosError,
  scbDecryptData
} from '@planetx/helpers'
import { UserBankModel, UserModel } from '@planetx/models'
import MasterBank from '@planetx/constants/masters/masterBank.json'
import UserError from '@planetx/constants/errors/user.error.json'


const scbCallbackResultLinkDebit =
  () => async (req: Request, res: Response, next: NextFunction) => {
    const { body } = req.body
    if (!body.encryptedValue) return next()
      try {
      const decrytData = scbDecryptData(body.encryptedValue, String(process.env.SCB_PUBLIC_KEY))

      if (!JSON.parse(decrytData)?.ref2) return new ServiceError(UserError.ERR_USER_NOT_FOUND) 
      if (JSON.parse(decrytData)?.accountNo) {
        const user = await UserModel.findOne({
          where: { uid: JSON.parse(decrytData).ref2 }
        })
        if (!user) throw new ServiceError(UserError.ERR_USER_NOT_FOUND)

        await UserBankModel.create({
          userId: user.id,
          bankId: MasterBank.SCB.id,
          bankAccountName: 'test',
          bankAccountNumber: JSON.parse(decrytData).accountNo
        })
      } 
      next()
    } catch (error) {
      const errorData = handleAxiosError(error)
      if (errorData) {
        next(new ScbError(errorData))
      } else {
        next(error)
      }
    }
  }

  export default {
    scbCallbackResultLinkDebit
  }