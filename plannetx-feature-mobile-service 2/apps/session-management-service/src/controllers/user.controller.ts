import { NextFunction, Request, Response } from 'express'

import { ServiceError } from '../helpers/error.helper'

import userError from '@planetx/constants/errors/user.error.json'
import deviceError from '@planetx/constants/errors/device.error.json'
import { UserModel } from '@planetx/models'
import { cryptoEncrypt } from '@planetx/helpers'

const findUserByDevice = () => async (req: Request, res: Response, next: NextFunction) => {
  const device = req.headers.device
  try {
    const user = await UserModel.findOne({ where: { device: cryptoEncrypt(String(device)) } })
    if (!user) {
      // ตรวจจาก device ไม่เจอแต่พบว่า refresh token ถูกต้องแสดงว่ามีการเปลี่ยน device ก่อนหน้านี้
      if (res.locals.refreshToken) throw new ServiceError(deviceError.ERR_DEVICE_CHANGE_DETECTED)
      throw new ServiceError(userError.ERR_USER_NOT_FOUND)
    }

    res.locals.user = user

    next()
  } catch (error) {
    next(error)
  }
}

export default {
  findUserByDevice
}
