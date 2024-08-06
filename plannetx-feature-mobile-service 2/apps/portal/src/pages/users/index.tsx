import Head from 'next/head'
import Router, { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-grid-system'
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch } from '@reduxjs/toolkit'
import { Body } from '../../utils/body'
import Title from '../../components/commons/title'
import MainLayout from '../../components/layouts/mainLayout'
import portalPermissionMaster from '../../constants/masters/portalPermissionMaster.json'
import portalTypeMaster from '../../constants/masters/portalTypeMaster.json'
import axios, {
  CustomAxiosRequestConfig,
  DispatchAction
} from '../../helpers/axios'
import Swal from '../../helpers/sweetalert'
import withAuthenticated from '../../hocs/withAuthenticated'
import { useSelectorProps } from '../../props/useSelectorProps'
import { SearchUsers } from './components/search'
import { BodyUsers } from './components/body'

const UserPage = () => {
  const router = useRouter()
  const routerQuery = router.query
  const user = useSelector((state: useSelectorProps) => state.user)
  const [inpartners, setInpartners] = useState([])
  const [permission, setPermission] = useState(null)
  const [isFetching, setIsFetching] = useState(true)
  const [partnerID, setPartnerID] = useState(
    Number(routerQuery.partner_id) || ''
  )
  const [query, setQuery] = useState(routerQuery.query || '')
  const [type, setType] = useState(routerQuery.type || '')
  const [subType, setSubType] = useState(routerQuery.sub_type || '')
  const [status, setStatus] = useState(routerQuery.status || '')
  const [page, setPage] = useState(Number(routerQuery.page) || 0)
  const [pageSize, setPageSize] = useState(Number(routerQuery.limit) || 10)
  const [total, setTotal] = useState(0)
  const [rows, setRows] = useState([])

  const dispatch = useDispatch<Dispatch<DispatchAction>>()
  const config: CustomAxiosRequestConfig = {
    dispatch
  }

  const handleFetchInpartners = async () => {
    try {
      const res = await axios.get('/api/inpartner', config)
      setInpartners(res.data.inpartners)
    } catch (err) {
      console.error(err)
    }
  }

  const handleFetchUser = async () => {
    try {
      const finalConfig: CustomAxiosRequestConfig = {
        ...config,
        headers: {
          ...config?.headers,
          'x-partner-id': partnerID
        },
        params: {
          q: query,
          type: type,
          sub_type: subType,
          status: status,
          limit: pageSize,
          offset: page * pageSize,
          ...config?.params
        }
      }
      const res = await axios.get('/api/inuser', finalConfig)
      setTotal(res.data.total)
      setRows(res.data.inusers)
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
      pathname: '/users',
      query: {
        partner_id: partnerID,
        query,
        type,
        sub_type: subType,
        status
      }
    })
  }

  const handleOnClearSearch = () => {
    setQuery('')
    setType('')
    setSubType('')
    setStatus('')
    Router.push({
      pathname: '/users',
      query: {}
    })
  }

  const handleOnChangePage = (page: number) => {
    setPage(page)
    Router.push({
      pathname: '/users',
      query: { ...routerQuery, page }
    })
  }
  const handleOnChangePageSize = (pageSize: number) => {
    setPageSize(pageSize)
    Router.push({
      pathname: '/users',
      query: { ...routerQuery, limit: pageSize }
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
          (permission) => permission.name === portalPermissionMaster.INUSER
        )
      )
      handleFetchUser()
    }
  }, [routerQuery, user])

  return (
    <>
      <Head>
        <title>Users · Whalepay</title>
      </Head>
      <MainLayout isFetching={!user}>
        <Container fluid>
          <Row justify="between" style={{ margin: '0px -10px' }}>
            <Col sm={12}>
              <Title>Users</Title>
            </Col>
          </Row>
          <Row style={{ margin: '10px -10px 0px -10px' }}>
            <SearchUsers
              partnerID={partnerID}
              setPartnerID={setPartnerID}
              query={query}
              setQuery={setQuery}
              setType={setType}
              subType={subType}
              setSubType={setSubType}
              status={status}
              setStatus={setStatus}
              handleOnClickSearch={handleOnClickSearch}
              handleOnClearSearch={handleOnClearSearch}
              inpartners={inpartners}
              user={user}
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
              permission={permission}
              columns={BodyUsers(user)}
              navigate={'/users/[id]'}
              navigateWithId={`users`}
            />
          </Row>
        </Container>
      </MainLayout>
    </>
  )
}

export default withAuthenticated(UserPage)
