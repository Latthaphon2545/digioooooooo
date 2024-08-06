import currencyFormatter from 'currency-formatter'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-grid-system'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import Badge from '../../components/commons/badge'
import Label from '../../components/commons/label'
import Section from '../../components/commons/section'
import Skeleton from '../../components/commons/skeleton'
import Title from '../../components/commons/title'

import MainLayout from '../../components/layouts/mainLayout'

import partnerStatusMaster from '../../constants/masters/partnerStatusMaster.json'
import transactionStatusMaster from '../../constants/masters/transactionStatusMaster.json'
import transactionSubTypeMaster from '../../constants/masters/transactionSubTypeMaster.json'
import transactionTypeMaster from '../../constants/masters/transactionTypeMaster.json'
import walletTypeMaster from '../../constants/masters/walletTypeMaster.json'

import axios, {
  CustomAxiosRequestConfig,
  DispatchAction
} from '../../helpers/axios'
import Swal from '../../helpers/sweetalert'

import withAuthenticated from '../../hocs/withAuthenticated'
import { useSelectorProps } from '../../props/useSelectorProps'
import { Dispatch } from '@reduxjs/toolkit'

const Logo = styled.img`
  padding: 10px;
  width: 100%;
  height: auto;
  box-sizing: border-box;
`

const PartnersPage = () => {
  const router = useRouter()
  const dispatch = useDispatch<Dispatch<DispatchAction>>()
  const config: CustomAxiosRequestConfig = {
    dispatch
  }
  const user = useSelector((state: useSelectorProps) => state.user)
  const [isFetching, setIsFetching] = useState(true)
  const [logo, setLogo] = useState('')
  const [name, setName] = useState('')
  const [currency, setCurrency] = useState('')
  const [timezone, setTimezone] = useState('')
  const [dateFormat, setDateFormat] = useState('')
  const [status, setStatus] = useState('')
  const [transactionConfigs, setTransactionConfigs] = useState([])
  const [transactionFees, setTransactionFees] = useState([])
  const [transactionLimites, setTransactionLimites] = useState([])
  const [walletLimites, setWalletLimites] = useState([])
  const [createdAt, setCreatedAt] = useState('')
  const [updatedAt, setUpdatedAt] = useState('')

  const handleFetchInpartner = async () => {
    setIsFetching(true)
    try {
      const response = await axios.get('/api/partner', config)

      const data = response.data
      setLogo(data.logo)
      setName(data.name)
      setCurrency(data.currency)
      setTimezone(data.timezone)
      setDateFormat(data.date_format)
      setStatus(data.status)
      setTransactionConfigs(data.transaction_configs)
      setTransactionFees(data.transaction_fees)
      setTransactionLimites(data.transaction_limites)
      setWalletLimites(data.wallet_limites)
      setCreatedAt(data.created_at)
      setUpdatedAt(data.updated_at)
      setIsFetching(false)
    } catch (err) {
      const message = err.response ? err.response.data.res_desc : err.message

      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: message
      })
      console.error(err)
    }
  }

  useEffect(() => {
    if (user) {
      handleFetchInpartner()
    }
  }, [router.query, user])
  return (
    <>
      <Head>
        <title>Partner · Whalepay</title>
      </Head>
      <MainLayout isFetching={!user}>
        <Container fluid>
          <Row justify="between" style={{ margin: '0px -10px' }}>
            <Col sm={6}>
              <Title>Partner</Title>
            </Col>
          </Row>
          <Row style={{ margin: '10px -10px' }}>
            <Col xs={12}>
              <Section title="Detail">
                <Container fluid>
                  <Row style={{ margin: '0px -10px' }}>
                    <Col md={2} style={{ alignSelf: 'center' }}>
                      {isFetching ? (
                        <Skeleton style={{ paddingBottom: '100%' }} />
                      ) : (
                        <Logo src={logo} />
                      )}
                    </Col>
                    <Col md={5}>
                      <Label>Name</Label>
                      {isFetching ? <Skeleton /> : name}
                      <Label>Currency</Label>
                      {isFetching ? <Skeleton /> : currency}
                      <Label>Timezone</Label>
                      {isFetching ? <Skeleton /> : timezone}
                      <Label>Date Format</Label>
                      {isFetching ? <Skeleton /> : dateFormat}
                    </Col>
                    <Col md={5}>
                      <Label>Status</Label>
                      {isFetching ? (
                        <Skeleton />
                      ) : (
                        <Badge
                          width="80px;"
                          color={partnerStatusMaster[status].color}
                          backgroundcolor={
                            partnerStatusMaster[status].backgroundColor
                          }
                        >
                          {partnerStatusMaster[status].label}
                        </Badge>
                      )}
                      <Label>Created At</Label>
                      {isFetching ? <Skeleton /> : createdAt}
                      <Label>Updated At</Label>
                      {isFetching ? <Skeleton /> : updatedAt}
                    </Col>
                  </Row>
                </Container>
              </Section>
            </Col>
          </Row>
          <Row style={{ margin: '10px -10px' }}>
            <Col xs={12}>
              <Section title="Transaction Config">
                <Container fluid>
                  <Row style={{ margin: '0px -10px' }}>
                    <Col md={2}>
                      <Label>Type</Label>
                    </Col>
                    <Col md={2}>
                      <Label>SubType</Label>
                    </Col>
                    <Col md={2}>
                      <Label>Holding</Label>
                    </Col>
                    <Col md={2}>
                      <Label>Updated At</Label>
                    </Col>
                  </Row>
                  {transactionConfigs.map((transactionConfig, index) => {
                    return (
                      <Row
                        style={
                          index + 1 === transactionConfigs.length
                            ? {
                                margin: '10px -10px 0px -10px'
                              }
                            : {
                                margin: '10px -10px'
                              }
                        }
                        key={index}
                      >
                        <Col md={2}>
                          {transactionTypeMaster[transactionConfig.type].label}
                        </Col>
                        <Col md={2}>
                          {
                            transactionSubTypeMaster[transactionConfig.sub_type]
                              .label
                          }
                        </Col>
                        <Col md={2}>
                          {transactionConfig.is_holding ? (
                            <Badge
                              width="80px"
                              color={transactionStatusMaster.HOLDED.color}
                              backgroundcolor={
                                transactionStatusMaster.HOLDED.backgroundColor
                              }
                            >
                              Hold
                            </Badge>
                          ) : (
                            <Badge
                              width="80px"
                              color={transactionStatusMaster.APPROVED.color}
                              backgroundcolor={
                                transactionStatusMaster.APPROVED.backgroundColor
                              }
                            >
                              Release
                            </Badge>
                          )}
                        </Col>
                        <Col md={2}>{transactionConfig.updated_at}</Col>
                      </Row>
                    )
                  })}
                </Container>
              </Section>
            </Col>
          </Row>
          <Row style={{ margin: '10px -10px 0px -10px' }}>
            <Col xs={12}>
              <Section title="Transaction Fee">
                <Container fluid>
                  <Row style={{ margin: '0px -10px' }}>
                    <Col sm={2}>
                      <Label>Type</Label>
                    </Col>
                    <Col sm={2}>
                      <Label>SubType</Label>
                    </Col>
                    <Col sm={4}>
                      <Label>Range</Label>
                    </Col>
                    <Col sm={2}>
                      <Label>Fee</Label>
                    </Col>
                    <Col sm={2}>
                      <Label>Updated At</Label>
                    </Col>
                  </Row>
                  {transactionFees.map((transactionFee, index) => {
                    return (
                      <Row
                        style={
                          index + 1 === transactionFees.length
                            ? {
                                margin: '10px -10px 0px -10px'
                              }
                            : {
                                margin: '10px -10px'
                              }
                        }
                        key={index}
                      >
                        <Col md={2}>
                          {transactionTypeMaster[transactionFee.type].label}
                        </Col>
                        <Col md={2}>
                          {
                            transactionSubTypeMaster[transactionFee.sub_type]
                              .label
                          }
                        </Col>
                        <Col md={4}>
                          {currencyFormatter.format(transactionFee.start, {
                            code: currency
                          })}{' '}
                          -{' '}
                          {currencyFormatter.format(transactionFee.end, {
                            code: currency
                          })}
                        </Col>
                        <Col md={2}>
                          {currencyFormatter.format(transactionFee.fee, {
                            code: currency
                          })}
                        </Col>
                        <Col md={2}>{transactionFee.updated_at}</Col>
                      </Row>
                    )
                  })}
                </Container>
              </Section>
            </Col>
          </Row>
          <Row style={{ margin: '10px -10px' }}>
            <Col xs={12}>
              <Section title="Transaction Limit">
                <Container fluid>
                  <Row style={{ margin: '0px -10px' }}>
                    <Col md={2}>
                      <Label>Type</Label>
                    </Col>
                    <Col md={2}>
                      <Label>SubType</Label>
                    </Col>
                    <Col md={2}>
                      <Label>Limit / Transaction</Label>
                    </Col>
                    <Col md={2}>
                      <Label>Limit / Day</Label>
                    </Col>
                    <Col md={2}>
                      <Label>Updated At</Label>
                    </Col>
                  </Row>
                  {transactionLimites.map((transactionLimit, index) => {
                    return (
                      <Row
                        style={
                          index + 1 === transactionConfigs.length
                            ? {
                                margin: '10px -10px 0px -10px'
                              }
                            : {
                                margin: '10px -10px'
                              }
                        }
                        key={index}
                      >
                        <Col md={2}>
                          {transactionTypeMaster[transactionLimit.type].label}
                        </Col>
                        <Col md={2}>
                          {
                            transactionSubTypeMaster[transactionLimit.sub_type]
                              .label
                          }
                        </Col>
                        <Col md={2}>
                          {currencyFormatter.format(
                            transactionLimit.limit_per_transaction,
                            { code: currency }
                          )}
                        </Col>
                        <Col md={2}>
                          {currencyFormatter.format(
                            transactionLimit.limit_per_day,
                            { code: currency }
                          )}
                        </Col>
                        <Col md={2}>{transactionLimit.updated_at}</Col>
                      </Row>
                    )
                  })}
                </Container>
              </Section>
            </Col>
          </Row>
          <Row style={{ margin: '10px -10px' }}>
            <Col xs={12}>
              <Section title="Wallet Limit">
                <Container fluid>
                  <Row style={{ margin: '0px -10px' }}>
                    <Col md={2}>
                      <Label>Type</Label>
                    </Col>
                    <Col md={2}>
                      <Label>Balance Limit</Label>
                    </Col>
                    <Col md={2}>
                      <Label>Updated At</Label>
                    </Col>
                  </Row>
                  {walletLimites.map((walletLimit, index) => {
                    return (
                      <Row
                        style={
                          index + 1 === transactionConfigs.length
                            ? {
                                margin: '10px -10px 0px -10px'
                              }
                            : {
                                margin: '10px -10px'
                              }
                        }
                        key={index}
                      >
                        <Col md={2}>
                          {walletTypeMaster[walletLimit.type].label}
                        </Col>
                        <Col md={2}>
                          {currencyFormatter.format(walletLimit.limit_balance, {
                            code: currency
                          })}
                        </Col>
                        <Col md={2}>{walletLimit.updated_at}</Col>
                      </Row>
                    )
                  })}
                </Container>
              </Section>
            </Col>
          </Row>
        </Container>
      </MainLayout>
    </>
  )
}

export default withAuthenticated(PartnersPage)
