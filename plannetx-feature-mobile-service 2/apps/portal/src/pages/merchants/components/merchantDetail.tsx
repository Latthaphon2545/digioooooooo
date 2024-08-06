import currencyFormatter from 'currency-formatter'
import { Col, Container, Row } from 'react-grid-system'
import Badge from '../../../components/commons/badge'
import Button from '../../../components/commons/button'
import Hr from '../../../components/commons/hr'
import Section from '../../../components/commons/section'
import Skeleton from '../../../components/commons/skeleton'
import Title from '../../../components/commons/title'
import merchantStatusMaster from '../../../constants/masters/merchantStatusMaster.json'
import userSubTypeMaster from '../../../constants/masters/userSubTypeMaster.json'
import walletStatusMaster from '../../../constants/masters/walletStatusMaster.json'
import walletTypeMaster from '../../../constants/masters/walletTypeMaster.json'
import { MerchantInfoProps } from '../../../props/merchantInfoProps'
import styled from 'styled-components'
import { RenderField } from '../../../utils/renderField'

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

interface MerchantDetailProps {
  merchantInfo: MerchantInfoProps
  permission: any
  isFetching: boolean
  handleOnClickSuspend: () => void
  handleOnClickUnsuspend: () => void
  handleOnClickEdit: () => void
}

export const MerchantDetail = ({
  merchantInfo,
  permission,
  isFetching,
  handleOnClickSuspend,
  handleOnClickUnsuspend,
  handleOnClickEdit
}: MerchantDetailProps) => {
  return (
    <Container fluid>
      <Row style={{ margin: '0px -10px' }}>
        <Col sm={6}>
          <Title>Merchant</Title>
        </Col>
      </Row>
      <Row style={{ margin: '0px -10px' }}>
        <Col lg={5} style={{ margin: '10px 0px' }}>
          <Section title="Detail">
            <Container fluid={true}>
              <Row style={{ margin: '0px -10px' }}>
                <Col sm={12}>
                  <Container fluid={true}>
                    <Row style={{ margin: '0px -10px' }}>
                      <Col sm={6}>
                        <RenderField
                          label="Username"
                          value={merchantInfo.username}
                          isFetching={isFetching}
                        />
                        <RenderField
                          label="Name [EN]"
                          value={
                            merchantInfo.lastnameEN
                              ? merchantInfo.firstnameEN +
                                ' ' +
                                merchantInfo.lastnameEN
                              : merchantInfo.firstnameEN
                          }
                          isFetching={isFetching}
                        />
                        <RenderField
                          label="Name [TH]"
                          value={
                            merchantInfo.lastnameTH
                              ? merchantInfo.firstnameTH +
                                ' ' +
                                merchantInfo.lastnameTH
                              : merchantInfo.firstnameTH
                          }
                          isFetching={isFetching}
                        />
                        <RenderField
                          label="Phone No"
                          value={merchantInfo.phoneNo}
                          isFetching={isFetching}
                        />
                        <RenderField
                          label="Email"
                          value={merchantInfo.email}
                          isFetching={isFetching}
                        />
                        <RenderField
                          label="Settle Time"
                          value={merchantInfo.settleTime}
                          isFetching={isFetching}
                        />
                        <RenderField
                          label="Settle to Agent"
                          value={
                            merchantInfo.settleToAgentFirstnameEN +
                            ' ' +
                            merchantInfo.settleToAgentLastnameEN
                          }
                          isFetching={isFetching}
                        />
                        <RenderField
                          label="Created At"
                          value={merchantInfo.createdAt}
                          isFetching={isFetching}
                        />
                      </Col>
                      <Col sm={6}>
                        <RenderField
                          label="Status"
                          value={
                            merchantInfo.status && (
                              <Badge
                                width="80px;"
                                color={
                                  merchantStatusMaster[merchantInfo.status]
                                    .color
                                }
                                backgroundcolor={
                                  merchantStatusMaster[merchantInfo.status]
                                    .backgroundColor
                                }
                              >
                                {
                                  merchantStatusMaster[merchantInfo.status]
                                    .label
                                }
                              </Badge>
                            )
                          }
                          isFetching={isFetching}
                        />

                        <RenderField
                          label="MID"
                          value={merchantInfo.mid}
                          isFetching={isFetching}
                        />

                        <RenderField
                          label="Type"
                          value={
                            merchantInfo.subType &&
                            userSubTypeMaster[merchantInfo.subType].label
                          }
                          isFetching={isFetching}
                        />
                        <RenderField
                          label="Tax ID"
                          value={merchantInfo.taxId}
                          isFetching={isFetching}
                        />

                        <RenderField
                          label="Citizen ID"
                          value={merchantInfo.citizenId}
                          isFetching={isFetching}
                        />
                        <RenderField
                          label="Passport"
                          value={merchantInfo.passport}
                          isFetching={isFetching}
                        />
                        <RenderField
                          label="Branch"
                          value={merchantInfo.branchNameEN}
                          isFetching={isFetching}
                        />
                        <RenderField
                          label="Updated At"
                          value={merchantInfo.updatedAt}
                          isFetching={isFetching}
                        />
                      </Col>
                    </Row>
                    {isFetching ? null : (
                      <>
                        <Row style={{ margin: '0px -10px' }}>
                          <Hr />
                        </Row>
                        <Row style={{ margin: '0px -10px' }}>
                          {(() => {
                            if (permission && permission.edit) {
                              switch (merchantInfo.status) {
                                case merchantStatusMaster.VERIFIED.value:
                                  return (
                                    <Col sm={6}>
                                      <Button
                                        dangeralt
                                        onClick={handleOnClickSuspend}
                                      >
                                        <i className="fas fa-ban" />
                                        Suspend
                                      </Button>
                                    </Col>
                                  )
                                case merchantStatusMaster.SUSPENDED.value:
                                  return (
                                    <Col sm={6}>
                                      <Button
                                        successalt
                                        onClick={handleOnClickUnsuspend}
                                      >
                                        <i className="far fa-check-circle" />
                                        Unsuspend
                                      </Button>
                                    </Col>
                                  )
                              }
                            }
                          })()}
                          {(() => {
                            if (permission && permission.edit) {
                              return (
                                <Col sm={6}>
                                  <Button
                                    $secondary
                                    onClick={handleOnClickEdit}
                                  >
                                    <i className="fas fa-user-edit" />
                                    Edit Merchant
                                  </Button>
                                </Col>
                              )
                            }
                          })()}
                        </Row>
                      </>
                    )}
                  </Container>
                </Col>
              </Row>
            </Container>
          </Section>
        </Col>
        <Col lg={7} style={{ margin: '10px 0px' }}>
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
                {merchantInfo.wallets.length === 0 && (
                  <tr>
                    {Array.from({ length: 5 }).map((_, index) => (
                      <td key={index}>
                        <Skeleton />
                      </td>
                    ))}
                  </tr>
                )}
                {merchantInfo.wallets.map((wallet, index) => {
                  return (
                    <tr key={index}>
                      <td>{walletTypeMaster[wallet.type].label}</td>
                      <td>{wallet.walletId}</td>
                      <td align="right">
                        {currencyFormatter.format(wallet.balance, {
                          code: wallet.currency
                        })}{' '}
                        /{' '}
                        <span>
                          {currencyFormatter.format(wallet.holdBalance, {
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
                        {wallet.isDefault ? (
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
        </Col>
      </Row>
    </Container>
  )
}
