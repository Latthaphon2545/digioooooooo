import currencyFormatter from 'currency-formatter'
import { saveAs } from 'file-saver'
import { Parser } from 'json2csv'
import moment from 'moment'
import Head from 'next/head'
import Router, { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-grid-system'
import { useDispatch, useSelector } from 'react-redux'
import Title from '../../components/commons/title'

import MainLayout from '../../components/layouts/mainLayout'

import transactionError from '../../constants/errors/transactionError.json'

import portalPermissionMaster from '../../constants/masters/portalPermissionMaster.json'
import portalTypeMaster from '../../constants/masters/portalTypeMaster.json'
import transactionStatusMaster from '../../constants/masters/transactionStatusMaster.json'
import transactionSubTypeMaster from '../../constants/masters/transactionSubTypeMaster.json'
import transactionTypeMaster from '../../constants/masters/transactionTypeMaster.json'

import axios, {
  CustomAxiosRequestConfig,
  DispatchAction
} from '../../helpers/axios'
import Swal from '../../helpers/sweetalert'

import withAuthenticated from '../../hocs/withAuthenticated'
import { useSelectorProps } from '../../props/useSelectorProps'
import TableRow from './components/tableRow'
import FilterRow from './components/filterRow'
import { Dispatch } from '@reduxjs/toolkit'

const TransactionPage = () => {
  const router = useRouter()
  const user = useSelector((state: useSelectorProps) => state.user)
  const [inpartners, setInpartners] = useState([])
  const [permission, setPermission] = useState(null)
  const [isFetching, setIsFetching] = useState(true)
  const [partnerID, setPartnerID] = useState(
    Number(router.query.partner_id) || ''
  )
  const [query, setQuery] = useState<string | string[]>(router.query.q || '')
  const [type, setType] = useState<string | string[]>(router.query.type || '')
  const [subType, setSubType] = useState<string | string[]>(
    router.query.sub_type || ''
  )
  const [status, setStatus] = useState<string | string[]>(
    router.query.status || ''
  )
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

  const dispatch = useDispatch<Dispatch<DispatchAction>>()
  const config: CustomAxiosRequestConfig = {
    dispatch
  }

  const handleFetchInpartners = async () => {
    try {
      const response = await axios.get('/api/inpartner', config)
      setInpartners(response.data.inpartners)
    } catch (err) {
      console.error(err)
    }
  }

  const handleFetchTransaction = async () => {
    setIsFetching(true)
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
          start_date: moment(startDate).format('YYYY-MM-DD'),
          end_date: moment(endDate).format('YYYY-MM-DD'),
          limit: pageSize,
          offset: page * pageSize,
          ...config?.params
        }
      }

      const response = await axios.get('/api/transaction', finalConfig)
      setIsFetching(false)
      setTotal(response.data.total)
      setRows(response.data.transactions)
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

  const handleOnClickExport = async () => {
    try {
      const finalConfig: CustomAxiosRequestConfig = {
        ...config,
        headers: {
          ...config?.headers,
          'x-partner-id': partnerID
        },
        params: {
          is_export: true,
          q: query,
          type: type,
          sub_type: subType,
          status: status,
          start_date: moment(startDate).format('YYYY-MM-DD'),
          end_date: moment(endDate).format('YYYY-MM-DD'),
          ...config?.params
        }
      }
      const response = await axios.get('/api/transaction', finalConfig)
      const fields = [
        { label: 'TransactionDate', value: 'created_at' },
        { label: 'TransactionReference', value: 'reference_no' },
        { label: 'OrderID', value: 'order_id' },
        {
          label: 'TransactionStatus',
          value: (row) => transactionStatusMaster[row.status].label
        },
        {
          label: 'Type',
          value: (row) => transactionTypeMaster[row.type].label
        },
        {
          label: 'SubType',
          value: (row) => transactionSubTypeMaster[row.sub_type].label
        },
        { label: 'From Wallet ID', value: 'payer_wallet_id' },
        { label: 'From Account Name', value: 'payer_name' },
        { label: 'To Wallet ID', value: 'payee_wallet_id' },
        { label: 'To Account Name', value: 'payee_name' },
        { label: 'Fee Wallet ID', value: 'fee_exude_wallet_id' },
        { label: 'Fee Account Name', value: 'fee_exude_name' },
        { label: 'Discount Wallet ID', value: 'discount_absorb_wallet_id' },
        { label: 'Discount Account Name', value: 'discount_absorb_name' },
        { label: 'Net', value: 'net' },
        { label: 'Fee', value: 'fee' },
        { label: 'Discount', value: 'discount' },
        { label: 'Total', value: 'total' },
        { label: 'Discount Code', value: 'discount_code' },
        { label: 'Approval Code', value: 'approval_code' },
        { label: 'Reference1', value: 'reference1' },
        { label: 'Reference2', value: 'reference2' },
        { label: 'Reference3', value: 'reference3' },
        { label: 'ThirdPartyRef', value: 'external_reference' }
      ]

      const opts = { fields }
      const parser = new Parser(opts)
      const csv = parser.parse(response.data.transactions)
      saveAs(new Blob([csv]), 'transaction.csv')
    } catch (err) {
      if (
        err.response &&
        err.response.data.res_code ===
          transactionError.ERR_TRANASACTION_EXPORT_LIMIT
      ) {
        Swal.fire({
          icon: 'info',
          title: 'Export Transaction',
          html: `Exceed maximum total of transactions<br />Your report will be sent to email (${user.email})`
        })
      } else {
        const message = err.response ? err.response.data.res_desc : err.message
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: message
        })
        console.error(err)
      }
    }
  }

  const handleOnClickSearch = () => {
    setPage(0)
    Router.push({
      pathname: '/transactions',
      query: {
        partner_id: partnerID,
        query,
        type,
        sub_type: subType,
        start_date: startDate.format('YYYY-MM-DD'),
        end_date: endDate.format('YYYY-MM-DD'),
        status
      }
    })
  }
  const handleOnChangePage = (page) => {
    setPage(page)
    Router.push({
      pathname: '/transactions',
      query: { ...router.query, page }
    })
  }
  const handleOnChangePageSize = (pageSize) => {
    setPageSize(pageSize)
    Router.push({
      pathname: '/transactions',
      query: { ...router.query, limit: pageSize }
    })
  }
  const handleOnClickRow = (row) => {
    Router.push(`/transactions/${row.id}`)
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
          (permission) => permission.name === portalPermissionMaster.TRANSACTION
        )
      )
      handleFetchTransaction()
    }
  }, [router.query, user])
  return (
    <>
      <Head>
        <title>Transactions · Whalepay</title>
      </Head>
      <MainLayout isFetching={!user}>
        <Container fluid>
          <Row justify="between" style={{ margin: '0px -10px' }}>
            <Col sm={12}>
              <Title>Transactions</Title>
            </Col>
          </Row>
          <FilterRow
            user={user}
            partnerID={String(partnerID)}
            setPartnerID={setPartnerID}
            inpartners={inpartners}
            query={query}
            setQuery={setQuery}
            type={type}
            setType={setType}
            subType={subType}
            setSubType={setSubType}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            status={status}
            setStatus={setStatus}
            handleOnClickExport={handleOnClickExport}
            permission={permission}
            handleOnClickSearch={handleOnClickSearch}
          />

          <TableRow
            user={user}
            isFetching={isFetching}
            total={total}
            pageSize={pageSize}
            setPageSize={handleOnChangePageSize}
            page={page}
            setPage={handleOnChangePage}
            rows={rows}
            onClickRow={
              permission && permission.detail
                ? (row) => handleOnClickRow(row)
                : undefined
            }
          />
        </Container>
      </MainLayout>
    </>
  )
}

export default withAuthenticated(TransactionPage)
