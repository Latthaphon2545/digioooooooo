import { NextFunction, Request, Response } from 'express'

import { ServiceError } from '../helpers/error.helper'

import { UserModel } from '@planetx/models'
import UserError from '@planetx/constants/errors/user.error.json'

const getUserByUid = () => async (req: Request, res: Response, next: NextFunction) => {
  try {
    const uid = req.headers.uid!

    const user = await UserModel.findOne({ where: { uid } })

    if (!user) throw new ServiceError(UserError.ERR_USER_NOT_FOUND)

    next()
  } catch (error) {
    next(error)
  }
}

export default {
  getUserByUid
}
