import express from 'express'
import scbController from '../controllers/scb.controller'
import tokenController from '../controllers/token.controller'
import { header, body } from 'express-validator'
import validationController from '../controllers/validation.controller'
import userController from '../controllers/user.controller'
import logController from '../controllers/log.controller'

const router = express.Router()

router.get(
  '/deeplink',
  header(['authorization']).exists().withMessage('authorization header is required'),
  validationController.validate(),
  tokenController.validateAccessToken(),
  scbController.scbGenerateDeeplink(),
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
  '/customer',
  header(['authorization']).exists().withMessage('authorization header is required'),
  validationController.validate(),
  tokenController.validateAccessToken(),
  scbController.scbGetAccessToken(),
  userController.createUserKey(),
  scbController.scbGetCustomerDetail(),
  scbController.scbGetUserByCitizenID(),
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
  '/debit/register',
  header(['authorization']).exists().withMessage('authorization header is required'),
  header(['uid']).exists().withMessage('uid header is required'),
  validationController.validate(),
  tokenController.validateAccessToken(),
  userController.getExistUserByUid(),
  scbController.scbGetAccessToken(),
  scbController.scbLinkDirectDebit(),
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


// ทำเผื่อไว้ ยังไม่ได้ใช้
router.post(
  '/debit/inquiry',
  header(['authorization']).exists().withMessage('authorization header is required'),
  header(['uid']).exists().withMessage('uid header is required'),
  body(['regRef']).exists().withMessage('regRef body is required'),
  validationController.validate(),
  tokenController.validateAccessToken(),
  userController.getExistUserByUid(),
  scbController.scbGetAccessToken(),
  scbController.scbInquiryRegisterStatus(),
  userController.creatUserBank(),
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
