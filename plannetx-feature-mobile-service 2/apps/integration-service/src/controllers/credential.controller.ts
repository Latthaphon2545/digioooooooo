import { NextFunction, Request, Response } from 'express'
const integrateKTC = require('../common/integrateKTC')

const getInquiryInfo = () => (req: Request, res: Response, next: NextFunction) => {
    next()
}

export default {
  getInquiryInfo
}