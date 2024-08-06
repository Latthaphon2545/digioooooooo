import axios from 'axios'
import moment from 'moment'

// const logController = require('../controller/logController')

async function interceptBankRequest (requestConfig: any) {
  // requestConfig.logInfo.requestTime = moment().utc().format()
  // await logController.createRequestBankLogCB(requestConfig)
  return requestConfig
}

function interceptBankRequestError (err: any) {
  console.log('error in axios request interceptor:', err)
  return Promise.reject(err)
}

async function interceptBankResponse (response: any) {
  // await logController.createResponseBankLogCB(response)
  return response
}

function interceptBankResponseError (err: any) {
  // if (axios.isAxiosError(err)) {
  //   // logController.createResponseBankLogCB(err)
  // }
  return Promise.reject(err)
}

/**
 * Create axios instance with log bank integration request and response interceptor
 *
 * @param {import('axios').CreateAxiosDefaults} createConfig axios requestConfig.
 * @param {Function} requestEncryptor interceptor for request before sending
 * (use when there is the need to encrypt the request to send as a whole)
 * @param {Function} responseDecryptor interceptor for response before logging
 * (use when there is the need to decrypt the response)
 */
export const createBankIntegrationInstance = (createConfig: any, requestEncryptor?: (config: any) => any, responseDecryptor?: (response: any) => any) => {
// exports.createBankIntegrationInstance = (createConfig: any, requestEncryptor: any, responseDecryptor: any) => {
  const instance = axios.create(createConfig)
  if (requestEncryptor) {
    instance.interceptors.request.use(requestEncryptor)
  }
  instance.interceptors.request.use(interceptBankRequest, interceptBankRequestError)
  if (responseDecryptor) {
    instance.interceptors.response.use(responseDecryptor, responseDecryptor)
  }
  instance.interceptors.response.use(interceptBankResponse, interceptBankResponseError)
  return instance
}
