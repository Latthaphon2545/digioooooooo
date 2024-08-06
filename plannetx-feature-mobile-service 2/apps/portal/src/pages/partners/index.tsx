import Head from 'next/head'
import Router, { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-grid-system'
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch } from '@reduxjs/toolkit'
import portalPermissionMaster from '../../constants/masters/portalPermissionMaster.json'
import Title from '../../components/commons/title'
import MainLayout from '../../components/layouts/mainLayout'
import axios, {
  CustomAxiosRequestConfig,
  DispatchAction
} from '../../helpers/axios'
import Swal from '../../helpers/sweetalert'
import withAuthenticated from '../../hocs/withAuthenticated'
import { useSelectorProps } from '../../props/useSelectorProps'
import { Body } from '../../utils/body'
import { BodyPartner } from './components/body'
import { SearchPartner } from './components/search'

const PartnersPage = () => {
  const router = useRouter()
  const user = useSelector((state: useSelectorProps) => state.user)
  const [permission, setPermission] = useState(null)
  const [isFetching, setIsFetching] = useState(true)
  const [query, setQuery] = useState(router.query.query || '')
  const [status, setStatus] = useState(router.query.status || '')
  const [page, setPage] = useState(Number(router.query.page) || 0)
  const [pageSize, setPageSize] = useState(Number(router.query.limit) || 10)
  const [total, setTotal] = useState(0)
  const [rows, setRows] = useState([])

  const dispatch = useDispatch<Dispatch<DispatchAction>>()

  const config: CustomAxiosRequestConfig = {
    dispatch
  }

  const handleFetchInpartner = async () => {
    try {
      setIsFetching(true)
      const finalConfig: CustomAxiosRequestConfig = {
        ...config,
        headers: {
          ...config?.headers
        },
        params: {
          q: query,
          status: status,
          limit: pageSize,
          offset: page * pageSize,
          ...config?.params
        }
      }
      const response = await axios.get('/api/inpartner', finalConfig)

      if (response.status === 200) {
        const data = response.data
        setTotal(data.total)
        setRows(data.inpartners)
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
      pathname: '/partners',
      query: {
        query,
        status
      }
    })
  }

  const handleOnClearSearch = () => {
    setQuery('')
    setStatus('')
    Router.push({
      pathname: '/partners',
      query: {}
    })
  }

  const handleOnChangePage = (page: number) => {
    setPage(page)
    Router.push({
      pathname: '/partners',
      query: { ...router.query, page }
    })
  }

  const handleOnChangePageSize = (pageSize: number) => {
    setPageSize(pageSize)
    Router.push({
      pathname: '/partners',
      query: { ...router.query, limit: pageSize }
    })
  }

  useEffect(() => {
    if (user) {
      setPermission(
        user.permissions.find(
          (permission) => permission.name === portalPermissionMaster.INPARTNER
        )
      )
      handleFetchInpartner()
    }
  }, [router.query, user])

  return (
    <>
      <Head>
        <title>Partners · Whalepay</title>
      </Head>
      <MainLayout isFetching={!user}>
        <Container fluid>
          <Row justify="between" style={{ margin: '0px -10px' }}>
            <Col sm={6}>
              <Title>Partners</Title>
            </Col>
          </Row>
          <Row style={{ margin: '10px -10px 0px -10px' }}>
            <SearchPartner
              query={query}
              setQuery={setQuery}
              status={status}
              setStatus={setStatus}
              handleOnClickSearch={handleOnClickSearch}
              handleOnClearSearch={handleOnClearSearch}
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
              columns={BodyPartner()}
              navigate={'/partners/[id]'}
              navigateWithId={'partners'}
            />
          </Row>
        </Container>
      </MainLayout>
    </>
  )
}

export default withAuthenticated(PartnersPage)
