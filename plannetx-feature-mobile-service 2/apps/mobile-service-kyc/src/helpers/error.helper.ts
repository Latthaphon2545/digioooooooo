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
  constructor (error: {
    statusCode: number
    resCode: string
    resDesc: Record<string, string>
    details: FieldValidationError[]
  }) {
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

export { HttpError, ValidationError, ServiceError, ScbError }
