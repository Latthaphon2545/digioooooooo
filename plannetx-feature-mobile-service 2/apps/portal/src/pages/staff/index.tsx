import Head from 'next/head'
import Router, { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-grid-system'
import { useDispatch, useSelector } from 'react-redux'
import { Body } from '../../utils/body'
import { Dispatch } from '@reduxjs/toolkit'
import portalPermissionMaster from '../../constants/masters/portalPermissionMaster.json'
import portalTypeMaster from '../../constants/masters/portalTypeMaster.json'
import Button from '../../components/commons/button'
import Title from '../../components/commons/title'
import MainLayout from '../../components/layouts/mainLayout'
import axios, {
  CustomAxiosRequestConfig,
  DispatchAction
} from '../../helpers/axios'
import Swal from '../../helpers/sweetalert'
import withAuthenticated from '../../hocs/withAuthenticated'
import { useSelectorProps } from '../../props/useSelectorProps'
import { SearchStaff } from './components/search'
import { BodyStaff } from './components/body'

const StaffPage = () => {
  const router = useRouter()

  const user = useSelector((state: useSelectorProps) => state.user)
  const [inpartners, setInpartners] = useState([])
  const [permission, setPermission] = useState(null)
  const [isFetching, setIsFetching] = useState(true)
  const [partnerID, setPartnerID] = useState(
    Number(router.query.partner_id) || ''
  )
  const [query, setQuery] = useState(router.query.query || '')
  const [subType, setSubType] = useState(router.query.role || '')
  const [status, setStatus] = useState(router.query.status || '')
  const [page, setPage] = useState(Number(router.query.page) || 0)
  const [pageSize, setPageSize] = useState(Number(router.query.limit) || 10)
  const [total, setTotal] = useState(0)
  const [rows, setRows] = useState([])

  const dispatch = useDispatch<Dispatch<DispatchAction>>()
  const config: CustomAxiosRequestConfig = {
    dispatch
  }

  const handleFetchInpartners = async () => {
    try {
      const res = await axios.get('/api/inpartner', config)
      if (res.status === 200) {
        setInpartners(res.data.inpartners)
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleFetchStaff = async () => {
    try {
      setIsFetching(true)
      const finalConfig: CustomAxiosRequestConfig = {
        ...config,
        headers: {
          ...config?.headers,
          'x-partner-id': partnerID
        },
        params: {
          q: query,
          sub_type: subType,
          status: status,
          limit: pageSize,
          offset: page * pageSize,
          ...config?.params
        }
      }
      const res = await axios.get('/api/inportal', finalConfig)
      if (res.status === 200) {
        setTotal(res.data.total)
        setRows(res.data.inportals)
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

  const handleOnClickCreate = () => {
    Router.push('/staff/create')
  }

  const handleOnClickSearch = () => {
    setPage(0)
    Router.push({
      pathname: '/staff',
      query: {
        partner_id: partnerID,
        query,
        role: subType,
        status
      }
    })
  }

  const handleOnClearSearch = () => {
    setQuery('')
    setSubType('')
    setStatus('')
    Router.push({
      pathname: '/staff',
      query: {}
    })
  }

  const handleOnChangePage = (page: number) => {
    setPage(page)
    Router.push({
      pathname: '/staff',
      query: { ...router.query, page }
    })
  }

  const handleOnChangePageSize = (pageSize: number) => {
    setPageSize(pageSize)
    Router.push({
      pathname: '/staff',
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
          (permission) => permission.name === portalPermissionMaster.INPORTAL
        )
      )
      handleFetchStaff()
    }
  }, [router.query, user])

  return (
    <>
      <Head>
        <title>Staff · Whalepay</title>
      </Head>
      <MainLayout isFetching={!user}>
        <Container fluid>
          <Row justify="between" style={{ margin: '0px -10px' }}>
            <Col sm={6}>
              <Title>Staff</Title>
            </Col>
            <Col sm={2}>
              <Button
                $secondary
                onClick={handleOnClickCreate}
                hidden={permission && !permission.create}
              >
                <i className="fas fa-plus" />
                Create
              </Button>
            </Col>
          </Row>
          <Row style={{ margin: '10px -10px 0px -10px' }}>
            <SearchStaff
              user={user}
              inpartners={inpartners}
              partnerID={partnerID}
              query={query}
              setQuery={setQuery}
              subType={subType}
              setSubType={setSubType}
              status={status}
              setStatus={setStatus}
              handleOnClickSearch={handleOnClickSearch}
              handleOnClearSearch={handleOnClearSearch}
              setPartnerID={setPartnerID}
            />
          </Row>
          <Row style={{ margin: '20px -10px 0px -10px' }}>
            <Body
              isFetching={isFetching}
              rows={rows}
              total={total}
              page={page}
              pageSize={pageSize}
              handleOnChangePage={handleOnChangePage}
              handleOnChangePageSize={handleOnChangePageSize}
              permission={permission}
              columns={BodyStaff(user)}
              navigate={'/staff/[id]'}
              navigateWithId={'staff'}
            />
          </Row>
        </Container>
      </MainLayout>
    </>
  )
}

export default withAuthenticated(StaffPage)
