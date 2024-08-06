import { NextFunction, Request, Response } from 'express'

import { ServiceError } from '../helpers/error.helper'

import { UserModel } from '@planetx/models'
import { cryptoEncrypt } from '@planetx/helpers'
import DeviceError from '@planetx/constants/errors/device.error.json'

const verifyDevice = () => async (req: Request, res: Response, next: NextFunction) => {
  const { device } = req.headers
  const phoneNo = res.locals.phoneNo
  try {
    const getUser = await UserModel.findOne({ where: { phoneNo, device: cryptoEncrypt(String(device)) } })
    if (!getUser) {
      next(new ServiceError(DeviceError.ERR_DEVICE_NOT_FOUND))
    }
    next()
  } catch (error) {
    next(error)
  }
  next()
}

const updateDevice = () => async (req: Request, res: Response, next: NextFunction) => {
  const { device } = req.body
  const phoneNo = res.locals.phoneNo
  try {
    const getUser = await UserModel.findOne({ where: { phoneNo } })

    if (getUser === null) throw new ServiceError(DeviceError.ERR_DEVICE_NOT_FOUND)

    getUser.device = cryptoEncrypt(String(device))
    await getUser.save()

    next()
  } catch (error) {
    next(error)
  }
}

export default {
  verifyDevice,
  updateDevice
}
