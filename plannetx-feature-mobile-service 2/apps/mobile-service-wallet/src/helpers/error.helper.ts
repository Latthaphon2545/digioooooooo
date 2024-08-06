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

class CoreWalletError extends Error {
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
    this.name = 'Core Wallet Error'
    this.reqId = error.reqId
    this.reqDate = error.reqDate
    this.resCode = error.resCode
    this.resDesc = error.resDesc
  }
}

export { HttpError, ValidationError, ServiceError, CoreWalletError }
