import express from 'express'
import { body, header } from 'express-validator'

import tokenController from '../controllers/token.controller'
import validationController from '../controllers/validation.controller'
import userController from '../controllers/user.controller'
import kbankController from '../controllers/kbank.controller'
import walletController from '../controllers/wallet.controller'
import transactionController from '../controllers/transaction.controller'
import logController from '../controllers/log.controller'

const router = express.Router()

router.post(
  '/deeplink',
  header(['authorization']).exists().withMessage('authorization header is required'),
  header(['uid']).exists().withMessage('uid header is required'),
  body(['amount']).exists().withMessage('amount body is required').matches(/^\d+(\.\d{1,2})?$/).isFloat({ min: 0.01 }).withMessage('amount body format is wrong'),
  body(['walletId']).exists().withMessage('walletId body is required'),
  body(['orderId']).exists().withMessage('orderId body is required')
    .isString().isLength({min: 17, max: 17}).withMessage('orderId body must have 17 character'),
  validationController.validate(),
  tokenController.validateAccessToken(),
  userController.getUserByUid(),
  walletController.getWallet(),
  kbankController.kbankGetAccessToken(),
  transactionController.creteTransaction({ bank: 'KBANK', paymentType: 'TOP_UP', ignoreInsufficient: true}),
  kbankController.kbankTopupDeeplink(),
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

router.post(
  '/inquiry',
  header(['authorization']).exists().withMessage('authorization header is required'),
  header(['uid']).exists().withMessage('uid header is required'),
  body(['reference']).exists().withMessage('reference body is required').isString(),
  body(['partnerPaymentID']).exists().withMessage('partnerPaymentID body is required'),
  validationController.validate(),
  tokenController.validateAccessToken(),
  userController.getUserByUid(),
  kbankController.kbankGetAccessToken(),
  kbankController.kbankTopupInquiry(),
  transactionController.approveTransaction({ ignoreInsufficient: true }),
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
