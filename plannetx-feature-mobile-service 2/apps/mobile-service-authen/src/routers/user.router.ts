import express from 'express'

import { body, header } from 'express-validator'
import userController from '../controllers/user.controller'
import tokenController from '../controllers/token.controller'
import validationController from '../controllers/validation.controller'
import logController from '../controllers/log.controller'

const router = express.Router()

router.get(
  '/',
  header(['authorization']).exists().withMessage('authorization header is required'),
  header(['device']).exists().withMessage('device header is required'),
  validationController.validate(),
  tokenController.validateAccessToken(),
  userController.getUser(),
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

router.get(
  '/existing',
  header(['authorization']).exists().withMessage('authorization header is required'),
  validationController.validate(),
  tokenController.validateAccessToken(),
  userController.checkExistingUser(),
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

router.get(
  '/credential',
  header(['authorization']).exists().withMessage('authorization header is required'),
  validationController.validate(),
  tokenController.validateAccessToken(),
  userController.checkExistingUser(),
  userController.getUserKey(),
  logController.createResponseLog(),
  (_req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.locals.body = {
      requestUid: res.locals.requestUID,
      resCode: '0000',
      resDesc: '',
      data: {
        userKey: res.locals.userKey
      }
    }
    res.json(res.locals.body)
    next()
  }
)

export default router
