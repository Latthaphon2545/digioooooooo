import { NextFunction, Request, Response } from 'express'

import { ServiceError } from '../helpers/error.helper'

import { VersionModel } from '@planetx/models'
import VersionError from '@planetx/constants/errors/version.error.json'

const CheckAppVersion = () => async (req: Request, res: Response, next: NextFunction) => {
  const version = req.headers.version as string
  try {
    const lastestVersion = await VersionModel.findOne({
      order: [['created_at', 'DESC']]
    })

    if (!lastestVersion) throw new ServiceError(VersionError.ERR_VERSION_NOT_FOUND)

    if (lastestVersion.version !== version) {
      if (!lastestVersion.isPass) {
        throw new ServiceError(VersionError.ERR_OLD_VERSION_UNAVAILABLE)
      } else {
        throw new ServiceError(VersionError.ERR_OLD_VERSION_AVAILABLE)
      }
    }
    res.locals.resCode = '0000'
    res.locals.resDesc = 'The latest version of the app is now available.'

    next()
  } catch (error) {
    next(error)
  }
}


export default {
  CheckAppVersion
}
