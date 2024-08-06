import { NextFunction, Request, Response } from 'express'
import { getRequestUserInitiatedPay, getRequestAlipayPlus } from '../common/integreteAlipayPlus'
import { getIdentifyCode } from '../common/integreteAlipaySDKServer'

interface CustomRequest extends Request {
  auth_url?: string
  auth_body?: string
  auth_header?: Record<string, string>
  auth_option?: Record<string, string>
  alipay_response?: any
}

const requestUserInitiatedPay = () => async (req: CustomRequest, res: Response, next: NextFunction) => {
  const resUserInitialedPay = await getRequestUserInitiatedPay(req.auth_url, req.auth_body, req.auth_option)
  req.alipay_response = resUserInitialedPay
  next()
}

const requestAlipayPlus = () => async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const requestAlipayPlusResponse = await getRequestAlipayPlus(req.auth_url, req.auth_body, req.auth_option);
    console.log('requestAlipayPlusResponse:', requestAlipayPlusResponse);
    req.alipay_response = requestAlipayPlusResponse;
    next();
  } catch (error) {
    console.error('Error processing payment notification:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const requestIdentifyCode = () => async (req: CustomRequest, res: Response, next: NextFunction) => {

  const resIndentifyCode: any = await getIdentifyCode(req.auth_url, req.auth_option)

  if (resIndentifyCode.resultStatus === 'S' && resIndentifyCode.isSupported) {
    req.alipay_response = resIndentifyCode
    next()
  } else {
    req.alipay_response = {
      resCode: '0000',
      data: resIndentifyCode,
      resDesc: 'Identify code is not supported'
    }
    res.json(req.alipay_response)
  }
}

export default {
  requestUserInitiatedPay,
  requestIdentifyCode,
  requestAlipayPlus
}