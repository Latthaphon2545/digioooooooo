import Head from 'next/head'
import Router, { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-grid-system'
import { useDispatch, useSelector } from 'react-redux'
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

import { Body } from '../../utils/body'
import { SearchMerchants } from './components/search'
import { BodyMerchants } from './components/body'

const MerchantPage = () => {
  const router = useRouter()

  const dispatch = useDispatch<Dispatch<DispatchAction>>()
  const config: CustomAxiosRequestConfig = {
    dispatch
  }

  const user = useSelector((state: useSelectorProps) => state.user)
  const [inpartners, setInpartners] = useState([])
  const [inbranches, setInbranches] = useState([])
  const [permission, setPermission] = useState(null)
  const [isFetching, setIsFetching] = useState(true)
  const [partnerID, setPartnerID] = useState(
    Number(router.query.partner_id) || ''
  )
  const [query, setQuery] = useState(router.query.query || '')
  const [branch, setBranch] = useState(router.query.branch || '')
  const [status, setStatus] = useState(router.query.status || '')
  const [page, setPage] = useState(Number(router.query.page) || 0)
  const [pageSize, setPageSize] = useState(Number(router.query.limit) || 10)
  const [total, setTotal] = useState(0)
  const [rows, setRows] = useState([])

  const handleFetchInpartners = async () => {
    try {
      const finalConfig: CustomAxiosRequestConfig = {
        ...config,
        headers: {
          ...config?.headers
        }
      }
      const response = await axios.get('/api/inpartner', finalConfig)
      if (response.status === 200) {
        setInpartners(response.data.inpartners)
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleFetchInbranches = async () => {
    try {
      const response = await axios.get('/api/inbranch', config)
      if (response.status === 200) {
        setInbranches(response.data.inbranches)
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleFetchInmerchants = async () => {
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
          branch: branch,
          status: status,
          limit: pageSize,
          offset: page * pageSize,
          ...config?.params
        }
      }
      const response = await axios.get('/api/inmerchant', finalConfig)
      if (response.status === 200) {
        setTotal(response.data.total)
        setRows(response.data.inmerchant)
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
    Router.push('/merchants/create')
  }

  const handleOnClickSearch = () => {
    setPage(0)
    Router.push({
      pathname: '/merchants',
      query: {
        partner_id: partnerID,
        query,
        branch,
        status
      }
    })
  }

  const handleOnClearSearch = () => {
    setPartnerID('')
    setQuery('')
    setBranch('')
    setStatus('')
    Router.push('/merchants')
  }

  const handleOnChangePage = (page: number) => {
    setPage(page)
    Router.push({
      pathname: '/merchants',
      query: { ...router.query, page }
    })
  }

  const handleOnChangePageSize = (pageSize: number) => {
    setPageSize(pageSize)
    Router.push({
      pathname: '/merchants',
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
      handleFetchInbranches()
      handleFetchInmerchants()
    }
  }, [router.query, user])

  return (
    <>
      <Head>
        <title>Merchants · Whalepay</title>
      </Head>
      <MainLayout isFetching={!user}>
        <Container fluid>
          <Row justify="between" style={{ margin: '0px -10px' }}>
            <Col sm={6}>
              <Title>Merchants</Title>
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
            <SearchMerchants
              user={user}
              inpartners={inpartners}
              inbranches={inbranches}
              handleOnClickSearch={handleOnClickSearch}
              handleOnClearSearch={handleOnClearSearch}
              partnerID={partnerID}
              setPartnerID={setPartnerID}
              query={query}
              setQuery={setQuery}
              branch={branch}
              setBranch={setBranch}
              status={status}
              setStatus={setStatus}
            />
          </Row>

          <Row style={{ margin: '20px -10px 0px -10px' }}>
            <Body
              isFetching={isFetching}
              total={total}
              pageSize={pageSize}
              page={page}
              rows={rows}
              handleOnChangePage={handleOnChangePage}
              handleOnChangePageSize={handleOnChangePageSize}
              permission={permission}
              columns={BodyMerchants(user)}
              navigate={'/merchants/[id]'}
              navigateWithId={'merchants'}
            />
          </Row>
        </Container>
      </MainLayout>
    </>
  )
}

export default withAuthenticated(MerchantPage)
