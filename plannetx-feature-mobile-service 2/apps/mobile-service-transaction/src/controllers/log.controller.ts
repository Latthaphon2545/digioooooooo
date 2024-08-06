import { NextFunction, Request, Response } from 'express'
import moment from 'moment'
import { ServiceError, ValidationError, CoreTransactionError, ScbError, KbankError } from '../helpers/error.helper'
import winston from '../helpers/winston.helper'
import { nanoid } from 'nanoid'

const createRequestLog = () => (req: Request, res: Response, next: NextFunction) => {
  res.locals.requestUID = req.headers['x-request-uid'] as string || nanoid()
  res.locals.requestTime = moment()
  winston.info(
    'request ' +
    `${res.locals.requestUID} ` +
    `${req.method} ` +
    `${req.originalUrl} ` +
    `${req.ip} ` +
    `${req.headers['user-agent']}`,
    {
      requestUID: res.locals.requestUID,
      type: 'request',
      method: req.method,
      url: req.originalUrl,
      request: {
        headers: req.headers,
        body: req.body
      }
    }
  )
  next()
}

const createResponseLog = () => (req: Request, res: Response, next: NextFunction) => {
  const requestUID = res.locals.requestUID
  const requestTime = res.locals.requestTime
  const body = res.locals.body

  const responseTime = moment().diff(requestTime, 'milliseconds')

  winston.info(
    'response ' +
    `${requestUID} ` +
    `${req.method} ` +
    `${req.originalUrl} ` +
    `${res.statusCode} ` +
    `${responseTime}ms`,
    {
      requestUID,
      type: 'response',
      method: req.method,
      url: req.originalUrl,
      response: {
        status: res.statusCode,
        time: responseTime,
        timeUnit: 'ms',
        headers: res.getHeaders(),
        body
      }
    }
  )
  next()
}

const createErrorLog = () => (err: Error, req: Request, res: Response, next: NextFunction) => {
  const requestUID = res.locals.requestUID
  const requestTime = res.locals.requestTime

  if (err instanceof ServiceError || err instanceof ValidationError) {
    console.log(err)
    let resDesc = err.resDesc.en
    if (err instanceof ValidationError) {
      resDesc += `: ${err.details[0].msg ? err.details[0].msg : err.details[0].path}`
    }
    res.status(err.statusCode).json({
      requestUid: requestUID,
      resCode: err.resCode,
      resDesc
    })
  } else if (err instanceof CoreTransactionError) {
    console.log(err)
    res.status(500).json({
      requestUid: requestUID,
      coreReqId: err.reqId,
      reqDate: err.reqDate,
      resCode: err.resCode,
      resDesc: err.resDesc
    })
  } else if (err instanceof ScbError) {
    console.log(err)
    res.status(500).json({
      resCode: err.code,
      resDesc: err.name + ': ' + err.description,
      ...(err.details !== undefined && err.details !== null) &&
      { detail: JSON.stringify(err.details) }
    })
  } else if (err instanceof KbankError) {
    console.log(err)
    res.status(500).json({
      resCode: '0500',
      resDesc: err.name + ': ' + err.message
    })
  } else {
    console.error(err)
    res.status(500).json({
      resCode: '0500',
      resDesc: 'Internal Server Error'
    })
  }

  const responseTime = moment().diff(requestTime, 'milliseconds')

  winston.error(
    'response ' +
    `${res.locals.requestUID} ` +
    `${req.method} ` +
    `${req.originalUrl} ` +
    `${res.statusCode} ` +
    `${responseTime}ms`,
    {
      requestUID,
      type: 'response',
      method: req.method,
      url: req.originalUrl,
      response: {
        status: res.statusCode,
        time: responseTime,
        timeUnit: 'ms',
        headers: res.getHeaders()
      },
      error: {
        ...err,
        stack: err.stack
      }
    }
  )
  next(err)
}

export default {
  createRequestLog,
  createErrorLog,
  createResponseLog
}
