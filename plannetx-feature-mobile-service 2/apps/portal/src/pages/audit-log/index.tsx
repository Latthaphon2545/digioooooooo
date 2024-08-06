import moment from 'moment'
import Head from 'next/head'
import Router, { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-grid-system'
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch } from '@reduxjs/toolkit'
import Title from '../../components/commons/title'
import MainLayout from '../../components/layouts/mainLayout'
import portalTypeMaster from '../../constants/masters/portalTypeMaster.json'
import axios, {
  CustomAxiosRequestConfig,
  DispatchAction
} from '../../helpers/axios'
import Swal from '../../helpers/sweetalert'
import withAuthenticated from '../../hocs/withAuthenticated'
import { useSelectorProps } from '../../props/useSelectorProps'
import { Body } from '../../utils/body'
import { SearchAuditLog } from './components/search'
import { BodyAuditLog } from './components/body'

const AuditLogPage = () => {
  const router = useRouter()

  const dispatch = useDispatch<Dispatch<DispatchAction>>()
  const config: CustomAxiosRequestConfig = {
    dispatch
  }

  const user = useSelector((state: useSelectorProps) => state.user)
  const [inpartners, setInpartners] = useState([])
  const [isFetching, setIsFetching] = useState(true)
  const [partnerID, setPartnerID] = useState(
    Number(router.query.partner_id) || ''
  )
  const [query, setQuery] = useState(router.query.q || '')
  const [menu, setMenu] = useState(router.query.menu || '')
  const [startDate, setStartDate] = useState(
    router.query.start_date
      ? moment(router.query.start_date)
      : moment().startOf('month')
  )
  const [endDate, setEndDate] = useState(
    router.query.end_date ? moment(router.query.end_date) : moment()
  )
  const [page, setPage] = useState(Number(router.query.page) || 0)
  const [pageSize, setPageSize] = useState(Number(router.query.limit) || 10)
  const [total, setTotal] = useState(0)
  const [rows, setRows] = useState([])

  const handleFetchInpartners = async () => {
    try {
      const response = await axios.get('/api/inpartner', config)
      if (response.status === 200) {
        setInpartners(response.data.inpartners)
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleFetchAuditLog = async () => {
    try {
      setIsFetching(true)
      const finalConfig: CustomAxiosRequestConfig = {
        ...config,
        headers: {
          ...config?.headers
        },
        params: {
          menu: menu,
          q: query,
          start_date: moment(startDate).format('YYYY-MM-DD'),
          end_date: moment(endDate).format('YYYY-MM-DD'),
          limit: pageSize,
          offset: page * pageSize,
          ...config?.params
        }
      }
      const response = await axios.get('/api/audit-log', finalConfig)
      if (response.status === 200) {
        setTotal(response.data.total)
        setRows(response.data.audit_logs)
      }
    } catch (err) {
      const message = err.response ? err.response.data.res_desc : err.message
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: message
      })
      console.error(err)
    } finally {
      setIsFetching(false)
    }
  }

  const handleOnClickSearch = () => {
    setPage(0)
    Router.push({
      pathname: '/audit-log',
      query: {
        partner_id: partnerID,
        q: query,
        start_date: startDate.format('YYYY-MM-DD'),
        end_date: endDate.format('YYYY-MM-DD'),
        menu
      }
    })
  }

  const handleOnClearSearch = () => {
    setPartnerID('')
    setMenu('')
    setQuery('')
    setStartDate(moment().startOf('month'))
    setEndDate(moment())
    setMenu('')
    Router.push({
      pathname: '/audit-log'
    })
  }

  const handleOnChangePage = (page: number) => {
    setPage(page)
    Router.push({
      pathname: '/audit-log',
      query: { ...router.query, page }
    })
  }

  const handleOnChangePageSize = (pageSize: number) => {
    setPageSize(pageSize)
    Router.push({
      pathname: '/audit-log',
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
      handleFetchAuditLog()
    }
  }, [router.query, user])

  return (
    <>
      <Head>
        <title>Audit Log · Whalepay</title>
      </Head>
      <MainLayout isFetching={!user}>
        <Container fluid>
          <Row justify="between" style={{ margin: '0px -10px' }}>
            <Col xs={12}>
              <Title>Audit Log</Title>
            </Col>
          </Row>
          <Row style={{ margin: '10px -10px 0px -10px' }}>
            <SearchAuditLog
              user={user}
              setPartnerID={setPartnerID}
              setMenu={setMenu}
              setQuery={setQuery}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
              handleOnClickSearch={handleOnClickSearch}
              handleOnClearSearch={handleOnClearSearch}
              partnerID={partnerID}
              inpartners={inpartners}
              menu={menu}
              query={query}
              startDate={startDate}
              endDate={endDate}
            />
          </Row>
          <Row style={{ margin: '20px -10px 0px -10px' }}>
            <Body
              isFetching={isFetching}
              total={total}
              pageSize={pageSize}
              page={page}
              rows={rows}
              handleOnChangePageSize={handleOnChangePageSize}
              handleOnChangePage={handleOnChangePage}
              permission={undefined}
              columns={BodyAuditLog(user)}
              navigate={''}
              navigateWithId={''}
            />
          </Row>
        </Container>
      </MainLayout>
    </>
  )
}

export default withAuthenticated(AuditLogPage)
