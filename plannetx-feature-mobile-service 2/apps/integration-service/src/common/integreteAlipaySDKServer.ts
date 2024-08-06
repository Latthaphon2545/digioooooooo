import integrationConfig from '../configs/alipayPlusConfig'

import { createBankIntegrationInstance } from '../utils/axiosUtil'

const configAlipay = integrationConfig.alipaySDKServer

const instance = createBankIntegrationInstance({
  timeout: process.env.BANK_TIMEOUT,
  transitional: {
    clarifyTimeoutError: true
  }
})

export const getInfoIdentifyCode = async (body: any) => {
  const path = configAlipay.identifyCode
  const host = configAlipay.host
  const alipaySDKServerUrl: any = host + path + `/${body}`

  const alipaySDKServerBody: any  = {
    codeValue: body
  }

  const alipaySDKServerHeader: any  = {
    'Content-Type': 'application/json',
  }

  const alipaySDKServerOption: any  = {
    method: 'GET',
    headers: alipaySDKServerHeader,
    data: alipaySDKServerBody
  }

  return {
    alipaySDKServerUrl,
    alipaySDKServerBody,
    alipaySDKServerHeader,
    alipaySDKServerOption
  }
}

export const getIdentifyCode = (url: any, option: any) => {
  return new Promise((resolve, reject) => {
    instance.get(url, option)
      .then((response: any) => {
        resolve(response.data)
      })
      .catch((err: any) => {
          console.log('error in axios request interceptor:', err)
        reject(err)
      })
  })
}
