import Section from '../../../components/commons/section'
import Skeleton from '../../../components/commons/skeleton'
import Badge from '../../../components/commons/badge'
import styled from 'styled-components'
import walletStatusMaster from '../../../constants/masters/walletStatusMaster.json'
import walletTypeMaster from '../../../constants/masters/walletTypeMaster.json'
import currencyFormatter from 'currency-formatter'
import { Wallet } from '../../../props/userInfoProps'

type WalletSectionProps = {
  wallets: Wallet[]
}

const WalletTable = styled.table`
  width: 100%;
  height: auto;
  border-collapse: collapse;
  > thead > tr > th {
    padding: 0px 5px;
    font-weight: normal;
    font-size: 0.875em;
    color: #92a3b9;
  }
  > thead > tr > th:first-of-type {
    padding: 0px 5px 0px 0px;
  }
  > thead > tr > th:last-of-type {
    padding: 0px 0px 0px 5px;
  }

  > tbody > tr > td {
    padding: 10px 5px;
    border-bottom: 1px solid #f4f6f9;
  }
  > tbody > tr > td:first-of-type {
    padding: 10px 5px 10px 0px;
  }
  > tbody > tr > td:last-of-type {
    padding: 10px 0px 10px 5px;
  }
  > tbody > tr > td > span {
    font-size: 0.875em;
    color: #92a3b9;
  }
`

export default function WalletSection({ wallets }: WalletSectionProps) {
  console.log(wallets)

  return (
    <Section title="Wallet">
      <WalletTable>
        <thead>
          <tr>
            <th style={{ textAlign: 'left' }}>Wallet Type</th>
            <th style={{ textAlign: 'left' }}>Wallet ID</th>
            <th style={{ textAlign: 'right' }}>Balance / Holded</th>
            <th style={{ textAlign: 'center' }}>Status</th>
            <th style={{ textAlign: 'center' }}>Default</th>
          </tr>
        </thead>
        <tbody>
          {wallets.length === 0 ? (
            <tr>
              {Array.from({ length: 5 }).map((_, index) => (
                <td key={index}>
                  <Skeleton />
                </td>
              ))}
            </tr>
          ) : null}
          {wallets.map((wallet, index) => {
            return (
              <tr key={index}>
                <td>{walletTypeMaster[wallet.type].label}</td>
                <td>{wallet.id}</td>
                <td align="right">
                  {currencyFormatter.format(wallet.balance, {
                    code: wallet.currency
                  })}{' '}
                  /{' '}
                  <span>
                    {currencyFormatter.format(wallet.hold_balance, {
                      code: wallet.currency
                    })}
                  </span>
                </td>
                <td align="center">
                  <Badge
                    color={walletStatusMaster[wallet.status].color}
                    backgroundcolor={
                      walletStatusMaster[wallet.status].backgroundColor
                    }
                  >
                    {walletStatusMaster[wallet.status].label}
                  </Badge>
                </td>
                <td align="center">
                  {wallet.is_default ? (
                    <i
                      className="fas fa-check-circle"
                      style={{ color: '#2fa12d' }}
                    />
                  ) : (
                    <i className="fas fa-circle" />
                  )}
                </td>
              </tr>
            )
          })}
        </tbody>
      </WalletTable>
    </Section>
  )
}
