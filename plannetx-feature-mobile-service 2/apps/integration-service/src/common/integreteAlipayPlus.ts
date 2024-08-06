import crypto from 'crypto'

import integrationConfig from '../configs/alipayPlusConfig'

import { createBankIntegrationInstance } from '../utils/axiosUtil'
import axios from 'axios'

const configAlipay = integrationConfig.alipayPlus

const instance = createBankIntegrationInstance({
  timeout: process.env.BANK_TIMEOUT,
  transitional: {
    clarifyTimeoutError: true
  }
})

function signWithSHA256RSAlipayPlus(reqBody: string, merchantPrivateKey: string, path: string, clientId: string, timeString: string) {
  const signContent = `POST ${path}\n${clientId}.${timeString}.${reqBody}`
  const privateKey = '-----BEGIN RSA PRIVATE KEY-----\n' +
    merchantPrivateKey +
    '\n-----END RSA PRIVATE KEY-----'
  const sign = crypto.sign('sha256', Buffer.from(signContent), {
    key: privateKey,
    padding: crypto.constants.RSA_PKCS1_PADDING
  })
  return encodeURIComponent(Buffer.from(sign).toString('base64'))
}

export const getInfoAlipay = async (body: any) => {
  const { 
    codeValue, 
    customerId 
  } = body
  const path = configAlipay.userInitiatedPay
  const host = configAlipay.host
  const alipayPlusUrl: any = host + path

  const merchantPrivateKey = configAlipay.publickKey.match(/.{1,64}/g)?.join('\n') || ''

  const clientId = configAlipay.clientId
  const requestTime: string = new Date().toISOString();

  const alipayPlusBody: any = {
    codeValue: codeValue,
    customerId: customerId
  }

  const signature = signWithSHA256RSAlipayPlus(JSON.stringify(alipayPlusBody), merchantPrivateKey, path, clientId, requestTime)

  const alipayPlusHeader: any = {
    'Content-Type': '"application/json; charset=UTF-8',
    'Request-Time': requestTime,
    "client-id": clientId,
    "Signature": `algorithm=RSA256,keyVersion=1,signature=${signature}`,
  }

  const alipayPlusOption: any = {
    method: 'POST',
    headers: alipayPlusHeader,
    data: alipayPlusBody
  }

  return {
    alipayPlusUrl,
    alipayPlusBody,
    alipayPlusHeader,
    alipayPlusOption
  }
}

// req.auth_url, req.auth_body, req.auth_option
export const getRequestUserInitiatedPay = (url: any, body: any, option: any) => {
  return new Promise((resolve, reject) => {
    instance.post(url, body, option)
      .then((response: any) => {
        resolve(response.data)
      })
      .catch((err: any) => {
        console.log('error in axios request interceptor:', err)
        reject(err)
      })
  })
}

export const getInfoAlipayPlus = async (body: any, alipayPath: string) => {
  const host = configAlipay.host;
  const alipayPlusUrl: any = host + alipayPath;
  const merchantPrivateKey = configAlipay.publickKey.match(/.{1,64}/g)?.join('\n') || '';
  const clientId = configAlipay.clientId;
  const requestTime: string = new Date().toISOString();
  const alipayPlusBody: any = body;
  const signature = signWithSHA256RSAlipayPlus(JSON.stringify(alipayPlusBody), merchantPrivateKey, alipayPath, clientId, requestTime);
  const alipayPlusHeader: any = {
    'Content-Type': 'application/json; charset=UTF-8',
    'Request-Time': requestTime,
    'client-id': clientId,
    'Signature': 'algorithm=RSA256,keyVersion=1,signature=' + signature
  };
  const alipayPlusOption: any = {
    method: 'POST',
    headers: alipayPlusHeader,
    data: alipayPlusBody
  };

  return {
    alipayPlusUrl,
    alipayPlusBody,
    alipayPlusHeader,
    alipayPlusOption
  };
};

export const getRequestAlipayPlus = (url: any, body: any, option: any) => {
  return new Promise((resolve, reject) => {
    console.log('getRequestAlipayPlusUrl:', url);
    console.log('getRequestAlipayPlusBody:', body);
    console.log('getRequestAlipayPlusOption:', option);
    instance.post(url, body, option)
      .then((response: any) => {
        resolve(response.data);
      })
      .catch((err: any) => {
        console.log('error in axios request interceptor:', err);
        reject(err);
      });
  });
};