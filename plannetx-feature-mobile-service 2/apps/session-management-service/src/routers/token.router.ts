import express from 'express'
import tokenController from '../controllers/token.controller'
import { header } from 'express-validator'
import validationController from '../controllers/validation.controller'
import userController from '../controllers/user.controller'
import logController from '../controllers/log.controller'

const router = express.Router()

router.get(
  '/',
  header(['device']).exists().withMessage('device header is required'),
  validationController.validate(),
  userController.findUserByDevice(),
  tokenController.generateAccessToken(),
  tokenController.generateRefreshToken(),
  tokenController.saveToken(),
  logController.createResponseLog(),
  (_req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.locals.body = {
      requestUid: res.locals.requestUID,
      resCode: '0000',
      resDesc: '',
      data: {
        ...res.locals.token
      }
    }
    res.json(res.locals.body)
    next()
  }
)

router.get(
  '/refresh',
  header(['refreshToken']).exists().withMessage('refreshToken header is required'),
  header(['device']).exists().withMessage('device header is required'),
  validationController.validate(),
  tokenController.verifyRefreshToken(),
  userController.findUserByDevice(),
  tokenController.findRefreshToken(),
  tokenController.generateAccessToken(),
  tokenController.generateRefreshToken(),
  tokenController.saveToken(),
  logController.createResponseLog(),
  (_req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.locals.body = {
      requestUid: res.locals.requestUID,
      resCode: '0000',
      resDesc: '',
      data: {
        ...res.locals.token
      }
    }
    res.json(res.locals.body)
    next()
  }
)

export default router
