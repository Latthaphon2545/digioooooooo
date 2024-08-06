export interface MerchantInfoProps {
  username?: string
  mid?: string
  subType?: string
  firstnameTH?: string
  lastnameTH?: string
  firstnameEN?: string
  lastnameEN?: string
  taxId?: string
  citizenId?: string
  passport?: string
  phoneNo?: string
  email?: string
  wallets?: WalletsProps[]
  settleTime?: string
  settleToAgentId?: string
  settleToAgentFirstnameEN?: string
  settleToAgentLastnameEN?: string
  inagents?: InagentsProps[]
  agentId?: string
  status?: string
  createdAt?: string
  updatedAt?: string
  branchNameEN?: string
}

export interface WalletsProps {
  balance: number
  currency: string
  holdBalance: number
  id: number
  isDefault: boolean
  status: string
  type: string
  walletId: string
}

export interface InagentsProps {
  branch_id: number
  branch_name_en: string
  branch_name_th: string
  created_at: string
  firstname_en: string
  firstname_th: string
  id: number
  lastname_en: string
  lastname_th: string
  partner_id: number
  partner_name: string
  status: string
  updated_at: string
  username: string
}

export const DefaultMerchantInfo: MerchantInfoProps = {
  username: '',
  mid: '',
  subType: '',
  firstnameEN: '',
  lastnameEN: '',
  firstnameTH: '',
  lastnameTH: '',
  taxId: '',
  citizenId: '',
  passport: '',
  phoneNo: '',
  email: '',
  wallets: [],
  settleTime: '',
  settleToAgentId: '',
  settleToAgentFirstnameEN: '',
  settleToAgentLastnameEN: '',
  inagents: [],
  agentId: '',
  status: '',
  createdAt: '',
  updatedAt: ''
}
