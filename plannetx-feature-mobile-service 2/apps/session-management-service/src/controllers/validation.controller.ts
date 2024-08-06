import { NextFunction, Request, Response } from 'express'
import { validationResult, FieldValidationError } from 'express-validator'
import validateError from '@planetx/constants/errors/validation.error.json'
import { ValidationError } from '../helpers/error.helper'

const validate = () => (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const validationError = {
      ...validateError.ERR_VALIDATION_ERROR,
      details: errors.array({ onlyFirstError: true }) as FieldValidationError[]
    }
    next(new ValidationError(validationError))
  } else {
    next()
  }
}

export default {
  validate
}
