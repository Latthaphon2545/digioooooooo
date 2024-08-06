import { NextFunction, Request, Response } from 'express'

import { ServiceError } from '../helpers/error.helper'

import { UserModel } from '@planetx/models'
import { compareHash, generateHash, JweDecrypt, cryptoDecrypt, validatePin } from '@planetx/helpers'
import PinError from '@planetx/constants/errors/pin.error.json'

const verifyPIN = () => async (req: Request, res: Response, next: NextFunction) => {
  const { pin } = req.body
  const userKey = res.locals.userKey
  const user: UserModel = res.locals.user!

  try {
    if (process.env.NODE_ENV === 'dev' && pin === '000000') return next()

    const decryptPin = await JweDecrypt(JSON.parse(cryptoDecrypt(userKey.privateKey)), pin)

    const matchPin = await compareHash(String(decryptPin), String(user.pin))

    if (!matchPin) {
      throw new ServiceError(PinError.ERR_PIN_NOT_MATCH)
    }

    next()
  } catch (error) {
    next(error)
  }
}

const updatePIN = () => async (req: Request, res: Response, next: NextFunction) => {
  const { encryptPin } = req.body
  const userKey = res.locals.userKey
  const user: UserModel = res.locals.user!

  const decryptPin = await JweDecrypt(JSON.parse(cryptoDecrypt(userKey.privateKey)), encryptPin)
  const { pin, existingPin } = JSON.parse(decryptPin)

  if (!pin) throw new ServiceError(PinError.ERR_ENCRYPT_PIN_NOT_FOUND)
  if (!existingPin) throw new ServiceError(PinError.ERR_ENCRYPT_EXISTING_PIN_NOT_FOUND)

  const resultValidatePin = await validatePin(pin)
  try {
    if (resultValidatePin) {
      const matchPin = await compareHash(String(existingPin), String(user.pin))
      if (!matchPin) {
        throw new ServiceError(PinError.ERR_EXISTING_PIN_NOT_CORRECT)
      }

      const hashPin = await generateHash(pin)
      user.pin = hashPin
      await user.save()
      next()
    } else {
      throw new ServiceError(PinError.ERR_PIN_VALIDATE)
    }
    next()
  } catch (error) {
    next(error)
  }
}

export default {
  verifyPIN,
  updatePIN
}
