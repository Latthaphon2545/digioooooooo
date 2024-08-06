interface Permission {
  name: string
  list: boolean
  detail: boolean
  create: boolean
  edit: boolean
}

export type User = {
  email: string
  firstnameEN: string
  firstnameTH: string
  id: string
  lastLogin: string
  lastnameEN: string
  lastnameTH: string
  partnerId: any
  partnerLogo: any
  partnerName: any
  partnerTheme: string
  permissions: Permission[]
  recentLogin: string
  subType: string
  type: string
}

export type Theme = {
  ACCENT_COLOR: string
  ACCENT_SHADOW_COLOR: string
  NAME: string
  SIDEBAR_ACTIVE_BACKGROUND: string
  SIDEBAR_ACTIVE_COLOR: string
  SIDEBAR_IDLE_BACKGROUND: string
  SIDEBAR_IDLE_COLOR: string
}
