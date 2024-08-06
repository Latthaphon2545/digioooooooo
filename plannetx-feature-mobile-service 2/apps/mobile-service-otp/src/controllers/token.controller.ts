import { NextFunction, Request, Response } from 'express'
import moment from 'moment'
import jwt from 'jsonwebtoken'
import { v4 as uuidv4 } from 'uuid'

import { ServiceError } from '../helpers/error.helper'
import tokenConfig from '../configs/tokenConfig'

import TokenError from '@planetx/constants/errors/token.error.json'

interface JwtPayload {
  phoneNo: string
  iat: number
  exp: number
  jti: string
}

const generateAccessToken = () => (req: Request, res: Response, next: NextFunction) => {
  const phoneNo = req.headers.phoneNo || req.headers.phoneno
  const accessIssue = moment().utc()
  const accessExpired = moment().utc().add(tokenConfig.accessToken.expired, 'seconds')
  const accessToken = jwt.sign({
    phoneNo,
    iat: accessIssue.unix(),
    exp: accessExpired.unix(),
    jti: uuidv4()
  }, String(tokenConfig.accessToken.secret))
  res.locals.body = {
    accessToken,
    accessExpired
  }
  next()
}

const validateAccessToken = () => (req: Request, res: Response, next: NextFunction) => {
  try {
    const accessToken = String(req.headers.authorization)?.split(' ')[1]
    if (!accessToken) {
      throw new ServiceError(TokenError.ERR_TOKEN_INVALID)
    }

    const tokenData = jwt.verify(String(accessToken), String(tokenConfig.accessToken.secret)) as JwtPayload
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
  generateAccessToken,
  validateAccessToken
}
