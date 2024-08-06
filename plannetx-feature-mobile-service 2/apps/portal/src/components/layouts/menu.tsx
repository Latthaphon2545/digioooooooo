import Link from 'next/link'
import styled, { css } from 'styled-components'

import portalPermissionMaster from '../../constants/masters/portalPermissionMaster.json'

import React, { LiHTMLAttributes } from 'react'
import { Theme, User } from '../../types/types'
import { useRouter } from 'next/router'

type MenuProps = {
  user: User
  theme: Theme
}

const Ul = styled.ul`
  flex-grow: 1;
  margin: 0px;
  padding: 0px;
  border-bottom: 1px solid #f4f6f9;
  list-style: none;
  overflow-y: auto;
  overflow-x: hidden;
`

interface LiProps extends LiHTMLAttributes<HTMLLIElement> {
  visible: boolean
  isactive: boolean
  activeicon: string
  idleicon: string
}

const Li = styled.li.withConfig({
  shouldForwardProp: (prop) =>
    !['visible', 'isactive', 'activeicon', 'idleicon'].includes(prop)
})<LiProps>`
  display: ${(props) => (props.visible ? 'block' : 'none')};
  margin: 10px 0px;
  padding: 0px 20px;
  height: 40px;
  border-radius: 20px;
  > a {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    color: #92a3b9;
    text-decoration: none;
  }
  > a > img {
    margin-right: 15px;
    width: 20px;
    height: 20px;
    vertical-align: middle;
    ${(props) => `content:url(${props.idleicon})`}
  }
  &:hover {
    cursor: pointer;
    background-color: ${(props) => props.theme.SIDEBAR_ACTIVE_BACKGROUND};
    > a {
      color: ${(props) => props.theme.SIDEBAR_ACTIVE_COLOR};
    }
    > a > img {
      ${(props) => `content:url(${props.activeicon})`};
    }
  }
  ${(props) =>
    props.isactive &&
    css`
      background-color: ${props.theme.SIDEBAR_ACTIVE_BACKGROUND};
      > a {
        color: ${props.theme.SIDEBAR_ACTIVE_COLOR};
      }
      > a > img {
        ${`content:url(${props.activeicon})`};
      }
    `}
`

export default function Menu({ user, theme }: MenuProps) {
  const router = useRouter()
  const menuItems = [
    {
      path: '/transactions',
      name: 'Transactions',
      permission: portalPermissionMaster.TRANSACTION,
      icon: 'transaction'
    },
    {
      path: '/settlement',
      name: 'Settlement',
      permission: portalPermissionMaster.SETTLEMENT,
      icon: 'settlement'
    },
    {
      path: '/adjustment',
      name: 'Adjustment',
      permission: portalPermissionMaster.ADJUSTMENT,
      icon: 'adjustment'
    },
    // {
    //   path: '/partner',
    //   name: user?.partnerName,
    //   permission: portalPermissionMaster.PARTNER,
    //   icon: 'inpartner'
    // },
    // {
    //   path: '/partners',
    //   name: 'Partners',
    //   permission: portalPermissionMaster.INPARTNER,
    //   icon: 'inpartner'
    // },
    // {
    //   path: '/agents',
    //   name: 'Agents',
    //   permission: portalPermissionMaster.INAGENT,
    //   icon: 'agent'
    // },
    // {
    //   path: '/merchants',
    //   name: 'Merchants',
    //   permission: portalPermissionMaster.INMERCHANT,
    //   icon: 'merchant'
    // },
    {
      path: '/users',
      name: 'Users',
      permission: portalPermissionMaster.INUSER,
      icon: 'user'
    },
    {
      path: '/staff',
      name: 'Staff',
      permission: portalPermissionMaster.INPORTAL,
      icon: 'staff'
    },
    {
      path: '/report',
      name: 'Report',
      permission: portalPermissionMaster.REPORT,
      icon: 'report'
    },
    {
      path: '/credential',
      name: 'Credential',
      permission: portalPermissionMaster.CREDENTIAL,
      icon: 'credential'
    },
    {
      path: '/audit-log',
      name: 'Audit Log',
      permission: portalPermissionMaster.AUDIT_LOG,
      icon: 'audit-log'
    }
  ]
  return (
    <Ul>
      {menuItems.map(({ path, name, permission, icon }) => (
        <Li
          key={path}
          isactive={router.pathname.includes(path)}
          activeicon={`/icons/${theme.NAME}/menus/${icon}-active.png`}
          idleicon={`/icons/${theme.NAME}/menus/${icon}-idle.png`}
          visible={
            !!user &&
            !!user.permissions.find((perm) => perm.name === permission)
          }
        >
          <Link href={path}>
            <img />
            {name}
          </Link>
        </Li>
      ))}
    </Ul>
  )
}
