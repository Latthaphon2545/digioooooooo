import { NextFunction, Request, Response } from 'express'
import { getInfoAlipay, getInfoAlipayPlus } from '../common/integreteAlipayPlus'
import integrationConfig from '../configs/alipayPlusConfig';

interface CustomRequest extends Request {
  auth_url?: any
  auth_body?: string
  auth_header?: Record<string, string>
  auth_option?: Record<string, string>
}

const getInquiryInfo = () => async (req: CustomRequest, res: Response, next: NextFunction) => {
  const infoAuthAlipay = await getInfoAlipay(req.body)
  req.auth_url = infoAuthAlipay.alipayPlusUrl
  req.auth_body = infoAuthAlipay.alipayPlusBody
  req.auth_header = infoAuthAlipay.alipayPlusHeader
  req.auth_option = infoAuthAlipay.alipayPlusOption
  next()
}

const getInquiryNotifyPayment = () => async (req: CustomRequest, res: Response, next: NextFunction) => {
  const notifyAuthAlipay = await getInfoAlipayPlus(req.body, integrationConfig.alipayPlus.notifyPayment);
  req.auth_url = notifyAuthAlipay.alipayPlusUrl;
  req.auth_body = notifyAuthAlipay.alipayPlusBody;
  req.auth_header = notifyAuthAlipay.alipayPlusHeader;
  req.auth_option = notifyAuthAlipay.alipayPlusOption;
  next();
};

export default {
  getInquiryInfo,
  getInquiryNotifyPayment
}


