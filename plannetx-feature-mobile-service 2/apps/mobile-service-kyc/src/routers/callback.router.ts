import express from 'express'
import callbackController from '../controllers/callback.controller'
import { body } from 'express-validator'
import validationController from '../controllers/validation.controller'

const router = express.Router()

router.post(
  '/scb/direct',
  body(['body']).exists().withMessage('body field in body is required'),
  validationController.validate(),
  callbackController.scbCallbackResultLinkDebit(),
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
