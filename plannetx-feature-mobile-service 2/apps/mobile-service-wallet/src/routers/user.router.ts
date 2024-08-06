import express from 'express'

import { header } from 'express-validator'
import tokenController from '../controllers/token.controller'
import validateController from '../controllers/validation.controller'
import userController from '../controllers/user.controller'
import logController from '../controllers/log.controller'

const router = express.Router()

router.get(
  '/bank/list',
  header(['authorization']).exists().withMessage('authorization header is required'),
  header(['uid']).exists().withMessage('uid header is required'),
  validateController.validate(),
  tokenController.validateAccessToken(),
  userController.getUserByUid(),
  userController.getListUserBank(),
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
