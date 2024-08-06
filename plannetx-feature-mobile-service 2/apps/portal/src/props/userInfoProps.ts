export interface UserInfoProps {
  uid?: string
  type?: string
  subType?: string
  firstnameTH?: string
  lastnameTH?: string
  firstnameEN?: string
  lastnameEN?: string
  phoneNo?: number | string
  email?: string
  taxId?: string
  citizenId?: string
  passport?: string
  birthdate?: string
  gender?: string
  bank?: string
  bankBranch?: string
  bankAccountNumber?: string
  bankAccountName?: string
  wallets?: Wallet[]
  status?: string
  createdAt?: string
  updatedAt?: string
}

export interface Wallet {
  id: string
  type: string
  wallet_id: string
  balance: number
  hold_balance: number
  currency: string
  is_default: boolean
  status: string
}

export const DefaultUserInfo: UserInfoProps = {
  uid: '',
  type: '',
  subType: '',
  firstnameTH: '',
  lastnameTH: '',
  firstnameEN: '',
  lastnameEN: '',
  phoneNo: 0,
  email: '',
  taxId: '',
  citizenId: '',
  passport: '',
  birthdate: '',
  gender: '',
  bank: '',
  bankBranch: '',
  bankAccountNumber: '',
  bankAccountName: '',
  wallets: [],
  status: '',
  createdAt: '',
  updatedAt: ''
}
