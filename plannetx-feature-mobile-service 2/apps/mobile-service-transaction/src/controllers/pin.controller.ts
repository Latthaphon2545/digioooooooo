import { NextFunction, Request, Response } from 'express'
import axios from 'axios'

import { ServiceError } from '../helpers/error.helper'

import PinError from '@planetx/constants/errors/pin.error.json'


const pinVerify = () => async (req: Request, res: Response, next: NextFunction) => {
  const { encryptedPin } = req.body
  try {
    await axios.post(`${process.env.AUTHEN_SERVICE_ENDPOINT}/v1/authen/pin/verify`,
      {
        pin: encryptedPin
      }, {
        headers: {
          authorization: req.headers.authorization
        }
      }
    )
    next()
  } catch (error: any) {
    console.log('Authen Service Pin Error: ', error)
    next(new ServiceError(PinError.ERR_PIN_NOT_MATCH))
  }
}

export default {
  pinVerify
}
