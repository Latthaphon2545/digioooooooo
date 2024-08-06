import express from 'express'

import { body, header } from 'express-validator'
import tokenController from '../controllers/token.controller'
import walletController from '../controllers/wallet.controller'
import validateController from '../controllers/validation.controller'
import userController from '../controllers/user.controller'
import logController from '../controllers/log.controller'

const router = express.Router()

router.post(
  '/',
  header(['authorization']).exists().withMessage('authorization header is required'),
  body(['uid']).exists().withMessage('uid body is required'),
  validateController.validate(),
  tokenController.validateAccessToken(),
  userController.getUserByUid(),
  walletController.createWallet(),
  logController.createResponseLog(),
  (_req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.locals.body = {
      resCode: '0000',
      resDesc: '',
      data: res.locals.body
    }
    res.json(res.locals.body)
  }
)

router.post(
  '/inquiry',
  header(['authorization']).exists().withMessage('authorization header is required'),
  header(['uid']).exists().withMessage('uid header is required'),
  body(['walletId']).exists().withMessage('walletId body is required'),
  validateController.validate(),
  tokenController.validateAccessToken(),
  userController.getUserByUid(),
  walletController.getWallet(),
  logController.createResponseLog(),
  (_req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.locals.body = {
      resCode: '0000',
      resDesc: '',
      data: res.locals.body
    }
    res.json(res.locals.body)
  }
)

router.get(
  '/list',
  header(['authorization']).exists().withMessage('authorization header is required'),
  header(['uid']).exists().withMessage('uid header is required'),
  validateController.validate(),
  tokenController.validateAccessToken(),
  userController.getUserByUid(),
  walletController.listWallet(),
  logController.createResponseLog(),
  (_req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.locals.body = {
      resCode: '0000',
      resDesc: '',
      data: res.locals.body
    }
    res.json(res.locals.body)
  }
)

export default router
