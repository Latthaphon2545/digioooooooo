export interface partnerInfoProps {
  id: string
  logo: string
  name: string
  currency: string
  timezone: string
  date_format: string
  status: string
  transaction_configs: Array<{
    type: string
    sub_type: string
    is_holding: boolean
    created_at: string
    updated_at: string
  }>
  transaction_fees: Array<{
    type: string
    sub_type: string
    start: number
    end: number
    fee: number
    updated_at: string
    created_at: string
  }>
  transaction_limites: Array<{
    type: string
    sub_type: string
    limit_per_transaction: string
    limit_per_day: string
    updated_at: string
    created_at: string
  }>
  wallet_limites: Array<{
    type: string
    limit_balance: string
    updated_at: string
    created_at: string
  }>
  created_at: string
  updated_at: string
  res_code: string
  res_desc: string
  theme: string
}

export const defaultPartnerInfo: partnerInfoProps = {
  id: '',
  logo: '',
  name: '',
  currency: '',
  timezone: '',
  date_format: '',
  status: '',
  transaction_configs: [],
  transaction_fees: [],
  transaction_limites: [],
  wallet_limites: [],
  created_at: '',
  updated_at: '',
  res_code: '',
  res_desc: '',
  theme: ''
}
