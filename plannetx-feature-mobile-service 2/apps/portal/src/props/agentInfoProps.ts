import { Wallet } from './userInfoProps'

export type AgentInfoProps = {
  branchId: string
  branchNameEN: string
  username: string
  firstnameEN: string
  lastnameEN: string
  firstnameTH: string
  lastnameTH: string
  citizenId: string
  passport: string
  phoneNo: string
  email: string
  wallets: Wallet[]
  status: string
  createdAt: string
  updatedAt: string
}

export const DefaultAgentInfo: AgentInfoProps = {
  branchId: '',
  branchNameEN: '',
  username: '',
  firstnameEN: '',
  lastnameEN: '',
  firstnameTH: '',
  lastnameTH: '',
  citizenId: '',
  passport: '',
  phoneNo: '',
  email: '',
  wallets: [],
  status: '',
  createdAt: '',
  updatedAt: ''
}
