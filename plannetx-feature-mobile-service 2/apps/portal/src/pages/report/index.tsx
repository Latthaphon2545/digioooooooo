import { saveAs } from 'file-saver'
import moment from 'moment'
import Head from 'next/head'
import Router, { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-grid-system'
import { useDispatch, useSelector } from 'react-redux'
import styled, { ThemeProvider } from 'styled-components'

import Button from '../../components/commons/button'
import DatePickerRange from '../../components/commons/datePickerRange'
import Select from '../../components/commons/select'
import Table from '../../components/commons/table'
import Title from '../../components/commons/title'

import MainLayout from '../../components/layouts/mainLayout'

import portalTypeMaster from '../../constants/masters/portalTypeMaster.json'
import reportSubTypeMaster from '../../constants/masters/reportSubTypeMaster.json'
import reportTypeMaster from '../../constants/masters/reportTypeMaster.json'

import axios, {
  CustomAxiosRequestConfig,
  DispatchAction
} from '../../helpers/axios'
import Swal from '../../helpers/sweetalert'

import withAuthenticated from '../../hocs/withAuthenticated'
import { useSelectorProps } from '../../props/useSelectorProps'
import { Dispatch } from '@reduxjs/toolkit'

const DownloadButton = styled.button`
  apperance: none;
  padding: 0x;
  font-size: 1.5em;
  color: #3b5475;
  background: transparent;
  border: none;
  outline: none;
  &:hover {
    cursor: pointer;
    color: ${(props) => props.theme.ACCENT_COLOR};
  }
`

const ReportPage = () => {
  const router = useRouter()
  const dispatch = useDispatch<Dispatch<DispatchAction>>()
  const config: CustomAxiosRequestConfig = {
    dispatch
  }
  const theme = useSelector((state: useSelectorProps) => state.theme)
  const user = useSelector((state: useSelectorProps) => state.user)
  const [inpartners, setInpartners] = useState([])
  const [isFetching, setIsFetching] = useState(true)
  const [partnerID, setPartnerID] = useState(
    Number(router.query.partner_id) || ''
  )
  const [startDate, setStartDate] = useState(
    router.query.start_date
      ? moment(router.query.start_date)
      : moment().startOf('month')
  )
  const [endDate, setEndDate] = useState(
    router.query.end_date ? moment(router.query.end_date) : moment()
  )
  const [type, setType] = useState(router.query.type || '')
  const [subType, setSubType] = useState(router.query.sub_type || '')
  const [page, setPage] = useState(Number(router.query.page) || 0)
  const [pageSize, setPageSize] = useState(Number(router.query.limit) || 10)
  const [total, setTotal] = useState(0)
  const [rows, setRows] = useState([])

  const handleFetchInpartners = async () => {
    try {
      const response = await axios.get('/api/inpartner', config)
      const data = response.data
      setInpartners(data.inpartners)
    } catch (err) {
      console.error(err)
    }
  }

  const handleFetchReport = async () => {
    setIsFetching(true)
    try {
      const finalConfig: CustomAxiosRequestConfig = {
        ...config,
        headers: {
          ...config?.headers,
          'x-partner-id': partnerID
        },
        params: {
          start_date: startDate.format('YYYY-MM-DD'),
          end_date: endDate.format('YYYY-MM-DD'),
          type: type,
          sub_type: subType,
          limit: pageSize,
          offset: page * pageSize,
          ...config?.params
        }
      }

      const response = await axios.get('/api/report', finalConfig)

      const data = response.data
      setTotal(data.total)
      setRows(data.reports)
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

  const handleOnClickDownload = async (report) => {
    try {
      const finalConfig: CustomAxiosRequestConfig = {
        ...config,
        responseType: 'blob'
      }
      const response = await axios.get(`/api/report/${report.id}`, finalConfig)
      const data = response.data
      saveAs(data, `report-${report.date}.csv`)
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

  const handleOnClickSearch = () => {
    setPage(0)
    Router.push({
      pathname: '/report',
      query: {
        partner_id: partnerID,
        start_date: startDate.format('YYYY-MM-DD'),
        end_date: endDate.format('YYYY-MM-DD'),
        type: type,
        sub_type: subType
      }
    })
  }
  const handleOnChangePage = (page) => {
    setPage(page)
    Router.push({
      pathname: '/report',
      query: { ...router.query, page }
    })
  }
  const handleOnChangePageSize = (pageSize) => {
    setPageSize(pageSize)
    Router.push({
      pathname: '/report',
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
      handleFetchReport()
    }
  }, [router.query, user])
  return (
    <>
      <Head>
        <title>Report · Whalepay</title>
      </Head>
      <MainLayout isFetching={!user}>
        <Container fluid>
          <Row justify="between" style={{ margin: '0px -10px' }}>
            <Col sm={12}>
              <Title>Report</Title>
            </Col>
          </Row>
          <Row style={{ margin: '10px -10px 0px -10px' }}>
            {user && user.type === portalTypeMaster.DIGIO ? (
              <>
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
                <Col lg={4}>
                  <DatePickerRange
                    icon="fas fa-calendar"
                    startDate={startDate}
                    endDate={endDate}
                    onDatesChange={({ startDate, endDate }) => {
                      if (startDate) setStartDate(startDate)
                      if (endDate) setEndDate(endDate)
                    }}
                  />
                </Col>
              </>
            ) : (
              <Col lg={6}>
                <DatePickerRange
                  icon="fas fa-calendar"
                  startDate={startDate}
                  endDate={endDate}
                  onDatesChange={({ startDate, endDate }) => {
                    if (startDate) setStartDate(startDate)
                    if (endDate) setEndDate(endDate)
                  }}
                />
              </Col>
            )}
            <Col lg={2}>
              <Select
                icon="fas fa-bars"
                onChange={(e) => setType(e.target.value)}
              >
                <option value="">All Type</option>
                {Object.keys(reportTypeMaster).map((type, index) => {
                  return (
                    <option value={reportTypeMaster[type].value} key={index}>
                      {reportTypeMaster[type].label}
                    </option>
                  )
                })}
              </Select>
            </Col>
            <Col lg={2}>
              <Select
                icon="fas fa-bars"
                onChange={(e) => setSubType(e.target.value)}
              >
                <option value="">All Sub Type</option>
                {Object.keys(reportSubTypeMaster).map((type, index) => {
                  return (
                    <option value={reportSubTypeMaster[type].value} key={index}>
                      {reportSubTypeMaster[type].label}
                    </option>
                  )
                })}
              </Select>
            </Col>
            <Col lg={2}>
              <Button $primary onClick={handleOnClickSearch}>
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
                setPage={handleOnChangePage}
                page={page}
                columns={
                  user && user.type === portalTypeMaster.DIGIO
                    ? [
                        {
                          label: 'Partner',
                          key: 'partner_name',
                          width: '10%'
                        },
                        {
                          label: 'Date',
                          key: 'date',
                          width: '20%'
                        },
                        {
                          label: 'Name',
                          key: 'name',
                          width: '20%'
                        },
                        {
                          label: 'Type',
                          key: 'type',
                          width: '10%',
                          dataMutation: (row) =>
                            reportTypeMaster[row.type].label
                        },
                        {
                          label: 'SubType',
                          key: 'subType',
                          width: '10%',
                          dataMutation: (row) =>
                            reportSubTypeMaster[row.sub_type].label
                        },
                        {
                          label: 'Created At',
                          key: 'created_at',
                          width: '20%'
                        },
                        {
                          label: 'Download',
                          width: '10%',
                          align: 'center',
                          dataMutation: (row) => {
                            return (
                              <ThemeProvider theme={theme}>
                                <DownloadButton
                                  onClick={() => handleOnClickDownload(row)}
                                >
                                  <i className="fas fa-cloud-download-alt" />
                                </DownloadButton>
                              </ThemeProvider>
                            )
                          }
                        }
                      ]
                    : [
                        {
                          label: 'Date',
                          key: 'date',
                          width: '20%'
                        },
                        {
                          label: 'Type',
                          key: 'type',
                          width: '15%',
                          dataMutation: (row) =>
                            reportTypeMaster[row.type].label
                        },
                        {
                          label: 'SubType',
                          key: 'subType',
                          width: '15%',
                          dataMutation: (row) =>
                            reportSubTypeMaster[row.sub_type].label
                        },
                        {
                          label: 'Name',
                          key: 'name',
                          width: '20%'
                        },
                        {
                          label: 'Created At',
                          key: 'created_at',
                          width: '20%'
                        },
                        {
                          label: 'Download',
                          width: '10%',
                          align: 'center',
                          dataMutation: (row) => {
                            return (
                              <DownloadButton
                                onClick={() => handleOnClickDownload(row)}
                              >
                                <i className="fas fa-cloud-download-alt" />
                              </DownloadButton>
                            )
                          }
                        }
                      ]
                }
                rows={rows}
              />
            </Col>
          </Row>
        </Container>
      </MainLayout>
    </>
  )
}

export default withAuthenticated(ReportPage)
