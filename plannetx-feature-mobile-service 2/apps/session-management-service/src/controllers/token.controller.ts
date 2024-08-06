import { NextFunction, Request, Response } from 'express'
import moment from 'moment'
import { ServiceError } from '../helpers/error.helper'
import TokenError from '@planetx/constants/errors/token.error.json'
import jwt from 'jsonwebtoken'
import tokenConfig from '../configs/tokenConfig'
import { v4 as uuidv4 } from 'uuid'
import { UserModel, UserTokenModel } from '@planetx/models'

interface JwtPayload {
  phoneNo: string
  iat: number
  exp: number
  jti: string
}

const verifyRefreshToken = () => (req: Request, res: Response, next: NextFunction) => {
  try {
    const refreshToken = String((req.headers.refreshToken || req.headers.refreshtoken))?.split(' ')[1]
    if (!refreshToken) throw new ServiceError(TokenError.ERR_TOKEN_INVALID)

    res.locals.refreshToken = refreshToken

    const tokenData = jwt.verify(String(refreshToken), String(tokenConfig.refreshToken.secret)) as JwtPayload
    if (!tokenData) throw new ServiceError(TokenError.ERR_TOKEN_INVALID)

    next()
  } catch (error: any) {
    if (error?.name === 'TokenExpiredError' || error?.name.includes('TokenExpiredError')) {
      // เช็คแค่ว่า refresh token ถูกต้องไหม ไม่สนใจว่าหมดอายุหรือป่าว
      return next()
    } else {
      next(new ServiceError(TokenError.ERR_TOKEN_INVALID))
    }
  }
}

const generateAccessToken = () => (req: Request, res: Response, next: NextFunction) => {
  const accessIssue = moment().utc()
  const accessTokenExpired = moment().utc().add(tokenConfig.accessToken.expired, 'seconds')
  const user = res.locals.user as UserModel
  try {
    const accessToken = jwt.sign({
      phoneNo: user.phoneNo,
      iat: accessIssue.unix(),
      exp: accessTokenExpired.unix(),
      jti: uuidv4()
    }, String(tokenConfig.accessToken.secret))
    res.locals.token = {
      accessToken,
      accessTokenExpired: accessTokenExpired.format('YYYY-MM-DD HH:mm:ss')
    }
    next()
  } catch (error) {
    next(error)
  }
}

const generateRefreshToken = () => (req: Request, res: Response, next: NextFunction) => {
  const accessIssue = moment().utc()
  const refreshTokenExpired = moment().utc().add(tokenConfig.refreshToken.expired, 'seconds')
  try {
    const refreshToken = jwt.sign({
      iat: accessIssue.unix(),
      exp: refreshTokenExpired.unix(),
      jti: uuidv4()
    }, String(tokenConfig.refreshToken.secret))
    res.locals.token = {
      ...res.locals.token,
      refreshToken,
      refreshTokenExpired: refreshTokenExpired.format('YYYY-MM-DD HH:mm:ss')
    }
    next()
  } catch (error) {
    next(error)
  }
}

const saveToken = () => async (req: Request, res: Response, next: NextFunction) => {
  try {
    const refreshToken = String((req.headers.refreshToken || req.headers.refreshtoken))?.split(' ')[1]

    const token = res.locals.token
    const user = res.locals.user as UserModel

    if (refreshToken) {
      const existingToken = await UserTokenModel.findOne({ where: { refreshToken } })
      if (existingToken) {
        await existingToken.update(token)
      } else {
        await UserTokenModel.create({ ...token, userId: user.id })
      }
    } else {
      await UserTokenModel.create({ ...token, userId: user.id })
    }
    next()
  } catch (error) {
    next(error)
  }
}

const findRefreshToken = () => async (req: Request, res: Response, next: NextFunction) => {
  const user = res.locals.user! as UserModel
  try {
    const refreshToken = String((req.headers.refreshToken || req.headers.refreshtoken))?.split(' ')[1]
    if (!refreshToken) throw new ServiceError(TokenError.ERR_TOKEN_INVALID)
    

    const existingToken = await UserTokenModel.findOne({ where: { refreshToken, userId: user.uid } })
    if (!existingToken) throw new ServiceError(TokenError.ERR_TOKEN_NOT_FOUND)
    next()
  } catch (error) {
    next(error)
  }
}

export default {
  verifyRefreshToken,
  generateAccessToken,
  generateRefreshToken,
  saveToken,
  findRefreshToken
}
