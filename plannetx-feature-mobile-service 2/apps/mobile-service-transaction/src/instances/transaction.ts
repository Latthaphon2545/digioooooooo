import axios , { AxiosRequestConfig, Method }from "axios"
import { v4 as uuidv4 } from 'uuid'
import moment from "moment"

import winston from "../helpers/winston.helper"
import { CoreTransactionError } from '../helpers/error.helper'

export const coreTransactionRequest = async (
  { endpoint, path, method, data, header, param }:
  { endpoint: string, path: string, method: Method, data?: any, header?: any, param?: any }
) => {
  const config: AxiosRequestConfig = {
    url: endpoint + path,
    method,
    data,
    headers: {
      'x-req-id': uuidv4(),
      'x-req-date': moment().format('YYYY-MM-DDTHH:mm:ss[Z]'),
    }
  }
  
  if (header) config.headers = { ...config.headers, ...header }
  if (param) config.params = param

  try {
    winston.info(`Start Request Core Transaction ${method} ${path}`)

    const coreTransactionResponse = await axios(config)

    winston.info(`End Request Core Transaction ${method} ${path}`)

    return coreTransactionResponse
  } catch (error: any) {
    console.log(error)
    if (error?.response?.data) throw new CoreTransactionError(error.response.data)
    else throw error
  }
}