import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

import { ServiceError } from '../helpers/error.helper'
import tokenConfig from '../configs/tokenConfig'

import TokenError from '@planetx/constants/errors/token.error.json'

interface JwtPayload {
  phoneNo: string
  iat: number
  exp: number
  jti: string
}

const validateAccessToken = () => (req: Request, res: Response, next: NextFunction) => {
  try {
    const accessToken = String(req.headers.authorization)?.split(' ')[1]
    if (!accessToken) {
      throw new ServiceError(TokenError.ERR_TOKEN_INVALID)
    }

    const tokenData = jwt.verify(String(accessToken), String(process.env.TOKEN_ACCESS_TOKEN_SECRET)) as JwtPayload
    res.locals.phoneNo = tokenData.phoneNo
    next()
  } catch (error: any) {
    if (error?.name === 'TokenExpiredError') {
      next(new ServiceError(TokenError.ERR_TOKEN_TIMEOUT))
    } else {
      next(new ServiceError(TokenError.ERR_TOKEN_INVALID))
    }
  }
}

export default {
  validateAccessToken
}
