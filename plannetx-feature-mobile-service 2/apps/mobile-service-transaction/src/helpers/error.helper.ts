import { FieldValidationError } from 'express-validator'

class HttpError extends Error {
  statusCode: number
  resCode: string
  resDesc: Record<string, string>
  constructor (error: {
    statusCode: number
    resCode: string
    resDesc: Record<string, string>
  }) {
    super()
    this.name = 'Http Error'
    this.statusCode = error.statusCode
    this.resCode = error.resCode
    this.resDesc = error.resDesc
  }
}

class ValidationError extends Error {
  statusCode: number
  resCode: string
  resDesc: Record<string, string>
  details: FieldValidationError[]
  constructor (error: { statusCode: number, resCode: string, resDesc: Record<string, string>, details: FieldValidationError[] }) {
    super()
    this.name = 'Validation Error'
    this.statusCode = error.statusCode
    this.resCode = error.resCode
    this.resDesc = error.resDesc
    this.details = error.details
  }
}

class ServiceError extends Error {
  statusCode: number
  resCode: string
  resDesc: Record<string, string>
  constructor (error: {
    statusCode: number
    resCode: string
    resDesc: Record<string, string>
  }) {
    super()
    this.name = 'Service Error'
    this.statusCode = error.statusCode
    this.resCode = error.resCode
    this.resDesc = error.resDesc
  }
}

class CoreTransactionError extends Error {
  reqId: string
  reqDate: Date
  resCode: string
  resDesc: string
  constructor (error: {
    reqId: string
    reqDate: Date
    resCode: string
    resDesc: string
  }) {
    super()
    this.name = 'Core Transaction Error'
    this.reqId = error.reqId
    this.reqDate = error.reqDate
    this.resCode = error.resCode
    this.resDesc = error.resDesc
  }
}

class ScbError extends Error {
  code: number
  description: string
  details?: any

  constructor (error: {
    status: {
      code: number
      description: string
      details?: any
    }
  }) {
    if (error.status) {
      super(error.status.description)
      this.code = error.status.code
      this.description = error.status.description
      this.details = error.status.details
    } else {
      super('Scb Error')
      this.code = 9999
      this.description = 'Scb Error'
      this.details = 'Scb Error'
    }
    this.name = 'Scb Error'
  }
}

class KbankError extends Error {
  name: string
  message: string

  constructor (error: {
    error: {
      name: string
      message: string
      field: string
    }
  }) {
    if (error.error) {
      super(error.error.message)
      this.name = error.error.name
      this.message = error.error.message
    } else {
      super('Kbank Error')
      this.name = 'Kbank Error'
      this.message = 'Kbank Error'
    }
    this.name = 'Kbank Error'
  }
}

export { HttpError, ValidationError, ServiceError, CoreTransactionError, ScbError, KbankError }
