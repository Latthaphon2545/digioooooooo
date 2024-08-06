import express from 'express'
import oAuthController from '../controllers/otp.controller'
import tokenController from '../controllers/token.controller'
import { body, header } from 'express-validator'
import validationController from '../controllers/validation.controller'
import logController from '../controllers/log.controller'

const router = express.Router()

router.get(
  '/',
  header(['phoneNo']).exists().withMessage('phoneNo header is required'),
  validationController.validate(),
  oAuthController.generateOtp(),
  tokenController.generateAccessToken(),
  logController.createResponseLog(),
  (_req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.locals.body = {
      requestUid: res.locals.requestUID,
      resCode: '0000',
      resDesc: '',
      data: {
        ...res.locals.body,
        reference: res.locals.reference
      }
    }
    res.json(res.locals.body)
    next()
  }
)

router.post(
  '/',
  header(['authorization']).exists().withMessage('authorization header is required'),
  body(['otp']).exists().withMessage('otp body is required'),
  validationController.validate(),
  tokenController.validateAccessToken(),
  oAuthController.verifyOtp(),
  logController.createResponseLog(),
  (_req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.locals.body = {
      requestUid: res.locals.requestUID,
      resCode: '0000',
      resDesc: '',
      data: res.locals.body
    }
    res.json(res.locals.body)
    next()
  }
)

export default router
