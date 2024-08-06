'use cilent'

import currencyFormatter from 'currency-formatter'
import styled from 'styled-components'
import { Col, Container, Row } from 'react-grid-system'
import { UserInfoProps } from '../../../props/userInfoProps'
import Badge from '../../../components/commons/badge'
import Bank from '../../../components/commons/bank'
import Button from '../../../components/commons/button'
import Section from '../../../components/commons/section'
import Skeleton from '../../../components/commons/skeleton'
import Title from '../../../components/commons/title'
import SectionWrapper from '../../../components/commons/section'
import bankMaster from '../../../constants/masters/bankMaster.json'
import userGenderMaster from '../../../constants/masters/userGenderMaster.json'
import userStatusMaster from '../../../constants/masters/userStatusMaster.json'
import userSubTypeMaster from '../../../constants/masters/userSubTypeMaster.json'
import userTypeMaster from '../../../constants/masters/userTypeMaster.json'
import walletStatusMaster from '../../../constants/masters/walletStatusMaster.json'
import walletTypeMaster from '../../../constants/masters/walletTypeMaster.json'
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

interface UserUiProps {
  userInfo: UserInfoProps
  isFetching: boolean
  handleOnClickSuspend: () => void
  handleOnClickUnsuspend: () => void
  handleOnClickEdit: () => void
}

export const DisplayUsers = ({
  userInfo,
  isFetching,
  handleOnClickSuspend,
  handleOnClickUnsuspend,
  handleOnClickEdit
}: UserUiProps) => {
  return (
    <Container fluid>
      <Row style={{ margin: '0px -10px' }}>
        <Col sm={12}>
          <Title>User</Title>
        </Col>
      </Row>
      <Row style={{ margin: '0px -10px' }}>
        <Col xl={5} style={{ margin: '10px 0px' }}>
          <SectionWrapper title="Detail">
            <Container fluid={true}>
              <Row style={{ margin: '0px -10px' }}>
                <Col sm={12}>
                  <Container fluid={true}>
                    <Row style={{ margin: '0px -10px' }}>
                      <Col md={6}>
                        <RenderField
                          label="Name [EN]"
                          value={[
                            userInfo.firstnameEN,
                            userInfo.lastnameEN
                          ].join('')}
                          isFetching={isFetching}
                        />
                        <RenderField
                          label="Name [TH]"
                          value={[
                            userInfo.firstnameTH,
                            userInfo.lastnameTH
                          ].join(' ')}
                          isFetching={isFetching}
                        />
                        <RenderField
                          label="Gender"
                          value={
                            userInfo.gender
                              ? userGenderMaster[userInfo.gender]?.label || '-'
                              : '-'
                          }
                          isFetching={isFetching}
                        />
                        <RenderField
                          label="Birthdate"
                          value={userInfo.birthdate}
                          isFetching={isFetching}
                        />
                        <RenderField
                          label="Phone No"
                          value={userInfo.phoneNo}
                          isFetching={isFetching}
                        />
                        <RenderField
                          label="Email"
                          value={userInfo.email}
                          isFetching={isFetching}
                        />
                        <RenderField
                          label="Status"
                          value={
                            userInfo.status && (
                              <Badge
                                width="80px"
                                color={userStatusMaster[userInfo.status].color}
                                backgroundcolor={
                                  userStatusMaster[userInfo.status]
                                    .backgroundColor
                                }
                              >
                                {userStatusMaster[userInfo.status].label}
                              </Badge>
                            )
                          }
                          isFetching={isFetching}
                        />
                        <RenderField
                          label="Created At"
                          value={userInfo.createdAt}
                          isFetching={isFetching}
                        />
                        <RenderField
                          label="Updated At"
                          value={userInfo.updatedAt}
                          isFetching={isFetching}
                        />
                      </Col>
                      <Col md={6}>
                        <RenderField
                          label="UID"
                          value={userInfo.uid}
                          isFetching={isFetching}
                        />
                        <RenderField
                          label="Type"
                          value={
                            userInfo.type && userTypeMaster[userInfo.type].label
                          }
                          isFetching={isFetching}
                        />
                        <RenderField
                          label="Sub Type"
                          value={
                            userInfo.subType &&
                            userSubTypeMaster[userInfo.subType].label
                          }
                          isFetching={isFetching}
                        />
                        <RenderField
                          label="Tax ID"
                          value={userInfo.taxId}
                          isFetching={isFetching}
                        />
                        <RenderField
                          label="Citizen ID / Passport"
                          value={userInfo.citizenId || userInfo.passport}
                          isFetching={isFetching}
                        />
                        <RenderField
                          label="Bank"
                          value={
                            userInfo.bank && (
                              <>
                                <Bank bank={userInfo.bank} />
                                {bankMaster[userInfo.bank].label}
                              </>
                            )
                          }
                          isFetching={isFetching}
                        />
                        <RenderField
                          label="Bank Branch"
                          value={userInfo.bankBranch}
                          isFetching={isFetching}
                        />
                        <RenderField
                          label="Bank Account Number"
                          value={userInfo.bankAccountNumber}
                          isFetching={isFetching}
                        />
                        <RenderField
                          label="Bank Account Name"
                          value={userInfo.bankAccountName}
                          isFetching={isFetching}
                        />
                      </Col>
                    </Row>
                  </Container>
                </Col>
              </Row>
              <Row style={{ margin: '10px -10px 0px -10px' }}>
                {(() => {
                  switch (userInfo.status) {
                    case userStatusMaster.VERIFIED.value:
                      return (
                        <Col xs={6}>
                          <Button dangeralt onClick={handleOnClickSuspend}>
                            <i className="fas fa-ban" />
                            Suspend
                          </Button>
                        </Col>
                      )
                    case userStatusMaster.SUSPENDED.value:
                      return (
                        <Col xs={6}>
                          <Button successalt onClick={handleOnClickUnsuspend}>
                            <i className="far fa-check-circle" />
                            Unsuspend
                          </Button>
                        </Col>
                      )
                  }
                })()}
                {!isFetching && (
                  <Col xs={6}>
                    <Button $secondary onClick={handleOnClickEdit}>
                      <i className="fas fa-user-edit" />
                      Edit User
                    </Button>
                  </Col>
                )}
              </Row>
            </Container>
          </SectionWrapper>
        </Col>
        <Col xl={7} style={{ margin: '10px 0px' }}>
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
                {userInfo.wallets.length === 0 && (
                  <tr>
                    {Array.from({ length: 5 }).map((_, index) => (
                      <td key={index}>
                        <Skeleton />
                      </td>
                    ))}
                  </tr>
                )}
                {userInfo.wallets.map((wallet, index) => {
                  return (
                    <tr key={index}>
                      <td>{walletTypeMaster[wallet.type].label}</td>
                      <td>{wallet.wallet_id}</td>
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
        </Col>
      </Row>
    </Container>
  )
}
