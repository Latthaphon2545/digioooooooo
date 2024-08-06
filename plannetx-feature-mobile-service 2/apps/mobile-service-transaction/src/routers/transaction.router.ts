import express from 'express'
import tokenController from '../controllers/token.controller'
import { body, header, param } from 'express-validator'
import validationController from '../controllers/validation.controller'
import transactionController from '../controllers/transaction.controller'
import userController from '../controllers/user.controller'
import logController from '../controllers/log.controller'

const router = express.Router()


router.post(
  '/inquiry',
  header(['authorization']).exists().withMessage('authorization header is required'),
  header(['uid']).exists().withMessage('uid header is required'),
  body(['reference']).exists().withMessage('reference body is required'),
  validationController.validate(),
  tokenController.validateAccessToken(),
  userController.getUserByUid(),
  transactionController.getTransactionDetail(),
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
  '/list',
  header(['authorization']).exists().withMessage('authorization header is required'),
  header(['walletId']).exists().withMessage('walletId header is required'),
  validationController.validate(),
  tokenController.validateAccessToken(),
  transactionController.getTransactionByUserUid(),
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
