import axios , { AxiosRequestConfig, Method }from "axios"
import { v4 as uuidv4 } from 'uuid'

import winston from "../helpers/winston.helper"
import { KbankError } from '../helpers/error.helper'
import kbankStatusMapping from '../constants/master/kbankStatusMapping.json'

import { LogBankIntegrationModel, LogBankIntegrationType} from '@planetx/models'


export interface IKbankTopupInquiry {
  partnerShopID: string
  partnerOrderID: string
  partnerPaymentID: string
  paymentStatus: keyof typeof kbankStatusMapping,
  paymentType: 'Cash' | 'AppSwitchKPlus' | 'AppSwitchSCB' | 'AppSwitchBAY' | 'Card' | 'QRBOTCScanB' | 'TrueMoney' | 'BlueConnect' | 'ODDKBank'
  paymentAt: string
  payoutStatus: 'NOT READY' | 'COLLECTING' | 'PENDING' | 'SUCCEEDED' | 'UNDER INVESTIGATION' | 'RETURNING'
  refundAvailable: 'N/A' | 'VOID' | 'REFUND'
  amount: number
  paymentProcessingDate: string
  feeBreakdown: {
    total: number
    mdr: number
    vat: number
    wht: number
  }
  cashID: string
  partnerSOF: string
  partnerPaymentDate: string
  ref1: string
  ref2: string
  ref3: string
  createdAt: string
  refundFlag: 'N/A' | 'PENDING' | 'REFUNDED' | 'VOIDED' | 'PROCESSING'
  reconcileStatus: {
    reconciledFlag: boolean
    reconcileDate: string
  }
  chargebackStatus: string
  payoutBatchID: string
  threeDSFlag: boolean
  cardBrand: string
  issuerBank: string
  cardMasking: string
  approvalCode: string
  transactionAccount: string
  sourceOfFundMerchantID: string
  sourceOfFundShopID: string
  transactionFromBankCode: string
  orderInfo?: {
    info1: string
    info2: string
    info3: string
  }
  payerSourceOfFund: 'wallet'
  sourceOfFundPaymentRef: string
  error: {
    name: string
    message: string
    field: string
  }
  status: string
  timestamp: string
}

export const kbankRequest = async (
  { endpoint, path, method, data, params, header, action, reference }:
  { endpoint: string, path: string, method: Method, data?: any, params?: any, header?: any, action?: string, reference?: string }
) => {
  const requestUid = uuidv4()
  const config: AxiosRequestConfig = {
    url: endpoint + path,
    method,
    data,
    params,
    headers: {
      requestUId: requestUid
    }
  }

  if (header) config.headers = { ...config.headers, ...header }

  try {

    await LogBankIntegrationModel.create({
      requestId: requestUid,
      bank: 'KBANK',
      type: LogBankIntegrationType.REQEUEST,
      action,
      transactionReference: reference,
      url: endpoint + path,
      header: JSON.stringify(config.headers),
      body: JSON.stringify(config.data)
    })

    winston.info(`Start Request KBANK ${method} ${path}`)

    const kbankResponse = await axios(config)

    winston.info(`End Request KBANK ${method} ${path}`)

    await LogBankIntegrationModel.create({
      requestId: requestUid,
      bank: 'KBANK',
      type: LogBankIntegrationType.RESPONSE,
      action,
      transactionReference: reference,
      url: endpoint + path,
      header: JSON.stringify(config.headers),
      body: JSON.stringify(kbankResponse.data)
    })

    return kbankResponse
  } catch (error: any) {
    console.log(error.response)
    if (error.response?.data) {
      throw new KbankError(error.response.data)
    } else {
      throw error
    }
  }
}