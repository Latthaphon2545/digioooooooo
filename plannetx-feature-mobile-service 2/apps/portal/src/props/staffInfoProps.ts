export interface StaffInfoProps {
  username: string
  firstnameEN: string
  lastnameEN: string
  firstnameTH: string
  lastnameTH: string
  email: string
  phoneNo: string
  role: string
  subType: string
  status: string
  recentLogin: string
  createdAt: string
  updatedAt: string
}

export const DefaultStaffInfo: StaffInfoProps = {
  username: '',
  firstnameEN: '',
  lastnameEN: '',
  firstnameTH: '',
  lastnameTH: '',
  email: '',
  phoneNo: '',
  role: '',
  subType: '',
  status: '',
  recentLogin: '',
  createdAt: '',
  updatedAt: ''
}
