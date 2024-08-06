import express from 'express'
import tokenController from '../controllers/token.controller'
import { body, header } from 'express-validator'
import validationController from '../controllers/validation.controller'
import transactionController from '../controllers/transaction.controller'
import userController from '../controllers/user.controller'
import walletController from '../controllers/wallet.controller'
import userBankController from '../controllers/userBank.controller'
import scbController from '../controllers/scb.controller'
import pinController from '../controllers/pin.controller'
import logController from '../controllers/log.controller'

const router = express.Router()

router.post(
  '/topup/direct',
  header(['authorization']).exists().withMessage('authorization header is required'),
  header(['uid']).exists().withMessage('uid header is required'),
  body(['bankId']).exists().withMessage('bankId body is required'),
  body(['amount']).matches(/^\d+(\.\d{1,2})?$/).isFloat({ min: 0.01 }).exists().withMessage('amount body is required'),
  body(['orderId']).exists().withMessage('orderId body is required'),
  body(['walletId']).exists().withMessage('walletId body is required'),
  body(['encryptedPin']).exists().withMessage('encryptedPin body is required'),
  body(['remark']).optional(),
  validationController.validate(),
  tokenController.validateAccessToken(),
  pinController.pinVerify(),
  userController.getUserByUid(),
  walletController.getWallet(),
  userBankController.getUserBankById(),
  scbController.scbGetAccessToken(),
  transactionController.creteTransaction({ bank: 'SCB', paymentType: 'TOP_UP', ignoreInsufficient: true }),
  scbController.scbTopupDirectDebit(),
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

router.post(
  '/topup/deeplink',
  header(['authorization']).exists().withMessage('authorization header is required'),
  header(['uid']).exists().withMessage('uid header is required'),
  body(['amount']).matches(/^\d+(\.\d{1,2})?$/).isFloat({ min: 0.01 }).exists().withMessage('amount body is required'),
  body(['orderId']).exists().withMessage('orderId body is required'),
  body(['walletId']).exists().withMessage('walletId body is required'),
  body(['remark']).optional(),
  validationController.validate(),
  tokenController.validateAccessToken(),
  userController.getUserByUid(),
  walletController.getWallet(),
  scbController.scbGetAccessToken(),
  transactionController.creteTransaction({ bank: 'SCB', paymentType: 'TOP_UP', ignoreInsufficient: true}),
  scbController.scbTopupDeeplink(),
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
  '/topup/inquiry',
  header(['authorization']).exists().withMessage('authorization header is required'),
  header(['uid']).exists().withMessage('uid header is required'),
  body(['reference']).exists().withMessage('reference body is required').isString(),
  body(['transactionId']).exists().withMessage('transactionId body is required').isString(),
  validationController.validate(),
  tokenController.validateAccessToken(),
  userController.getUserByUid(),
  scbController.scbGetAccessToken(),
  scbController.scbTopupInquiry(),
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

router.post(
  '/transfer',
  header(['authorization']).exists().withMessage('authorization header is required'),
  header(['uid']).exists().withMessage('uid header is required'),
  body(['bankId']).exists().withMessage('bankId body is required'),
  body(['walletId']).exists().withMessage('walletId body is required'),
  body(['amount']).exists().withMessage('amount body is required').matches(/^\d+(\.\d{1,2})?$/).isFloat({ min: 0.01 }),
  body(['orderId']).exists().withMessage('orderId body is required').isString(),
  validationController.validate(),
  tokenController.validateAccessToken(),
  userController.getUserByUid(),
  walletController.getWallet(),
  userBankController.getUserBankById(),
  scbController.scbGetAccessToken(),
  transactionController.creteTransaction({ bank: 'SCB', paymentType: 'WITHDRAWAL', ignoreInsufficient: false}),
  scbController.scbTransferInitial(),
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
  '/transfer/confirm',
  header(['authorization']).exists().withMessage('authorization header is required'),
  header(['uid']).exists().withMessage('uid header is required'),
  body(['tokenizerId']).exists().withMessage('tokenizerId body is required').isString(),
  validationController.validate(),
  tokenController.validateAccessToken(),
  userController.getUserByUid(),
  scbController.scbTransferConfirm(),
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
  '/transfer/inquiry',
  header(['authorization']).exists().withMessage('authorization header is required'),
  header(['uid']).exists().withMessage('uid header is required'),
  body(['tokenizerId']).exists().withMessage('tokenizerId body is required').isString(),
  body(['reference']).exists().withMessage('reference body is required').isString(),
  validationController.validate(),
  tokenController.validateAccessToken(),
  userController.getUserByUid(),
  scbController.scbTransferInquiry(),
  transactionController.approveTransaction({ ignoreInsufficient: false }),
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