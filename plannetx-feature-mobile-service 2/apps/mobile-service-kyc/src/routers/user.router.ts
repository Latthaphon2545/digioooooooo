import express from 'express'
import userController from '../controllers/user.controller'
import tokenController from '../controllers/token.controller'
import { body, header } from 'express-validator'
import validationController from '../controllers/validation.controller'
import logController from '../controllers/log.controller'

const router = express.Router()

router.post(
  '/',
  header(['authorization']).exists().withMessage('authorization header is required'),
  body(['titleNameTh']).isString().optional(),
  body(['firstNameTh']).isString().optional(),
  body(['lastNameTh']).isString().optional(),
  body(['titleNameEn']).isString().optional(),
  body(['firstNameEn']).isString().optional(),
  body(['lastNameEn']).isString().optional(),
  body(['citizenId']).isString().optional(),
  body(['passportNumber']).isString().optional(),
  body(['alienId']).isString().optional(),
  body(['birthDate']).isDate({ format: 'YYYY-MM-DD' }).withMessage('Invalid birthDate format').optional(),
  body(['email']).isEmail().withMessage('Invalid email format').optional({ nullable: true, checkFalsy: true }),
  body(['pin']).isString().withMessage('pin body is required').exists(),
  body(['device']).isString().withMessage('device body is required').exists(),
  body(['countryCode']).isString().optional(),
  body(['address']).isString().optional(),
  body(['province']).isString().optional(),
  body(['postCode']).isString().optional(),
  body(['occupation']).isString().optional(),
  body(['countryOfIncome']).isString().optional(),
  validationController.validate(),
  tokenController.validateAccessToken(),
  userController.createUser(),
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
  '/',
  header(['authorization']).exists().withMessage('authorization header is required'),
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

export default router
