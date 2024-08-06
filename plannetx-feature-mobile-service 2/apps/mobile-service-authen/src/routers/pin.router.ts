import express from 'express'

import { body, header } from 'express-validator'
import pinController from '../controllers/pin.controller'
import tokenController from '../controllers/token.controller'
import validationController from '../controllers/validation.controller'
import userController from '../controllers/user.controller'
import logController from '../controllers/log.controller'

const router = express.Router()

router.post(
  '/verify',
  header(['authorization']).exists().withMessage('authorization header is required'),
  body(['pin']).exists().withMessage('pin body is required'),
  validationController.validate(),
  tokenController.validateAccessToken(),
  userController.checkExistingUser(),
  userController.getUserKey(),
  pinController.verifyPIN(),
  logController.createResponseLog(),
  (_req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.locals.body = {
      resCode: '0000',
      resDesc: ''
    }
    res.json(res.locals.body)
    next()
  }
)

router.put(
  '/',
  header(['authorization']).exists().withMessage('authorization header is required'),
  body(['encryptPin']).exists().withMessage('encryptPin body is required'),
  validationController.validate(),
  tokenController.validateAccessToken(),
  userController.checkExistingUser(),
  userController.getUserKey(),
  pinController.updatePIN(),
  logController.createResponseLog(),
  (_req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.locals.body = {
      resCode: '0000',
      resDesc: ''
    }
    res.json(res.locals.body)
    next()
  }
)

export default router
