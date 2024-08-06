import Head from 'next/head'
import Router, { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-grid-system'
import { useDispatch, useSelector } from 'react-redux'

import agentStatusMaster from '../../constants/masters/agentStatusMaster.json'
import portalPermissionMaster from '../../constants/masters/portalPermissionMaster.json'
import portalTypeMaster from '../../constants/masters/portalTypeMaster.json'

import Badge from '../../components/commons/badge'
import Button from '../../components/commons/button'
import Input from '../../components/commons/input'
import Select from '../../components/commons/select'
import Table from '../../components/commons/table'
import Title from '../../components/commons/title'

import MainLayout from '../../components/layouts/mainLayout'

import axios, {
  CustomAxiosRequestConfig,
  DispatchAction
} from '../../helpers/axios'
import Swal from '../../helpers/sweetalert'

import withAuthenticated from '../../hocs/withAuthenticated'
import { useSelectorProps } from '../../props/useSelectorProps'
import { Dispatch } from '@reduxjs/toolkit'
import FilteredRow from './components/filteredRow'

const AgentPage = () => {
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
  const [branchId, setBranchId] = useState(router.query.branch_id || '')
  const [status, setStatus] = useState(router.query.status || '')
  const [page, setPage] = useState(Number(router.query.page) || 0)
  const [pageSize, setPageSize] = useState(Number(router.query.limit) || 10)
  const [total, setTotal] = useState(0)
  const [rows, setRows] = useState([])

  const digioMasterArray = [
    {
      label: 'Partner',
      key: 'partner_name',
      width: '10%'
    },
    {
      label: 'Username',
      key: 'username',
      width: '20%'
    },
    {
      label: 'Firstname',
      key: 'firstname_en',
      subKey: 'firstname_th',
      width: '15%'
    },
    {
      label: 'Lastname',
      key: 'lastname_en',
      subKey: 'lastname_th',
      width: '15%'
    },
    {
      label: 'Branch',
      key: 'branch_name_en',
      subKey: 'branch_name_th',
      width: '20%'
    },
    {
      label: 'Status',
      key: 'status',
      width: '10%',
      align: 'center',
      dataMutation: (row) => (
        <Badge
          color={agentStatusMaster[row.status].color}
          backgroundcolor={agentStatusMaster[row.status].backgroundColor}
        >
          {agentStatusMaster[row.status].label}
        </Badge>
      )
    }
  ]

  const notDigioMasterArray = [
    {
      label: 'Username',
      key: 'username',
      width: '20%'
    },
    {
      label: 'Firstname',
      key: 'firstname_en',
      subKey: 'firstname_th',
      width: '17.5%'
    },
    {
      label: 'Lastname',
      key: 'lastname_en',
      subKey: 'lastname_th',
      width: '17.5%'
    },
    {
      label: 'Branch',
      key: 'branch_name_en',
      subKey: 'branch_name_th',
      width: '15%'
    },
    {
      label: 'Updated At',
      key: 'updated_at',
      width: '20%'
    },
    {
      label: 'Status',
      key: 'status',
      width: '10%',
      align: 'center',
      dataMutation: (row) => (
        <Badge
          color={agentStatusMaster[row.status].color}
          backgroundcolor={agentStatusMaster[row.status].backgroundColor}
        >
          {agentStatusMaster[row.status].label}
        </Badge>
      )
    }
  ]

  const handleFetchInpartners = async () => {
    try {
      const finalConfig: CustomAxiosRequestConfig = {
        ...config,
        headers: {
          ...config?.headers,
          'x-partner-id': partnerID
        }
      }
      const response = await axios.get('/api/inpartner', finalConfig)
      setInpartners(response.data.inpartners)
    } catch (err) {
      console.error(err)
    }
  }

  const handleFetchInbranches = async () => {
    try {
      const response = await axios.get('/api/inbranch', config)
      setInbranches(response.data.inbranches)
    } catch (err) {
      console.error(err)
    }
  }

  const handleFetchInagents = async () => {
    setIsFetching(true)
    try {
      const finalConfig = {
        ...config,
        headers: {
          ...config?.headers,
          'x-partner-id': partnerID
        },
        params: {
          q: query,
          branch_id: branchId,
          status: status,
          limit: pageSize,
          offset: page * pageSize,
          ...config?.params
        }
      }
      const response = await axios.get('/api/inagent', finalConfig)
      setIsFetching(false)
      setTotal(response.data.total)
      setRows(response.data.inagents)
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
  const handleOnClickCreate = () => {
    Router.push('/agents/create')
  }
  const handleOnClickSearch = () => {
    setPage(0)
    Router.push({
      pathname: '/agents',
      query: {
        partner_id: partnerID,
        query,
        branch_id: branchId,
        status
      }
    })
  }
  const handleOnChangePage = (page) => {
    setPage(page)
    Router.push({
      pathname: '/agents',
      query: { ...router.query, page }
    })
  }
  const handleOnChangePageSize = (pageSize) => {
    setPageSize(pageSize)
    Router.push({
      pathname: '/agents',
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
      handleFetchInagents()
    }
  }, [router.query, user])
  return (
    <>
      <Head>
        <title>Agents · Whalepay</title>
      </Head>
      <MainLayout isFetching={!user}>
        <Container fluid>
          <FilteredRow
            user={user}
            inpartners={inpartners}
            inbranches={inbranches}
            partnerID={partnerID}
            setPartnerID={setPartnerID}
            query={query}
            setQuery={setQuery}
            branchId={branchId}
            setBranchId={setBranchId}
            status={status}
            setStatus={setStatus}
            handleOnClickSearch={handleOnClickSearch}
            handleOnClickCreate={handleOnClickCreate}
            permission={permission}
          />
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
                    ? digioMasterArray
                    : notDigioMasterArray
                }
                rows={rows}
                onClickRow={
                  permission && permission.detail
                    ? (row) => Router.push('/agents/[id]', `/agents/${row.id}`)
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

export default withAuthenticated(AgentPage)
