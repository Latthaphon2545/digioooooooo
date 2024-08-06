import express from 'express'

import { header, body } from 'express-validator'
import deviceController from '../controllers/device.controller'
import tokenController from '../controllers/token.controller'
import validationController from '../controllers/validation.controller'
import logController from '../controllers/log.controller'

const router = express.Router()

router.get(
  '/verify',
  header(['authorization']).exists().withMessage('authorization header is required'),
  header(['device']).exists().withMessage('device header is required'),
  validationController.validate(),
  tokenController.validateAccessToken(),
  deviceController.verifyDevice(),
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
  body(['device']).exists().withMessage('device body is required'),
  validationController.validate(),
  tokenController.validateAccessToken(),
  deviceController.updateDevice(),
  logController.createResponseLog(),
  (_req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.locals.body = {
      resCode: '0000',
      resDesc: '',
      isPass: res.locals.isPass,
      data: res.locals.body
    }
    res.json(res.locals.body)
    next()
  }
)

export default router
