import { NextFunction, Request, Response } from 'express'
import { getInfoIdentifyCode } from '../common/integreteAlipaySDKServer'

interface CustomRequest extends Request {
  auth_url?: any
  auth_body?: string
  auth_header?: Record<string, string>
  auth_option?: Record<string, string>
}

const getInquiryInfoSDKServer = () => async (req: CustomRequest, res: Response, next: NextFunction) => {
    const {
      codeValue
    } = req.body
    const infoAuthAlipaySDKServer = await getInfoIdentifyCode(codeValue)
    req.auth_url = infoAuthAlipaySDKServer.alipaySDKServerUrl
    req.auth_body = infoAuthAlipaySDKServer.alipaySDKServerBody
    req.auth_header = infoAuthAlipaySDKServer.alipaySDKServerHeader
    req.auth_option = infoAuthAlipaySDKServer.alipaySDKServerOption
    next()
}

export default {
  getInquiryInfoSDKServer
}


