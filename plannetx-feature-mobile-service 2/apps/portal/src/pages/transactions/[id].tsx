import currencyFormatter from 'currency-formatter'
import dayjs from 'dayjs'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { renderToString } from 'react-dom/server'
import { Col, Container, Row } from 'react-grid-system'
import { Provider, useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import store from '../../store'

import Bank from '../../components/commons/bank'
import Input from '../../components/commons/input'
import Label from '../../components/commons/label'
import Section from '../../components/commons/section'
import Skeleton from '../../components/commons/skeleton'
import Title from '../../components/commons/title'

import MainLayout from '../../components/layouts/mainLayout'

import portalPermissionMaster from '../../constants/masters/portalPermissionMaster.json'
import transactionStatusMaster from '../../constants/masters/transactionStatusMaster.json'

import axios, {
  CustomAxiosRequestConfig,
  DispatchAction
} from '../../helpers/axios'
import Swal from '../../helpers/sweetalert'

import withAuthenticated from '../../hocs/withAuthenticated'
import { useSelectorProps } from '../../props/useSelectorProps'
import { handleOnClickInquiry } from '../../utils/transactions/test'
import DetailSection from './components/detailSection'
import { Dispatch } from '@reduxjs/toolkit'
import {
  DefaultTransactionInfo,
  TransactionInfoProps
} from '../../props/transactionInfoProps'

const TimelineContainer = styled.div``

const Timeline = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  height: 70px;
  > .circle {
    font-size: 25px;
    line-height: 1;
  }
  > .line {
    position: absolute;
    left: 11px;
    width: 2px;
    height: calc(100% - 30px);
    background-color: #f0f0f0;
    transform: translateY(34.5px);
  }
  > .content {
    flex-grow: 1;
    margin-left: 30px;
  }
  > .content > .label > span:nth-of-type(2) {
    margin-left: 10px;
    padding: 0px 10px;
    font-size: 0.875em;
    color: #92a3b9;
    background-color: #fafbfd;
    border-radius: 20px;
  }
  > .content > .date {
    font-size: 0.875em;
    color: #92a3b9;
  }
`

const TransactionPage = () => {
  const router = useRouter()
  const dispatch = useDispatch<Dispatch<DispatchAction>>()
  const config: CustomAxiosRequestConfig = {
    dispatch
  }
  const user = useSelector((state: useSelectorProps) => state.user)
  const [permission, setPermission] = useState(null)
  const [isFetching, setIsFetching] = useState(true)
  const [timeline, setTimeline] = useState([])
  const [transactionInfo, setTransactionInfo] = useState<TransactionInfoProps>(
    DefaultTransactionInfo
  )

  const handleFetchTransaction = async () => {
    const id = router.query.id

    try {
      const response = await axios.get(`/api/transaction/${id}`, config)
      const data = response.data
      const fetchTransaction: TransactionInfoProps = {
        partnerID: data.partner_id,
        type: data.type,
        subType: data.sub_type,
        referenceNo: data.reference_no,
        orderId: data.order_id,
        payerName: data.payer_name,
        payerWalletId: data.payer_wallet_id,
        payeeName: data.payee_name,
        payeeWalletId: data.payee_wallet_id,
        bank: data.bank,
        bankAccountNumber: data.bank_account_number,
        feeExudeName: data.fee_exude_name,
        feeExudeWalletId: data.fee_exude_wallet_id,
        discountAbsorbName: data.discount_absorb_name,
        discountAbsorbWalletId: data.discount_absorb_wallet_id,
        net: data.net,
        fee: data.fee,
        discount: data.discount,
        approvalCode: data.approval_code,
        discountCode: data.discount_code,
        total: data.total,
        currency: data.currency,
        status: data.status,
        batchNo: data.batch_no,
        reference1: data.reference1,
        reference2: data.reference2,
        reference3: data.reference3,
        externalReference: data.external_reference,
        remark: data.remark
      }
      setTransactionInfo(fetchTransaction)

      let timeline = [
        {
          label: 'Settled',
          subLabel: data.settled_by_name,
          value: data.settled_at,
          color: transactionStatusMaster.SETTLED.color,
          backgroundColor: transactionStatusMaster.SETTLED.backgroundColor
        },
        {
          label: 'Refunded',
          value: data.refunded_at,
          color: transactionStatusMaster.REFUNDED.color,
          backgroundColor: transactionStatusMaster.REFUNDED.backgroundColor
        },
        {
          label: 'Voided',
          subLabel: data.voided_by_name,
          value: data.voided_at,
          color: transactionStatusMaster.VOIDED.color,
          backgroundColor: transactionStatusMaster.VOIDED.backgroundColor
        },
        {
          label: 'Failed',
          value: data.failed_at,
          color: transactionStatusMaster.FAILED.color,
          backgroundColor: transactionStatusMaster.FAILED.backgroundColor
        },
        {
          label: 'Approved',
          value: data.approved_at,
          color: transactionStatusMaster.APPROVED.color,
          backgroundColor: transactionStatusMaster.APPROVED.backgroundColor
        },
        {
          label: 'Holded',
          value: data.holded_at,
          color: transactionStatusMaster.HOLDED.color,
          backgroundColor: transactionStatusMaster.HOLDED.backgroundColor
        },
        {
          label: 'Created',
          value: data.created_at,
          color: transactionStatusMaster.PENDING.color,
          backgroundColor: transactionStatusMaster.PENDING.backgroundColor
        }
      ]

      timeline = timeline
        .filter((date) => date.value !== null)
        .sort((a, b) => dayjs(b.value).diff(dayjs(a.value)))
      setTimeline(timeline)
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

  const onClickInquiry = () => {
    handleOnClickInquiry({
      id: router.query.id,
      partnerID: transactionInfo.partnerID,
      dispatch,
      setIsFetching,
      handleFetchTransaction
    })
  }

  const handleOnClickApprove = async () => {
    const id = router.query.id
    try {
      const result = await Swal.fire({
        icon: 'question',
        title: 'Approve Transaction',
        text: 'Are you sure you want to approve this transaction?',
        showCancelButton: true,
        confirmButtonText: 'Yes, Approve',
        cancelButtonText: 'No, Cancel'
      })

      if (result.isConfirmed) {
        setIsFetching(true)
        await axios.patch(`/api/transaction/${id}/approve`, null, {
          headers: { 'x-partner-id': transactionInfo.partnerID }
        })
        await handleFetchTransaction()
      }
    } catch (err) {
      setIsFetching(false)
      const message = err.response ? err.response.data.res_desc : err.message
      await Swal.fire({
        icon: 'error',
        title: 'Error',
        text: message
      })
      console.error(err)
    } finally {
      setIsFetching(false)
    }
  }

  const handleOnClickVoid = async () => {
    const id = router.query.id
    let reason

    try {
      const reasonResult = await Swal.fire({
        title: 'Void Transaction',
        html: renderToString(
          <Provider store={store}>
            <Container style={{ textAlign: 'left' }} fluid>
              <Row style={{ margin: '0px -10px' }}>
                <Col sm={6}>
                  <Label>Type</Label>
                  {transactionInfo.type}
                  <Label>SubType</Label>
                  {transactionInfo.subType}
                </Col>
                <Col sm={6}>
                  <Label>Reference No</Label>
                  {transactionInfo.referenceNo}
                  <Label>Total</Label>
                  {currencyFormatter.format(transactionInfo.total, {
                    code: transactionInfo.currency
                  })}
                </Col>
              </Row>
              <Row style={{ margin: '10px -10px 0px -10px' }}>
                <Col sm={12}>
                  <Input
                    id="swal-reason-input"
                    icon="fas fa-comment-dots"
                    type="text"
                    placeholder="Reason"
                    onChange={(e) => (reason = e.target.value)}
                    value={reason}
                  />
                </Col>
              </Row>
            </Container>
          </Provider>
        ),
        showCancelButton: true,
        confirmButtonText: 'Continue',
        preConfirm: () => {
          const inputReason = (
            document.getElementById('swal-reason-input') as HTMLInputElement
          ).value
          if (!inputReason) {
            Swal.showValidationMessage('Reason input missing')
            throw new Error('Reason input missing')
          }
          return inputReason
        }
      })

      if (reasonResult.isConfirmed) {
        reason = reasonResult.value
        const confirmationResult = await Swal.fire({
          icon: 'question',
          title: 'Void Transaction',
          text: 'Are you sure you want to void this transaction?',
          showCancelButton: true,
          confirmButtonText: 'Yes, Void',
          cancelButtonText: 'No, Cancel'
        })

        if (confirmationResult.isConfirmed) {
          setIsFetching(true)
          const finalConfig: CustomAxiosRequestConfig = {
            ...config,
            headers: {
              ...config?.headers,
              'x-partner-id': transactionInfo.partnerID
            }
          }
          await axios.patch(
            `/api/transaction/${id}/void`,
            { reason },
            finalConfig
          )

          await handleFetchTransaction()
        }
      }
    } catch (err) {
      setIsFetching(false)
      const message = err.response ? err.response.data.res_desc : err.message
      await Swal.fire({
        icon: 'error',
        title: 'Error',
        text: message
      })
      console.error(err)
    } finally {
      setIsFetching(false)
    }
  }

  useEffect(() => {
    if (user) {
      setPermission(
        user.permissions.find(
          (permission) => permission.name === portalPermissionMaster.TRANSACTION
        )
      )
      handleFetchTransaction()
    }
  }, [user])

  return (
    <>
      <Head>
        <title>Transaction · Whalepay</title>
      </Head>
      <MainLayout isFetching={!user}>
        <Container fluid>
          <Row style={{ margin: '0px -10px' }}>
            <Col xs={12}>
              <Title>Transaction</Title>
            </Col>
          </Row>
          <Row style={{ margin: '10px -10px 0px -10px' }}>
            <Col xl={8}>
              <Container fluid={true}>
                <Row style={{ margin: '0px -10px' }}>
                  <Col xs={12}>
                    <DetailSection
                      transactionInfo={transactionInfo}
                      permission={permission}
                      isFetching={isFetching}
                      onClickInquiry={onClickInquiry}
                      handleOnClickApprove={handleOnClickApprove}
                      handleOnClickVoid={handleOnClickVoid}
                    />
                  </Col>
                </Row>
                <Row style={{ margin: '10px -10px 0px -10px' }}>
                  <Col xs={12}>
                    <Section title="Wallet">
                      <Container fluid={true}>
                        <Row style={{ margin: '0px -10px' }}>
                          <Col sm={6}>
                            <Label>Type</Label>
                            {isFetching ? <Skeleton /> : transactionInfo.type}
                            <Label>Payer</Label>
                            {isFetching ? (
                              <Skeleton />
                            ) : (
                              transactionInfo.payerName
                            )}
                            <Label>Payer Wallet ID</Label>
                            {isFetching ? (
                              <Skeleton />
                            ) : (
                              transactionInfo.payerWalletId
                            )}
                            <Label>Bank</Label>
                            {isFetching ? (
                              <Skeleton />
                            ) : transactionInfo.bank ? (
                              <>
                                <Bank bank={transactionInfo.bank} />
                                {transactionInfo.bank}
                              </>
                            ) : (
                              '-'
                            )}
                            <Label>Fee Exude</Label>
                            {isFetching ? (
                              <Skeleton />
                            ) : (
                              transactionInfo.feeExudeName || '-'
                            )}
                            <Label>Fee Exude Wallet ID</Label>
                            {isFetching ? (
                              <Skeleton />
                            ) : (
                              transactionInfo.feeExudeWalletId || '-'
                            )}
                          </Col>
                          <Col sm={6}>
                            <Label>SubType</Label>
                            {isFetching ? (
                              <Skeleton />
                            ) : (
                              transactionInfo.subType
                            )}
                            <Label>Payee</Label>
                            {isFetching ? (
                              <Skeleton />
                            ) : (
                              transactionInfo.payeeName
                            )}
                            <Label>Payee Wallet ID</Label>
                            {isFetching ? (
                              <Skeleton />
                            ) : (
                              transactionInfo.payeeWalletId
                            )}
                            <Label>Bank Account Number</Label>
                            {isFetching ? (
                              <Skeleton />
                            ) : (
                              transactionInfo.bankAccountNumber || '-'
                            )}
                            <Label>Discount Absorb</Label>
                            {isFetching ? (
                              <Skeleton />
                            ) : (
                              transactionInfo.discountAbsorbName || '-'
                            )}
                            <Label>Discount Absorb Wallet ID</Label>
                            {isFetching ? (
                              <Skeleton />
                            ) : (
                              transactionInfo.discountAbsorbWalletId || '-'
                            )}
                          </Col>
                        </Row>
                      </Container>
                    </Section>
                  </Col>
                </Row>
              </Container>
            </Col>
            <Col xl={4}>
              <Section title="Timeline">
                <TimelineContainer>
                  {isFetching ? (
                    <Timeline>
                      <div className="circle">
                        <Skeleton
                          style={{ width: '25px', borderRadius: '25px' }}
                        />
                      </div>
                      <div className="content">
                        <div className="label">
                          <Skeleton />
                        </div>
                        <div className="date">
                          <Skeleton />
                        </div>
                      </div>
                    </Timeline>
                  ) : (
                    timeline.map((date, index) => {
                      return (
                        <Timeline key={index}>
                          <div
                            className="circle"
                            style={
                              index === 0
                                ? {
                                    color: date.color,
                                    WebkitTextStroke: `5px ${date.backgroundColor}`
                                  }
                                : {
                                    color: '#f0f0f0',
                                    WebkitTextStroke: '5px #f4f6f9'
                                  }
                            }
                          >
                            <i className="fas fa-circle" />
                          </div>
                          {index + 1 !== timeline.length ? (
                            <div className="line" />
                          ) : null}
                          <div className="content">
                            <div className="label">
                              <span>{date.label}</span>
                              {date.subLabel ? (
                                <span>{date.subLabel}</span>
                              ) : null}
                            </div>
                            <div className="date">{date.value}</div>
                          </div>
                        </Timeline>
                      )
                    })
                  )}
                </TimelineContainer>
              </Section>
            </Col>
          </Row>
        </Container>
      </MainLayout>
    </>
  )
}

export default withAuthenticated(TransactionPage)
