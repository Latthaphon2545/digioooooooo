import { saveAs } from 'file-saver'
import moment from 'moment'
import Head from 'next/head'
import Router, { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-grid-system'
import { useDispatch, useSelector } from 'react-redux'

import portalPermissionMaster from '../../constants/masters/portalPermissionMaster'
import portalTypeMaster from '../../constants/masters/portalTypeMaster'
import transactionSettlementBatchStatusMaster from '../../constants/masters/transactionSettlementBatchStatusMaster'
import transactionTypeMaster from '../../constants/masters/transactionTypeMaster'

import Badge from '../../components/commons/badge'
import Button from '../../components/commons/button'
import DatePickerRange from '../../components/commons/datePickerRange'
import Input from '../../components/commons/input'
import Select from '../../components/commons/select'
import Table from '../../components/commons/table'
import Title from '../../components/commons/title'

import MainLayout from '../../components/layouts/mainLayout'

import axios from '../../helpers/axios'
import Swal from '../../helpers/sweetalert'

import withAuthenticated from '../../hocs/withAuthenticated'

const SettlementPage = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const [inpartners, setInpartners] = useState([])
  const [permission, setPermission] = useState(null)
  const [isFetching, setIsFetching] = useState(true)
  const [partnerID, setPartnerID] = useState(
    Number(router.query.partner_id) || ''
  )
  const [isProceedFetching, setIsProceedFetching] = useState(false)
  const [isSettledFetching, setIsSettledFetching] = useState(false)
  const [startDate, setStartDate] = useState(
    router.query.start_date
      ? moment(router.query.start_date)
      : moment().subtract(7, 'days')
  )
  const [endDate, setEndDate] = useState(
    router.query.end_date ? moment(router.query.end_date) : moment()
  )
  const [batchNo, setBatchNo] = useState(router.query.batch_no || '')
  const [status, setStatus] = useState(router.query.status || '')
  const [page, setPage] = useState(Number(router.query.page) || 0)
  const [pageSize, setPageSize] = useState(Number(router.query.limit) || 10)
  const [total, setTotal] = useState(0)
  const [rows, setRows] = useState([])
  const handleFetchInpartners = () => {
    axios
      .get('/api/inpartner')
      .then(({ data }) => {
        setInpartners(data.inpartners)
      })
      .catch((err) => {
        console.error(err)
      })
  }
  const handleFetchSettlement = () => {
    setIsFetching(true)
    axios
      .get('/api/transaction/settlement/batch', {
        headers: { 'x-partner-id': partnerID },
        params: {
          start_date: moment(startDate).format('YYYY-MM-DD'),
          end_date: moment(endDate).format('YYYY-MM-DD'),
          batch_no: batchNo,
          status: status,
          limit: pageSize,
          offset: page * pageSize
        },
        dispatch
      })
      .then(({ data }) => {
        setIsFetching(false)
        setTotal(data.total)
        setRows(data.batches)
      })
      .catch((err) => {
        const message = err.response ? err.response.data.res_desc : err.message
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: message
        })
        console.error(err)
      })
  }
  const handleOnClickProceed = (e, settlement) => {
    e.stopPropagation()
    setIsProceedFetching(true)
    Swal.showLoading()
    axios
      .get(`/api/transaction/settlement/batch/${settlement.id}`, {
        responseType: 'blob',
        dispatch
      })
      .then(({ data }) => {
        setRows(
          rows.map((row) => {
            if (row.id === settlement.id) {
              return {
                ...row,
                status: transactionSettlementBatchStatusMaster.PROCESSING.value
              }
            }
            return row
          })
        )
        saveAs(data, `settlement-${settlement.batch_no}.csv`)
        setIsProceedFetching(false)
        Swal.close()
      })
      .catch((err) => {
        setIsProceedFetching(false)
        const message = err.response ? err.response.data.res_desc : err.message
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: message
        })
        console.error(err)
      })
  }
  const handleOnClickSettle = (e, settlement) => {
    e.stopPropagation()
    setIsSettledFetching(true)
    Swal.fire({
      icon: 'question',
      title: 'Settle Transaction',
      text: 'Are you sure you want to settle this batch?',
      showCancelButton: true,
      confirmButtonText: 'Yes, Settle',
      cancelButtonText: 'No, Cancel'
    })
      .then((result) => {
        if (result.isConfirmed) {
          return axios.patch(
            `/api/transaction/settlement/batch/${settlement.id}/settled`,
            { dispatch }
          )
        } else {
          return false
        }
      })
      .then((result) => {
        if (result) {
          setRows(
            rows.map((row) => {
              if (row.id === settlement.id) {
                return {
                  ...row,
                  status: transactionSettlementBatchStatusMaster.SETTLED.value
                }
              }
              return row
            })
          )
          setIsSettledFetching(false)
        }
      })
      .catch((err) => {
        setIsSettledFetching(false)
        const message = err.response ? err.response.data.res_desc : err.message
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: message
        })
        console.error(err)
      })
  }
  const handleOnClickSearch = () => {
    setPage(0)
    Router.push({
      pathname: '/settlement',
      query: {
        partner_id: partnerID,
        start_date: startDate.format('YYYY-MM-DD'),
        end_date: endDate.format('YYYY-MM-DD'),
        batch_no: batchNo,
        status
      }
    })
  }
  const handleOnChangePage = (page) => {
    setPage(page)
    Router.push({
      pathname: '/settlement',
      query: { ...router.query, page }
    })
  }
  const handleOnChangePageSize = (pageSize) => {
    setPageSize(pageSize)
    Router.push({
      pathname: '/settlement',
      query: { ...router.query, limit: pageSize }
    })
  }
  useEffect(() => {
    if (user && user.type === portalTypeMaster.DIGIO) {
      handleFetchInpartners()
    }
  }, [user])
  useEffect(() => {
    if (user) {
      setPermission(
        user.permissions.find(
          (permission) => permission.name === portalPermissionMaster.SETTLEMENT
        )
      )
      handleFetchSettlement()
    }
  }, [router.query, user])
  return (
    <>
      <Head>
        <title>Settlement · Whalepay</title>
      </Head>
      <MainLayout isFetching={!user}>
        <Container fluid>
          <Row justify="between" style={{ margin: '0px -10px' }}>
            <Col sm={6}>
              <Title>Settlement</Title>
            </Col>
          </Row>
          <Row style={{ margin: '10px -10px 0px -10px' }}>
            <Col lg={2}>
              <Select
                icon="fas fa-handshake"
                onChange={(e) => setPartnerID(e.target.value)}
                value={partnerID}
              >
                <option value="">All Partner</option>
                {inpartners.map((inpartner, index) => {
                  return (
                    <option value={inpartner.id} key={index}>
                      {inpartner.name}
                    </option>
                  )
                })}
              </Select>
            </Col>
            <Col lg={3}>
              <DatePickerRange
                icon="fas fa-calendar"
                maxDate={moment().add(1, 'day')}
                startDate={startDate}
                endDate={endDate}
                onDatesChange={({ startDate, endDate }) => {
                  if (startDate) setStartDate(startDate)
                  if (endDate) setEndDate(endDate)
                }}
              />
            </Col>
            <Col lg={2}>
              <Input
                icon="fas fa-clipboard-list"
                type="text"
                minLength={12}
                maxLength={12}
                placeholder="Batch No"
                value={batchNo}
                onChange={(e) =>
                  setBatchNo(e.target.value.replace(/[^0-9]/, ''))
                }
              />
            </Col>
            <Col lg={3}>
              <Select
                icon="fas fa-bars"
                onChange={(e) => setStatus(e.target.value)}
                value={status}
              >
                <option value="">All Status</option>
                {Object.keys(transactionSettlementBatchStatusMaster).map(
                  (_status, index) => {
                    return (
                      <option
                        value={
                          transactionSettlementBatchStatusMaster[_status].value
                        }
                        key={index}
                      >
                        {transactionSettlementBatchStatusMaster[_status].label}
                      </option>
                    )
                  }
                )}
              </Select>
            </Col>
            <Col lg={2}>
              <Button primary onClick={handleOnClickSearch}>
                <i className="fas fa-search" />
                Search
              </Button>
            </Col>
          </Row>
          <Row style={{ margin: '20px -10px 0px -10px' }}>
            <Col xs={12}>
              <Table
                isFetching={isFetching}
                total={total}
                pageSize={pageSize}
                setPageSize={handleOnChangePageSize}
                page={page}
                setPage={handleOnChangePage}
                columns={[
                  {
                    label: 'Partner',
                    key: 'partner_name',
                    width: '10%'
                  },
                  {
                    label: 'Transaction Type',
                    width: '12.5%',
                    dataMutation: (row) =>
                      transactionTypeMaster[row.transaction_type].label
                  },
                  {
                    label: 'Batch Date',
                    key: 'batch_date',
                    width: '10%'
                  },
                  {
                    label: 'Batch No',
                    key: 'batch_no',
                    width: '12.5%'
                  },
                  {
                    label: 'Updated At',
                    key: 'updated_at',
                    width: '15%'
                  },
                  {
                    label: 'Status',
                    key: 'status',
                    width: '15%',
                    align: 'center',
                    dataMutation: (row) => (
                      <Badge
                        color={
                          transactionSettlementBatchStatusMaster[row.status]
                            .color
                        }
                        backgroundColor={
                          transactionSettlementBatchStatusMaster[row.status]
                            .backgroundColor
                        }
                      >
                        {
                          transactionSettlementBatchStatusMaster[row.status]
                            .label
                        }
                      </Badge>
                    )
                  },
                  {
                    width: '25%',
                    dataMutation: (row) => {
                      switch (row.status) {
                        case transactionSettlementBatchStatusMaster.PENDING
                          .value:
                          if (permission && permission.export) {
                            return (
                              <Button
                                primaryAlt
                                onClick={(e) => handleOnClickProceed(e, row)}
                                style={{
                                  fontSize: '0.875em',
                                  borderRadius: '20px'
                                }}
                                disalbed={
                                  isProceedFetching || isSettledFetching
                                }
                              >
                                <i className="fas fa-exchange-alt" />
                                Proceed
                              </Button>
                            )
                          }
                          break
                        case transactionSettlementBatchStatusMaster.PROCESSING
                          .value:
                          if (permission && permission.edit) {
                            return (
                              <Container style={{ margin: '0px -5px' }} fluid>
                                <Row>
                                  <Col xs={6}>
                                    <Button
                                      primaryAlt
                                      onClick={(e) =>
                                        handleOnClickProceed(e, row)
                                      }
                                      style={{
                                        fontSize: '0.875em',
                                        borderRadius: '20px'
                                      }}
                                      disalbed={
                                        isProceedFetching || isSettledFetching
                                      }
                                    >
                                      <i className="fas fa-exchange-alt" />
                                      Download
                                    </Button>
                                  </Col>
                                  <Col xs={6}>
                                    <Button
                                      successAlt
                                      onClick={(e) =>
                                        handleOnClickSettle(e, row)
                                      }
                                      style={{
                                        fontSize: '0.875em',
                                        borderRadius: '20px'
                                      }}
                                      disalbed={
                                        isProceedFetching || isSettledFetching
                                      }
                                    >
                                      <i className="fas fa-check-double" />
                                      Settle
                                    </Button>
                                  </Col>
                                </Row>
                              </Container>
                            )
                          }
                          break
                      }
                    }
                  }
                ]}
                rows={rows}
                onClickRow={
                  permission && permission.detail
                    ? (row) => {
                        Router.push({
                          pathname: '/transactions',
                          query: {
                            q: row.batch_no,
                            start_date: row.batch_date,
                            end_date: row.batch_date
                          }
                        })
                      }
                    : undefined
                }
              />
            </Col>
          </Row>
        </Container>
      </MainLayout>
    </>
  )
}

export default withAuthenticated(SettlementPage)
