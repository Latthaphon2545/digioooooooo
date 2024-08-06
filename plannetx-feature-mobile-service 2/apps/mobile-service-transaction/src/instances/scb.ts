import axios , { AxiosRequestConfig, Method }from "axios"
import { v4 as uuidv4 } from 'uuid'

import winston from "../helpers/winston.helper"
import { ScbError } from '../helpers/error.helper'

import { handleAxiosError } from '@planetx/helpers'
import { LogBankIntegrationModel, LogBankIntegrationType} from '@planetx/models'

export const scbRequest = async (
  { endpoint, path, method, data, header, action, reference }:
  { endpoint: string, path: string, method: Method, data?: any, header?: any, action?: string, reference?: string }
) => {
  const requestUid = uuidv4()
  const config: AxiosRequestConfig = {
    url: endpoint + path,
    method,
    data,
    headers: {
      requestUId: requestUid,
      resourceOwnerId: process.env.SCB_CUSTOMER_ID,
    }
  }

  if (header) config.headers = { ...config.headers, ...header }

  try {

    await LogBankIntegrationModel.create({
      requestId: requestUid,
      bank: 'SCB',
      type: LogBankIntegrationType.REQEUEST,
      action,
      transactionReference: reference,
      url: endpoint + path,
      header: JSON.stringify(config.headers),
      body: JSON.stringify(config.data)
    })

    winston.info(`Start Request SCB ${method} ${path}`)

    const scbResponse = await axios(config)

    winston.info(`End Request SCB ${method} ${path}`)

    await LogBankIntegrationModel.create({
      requestId: requestUid,
      bank: 'SCB',
      type: LogBankIntegrationType.RESPONSE,
      action,
      transactionReference: reference,
      url: endpoint + path,
      header: JSON.stringify(config.headers),
      body: JSON.stringify(scbResponse.data)
    })

    return scbResponse
  } catch (error) {
    const errorData = handleAxiosError(error)
    if (errorData) {
      throw new ScbError(errorData)
    } else {
      throw error
    }
  }
}