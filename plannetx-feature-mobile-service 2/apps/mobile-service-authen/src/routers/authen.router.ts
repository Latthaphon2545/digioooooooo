import express from 'express'
import { header } from 'express-validator'
import versionController from '../controllers/version.controller'
import validationController from '../controllers/validation.controller'
import logController from '../controllers/log.controller'

const router = express.Router()

router.get(
  '/version',
  header(['version']).exists().withMessage('version header is required'),
  validationController.validate(),
  versionController.CheckAppVersion(),
  logController.createResponseLog(),
  (_req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.locals.body = {
      resCode: res.locals.resCode,
      resDesc: res.locals.resDesc,
      isPass: res.locals.isPass
    }
    res.json(res.locals.body)
    next()
  }
)

export default router
