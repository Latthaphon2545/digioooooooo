import axios , { AxiosRequestConfig, Method }from "axios"
import { v4 as uuidv4 } from 'uuid'
import moment from "moment"

import winston from "../helpers/winston.helper"
import { CoreWalletError } from '../helpers/error.helper'

export const coreWalletRequest = async (
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
    winston.info(`Start Request Core Wallet ${method} ${path}`)

    const coreWalletResponse = await axios(config)

    winston.info(`End Request Core Wallet ${method} ${path}`)

    return coreWalletResponse
  } catch (error: any) {
    if (error?.response?.data) throw new CoreWalletError(error.response.data)
    else throw error
  }
}