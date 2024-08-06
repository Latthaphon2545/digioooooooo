import axios , { AxiosRequestConfig, Method }from "axios"
import { v4 as uuidv4 } from 'uuid'

import winston from "../helpers/winston.helper"
import { ScbError } from '../helpers/error.helper'

import { handleAxiosError } from '@planetx/helpers'
import { LogBankIntegrationModel, LogBankIntegrationType} from '@planetx/models'

export interface CustomerProfile {
  citizenID: string
  passportNumber: string
  alienID: string
  thaiFirstName: string
  thaiLastName: string
  thaiTitle: string
  engFirstName: string
  engLastName: string
  engTitle: string
  birthDate: string
  mobile: string
  email: string
  genderCode: string
  nationalityCode: string
  cardType: string
  countryCode: string
  address: {
    addressSeqID: string
    usageCode: string
    ownerCode: string
    formatCode: string
    contactIndicator: string
    currentAddressFlag: string
    thaiAddressNumber: string
    thaiAddressVillage: string
    thaiAddressMoo: string
    thaiAddressTrok: string
    thaiAddressSoi: string
    thaiAddressThanon: string
    thaiAddressDistrict: string
    thaiAddressAmphur: string
    thaiAddressProvince: string
    thaiAddressState: string
    engAddressNumber: string
    engAddressVillage: string
    engAddressMoo: string
    engAddressTrok: string
    engAddressSoi: string
    engAddressThanon: string
    engAddressDistrict: string
    engAddressAmphur: string
    engAddressProvince: string
    engAddressState: string
    countryCode: string
    zipCode: string
    floorNumber: string
    unitNumber: string
  }
}

export const scbRequest = async (
  { endpoint, path, method, data, header, action }:
  { endpoint: string, path: string, method: Method, data?: any, header?: any, action?: string }
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