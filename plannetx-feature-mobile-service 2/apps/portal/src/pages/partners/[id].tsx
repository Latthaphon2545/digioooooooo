import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-grid-system'
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch } from '@reduxjs/toolkit'
import Title from '../../components/commons/title'
import MainLayout from '../../components/layouts/mainLayout'
import axios, {
  CustomAxiosRequestConfig,
  DispatchAction
} from '../../helpers/axios'
import Swal from '../../helpers/sweetalert'
import withAuthenticated from '../../hocs/withAuthenticated'
import { useSelectorProps } from '../../props/useSelectorProps'
import {
  defaultPartnerInfo,
  partnerInfoProps
} from '../../props/partnerInfoProps'
import { DetailPartner } from './components/detailPartner'
import { TransactionConfig } from './components/transactionConfig'
import { TransactionFee } from './components/transactionFee'
import { TransactionLimit } from './components/transactionLimit'
import { WalletLimit } from './components/walletLimit'

const PartnersPage = () => {
  const router = useRouter()
  const id = router.query.id

  const dispatch = useDispatch<Dispatch<DispatchAction>>()
  const config: CustomAxiosRequestConfig = {
    dispatch
  }

  const user = useSelector((state: useSelectorProps) => state.user)

  const [isFetching, setIsFetching] = useState(true)
  const [partnerInfo, setPartnerInfo] =
    useState<partnerInfoProps>(defaultPartnerInfo)

  const handleFetchInpartner = async () => {
    try {
      setIsFetching(true)
      const response = await axios.get(`/api/inpartner/${id}`, config)
      if (response.status === 200) {
        const data = response.data
        const fetchedPartnerInfo: partnerInfoProps = {
          id: data.id,
          logo: data.logo,
          name: data.name,
          currency: data.currency,
          timezone: data.timezone,
          date_format: data.date_format,
          status: data.status,
          transaction_configs: data.transaction_configs,
          transaction_fees: data.transaction_fees,
          transaction_limites: data.transaction_limites,
          wallet_limites: data.wallet_limites,
          created_at: data.created_at,
          updated_at: data.updated_at,
          res_code: data.res_code,
          res_desc: data.res_desc,
          theme: data.theme
        }
        setPartnerInfo(fetchedPartnerInfo)
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

  useEffect(() => {
    if (user) {
      handleFetchInpartner()
    }
  }, [router.query, user])

  return (
    <>
      <Head>
        <title>Partner · Whalepay</title>
      </Head>
      <MainLayout isFetching={!user}>
        <Container fluid>
          <Row justify="between" style={{ margin: '0px -10px' }}>
            <Col sm={6}>
              <Title>Partner</Title>
            </Col>
          </Row>
          <Row style={{ margin: '10px -10px' }}>
            <Col xs={12}>
              <DetailPartner
                partnerInfo={partnerInfo}
                isFetching={isFetching}
              />
            </Col>
          </Row>
          <Row style={{ margin: '10px -10px' }}>
            <Col xs={12}>
              <TransactionConfig partnerInfo={partnerInfo} />
            </Col>
          </Row>
          <Row style={{ margin: '10px -10px 0px -10px' }}>
            <Col xs={12}>
              <TransactionFee partnerInfo={partnerInfo} />
            </Col>
          </Row>
          <Row style={{ margin: '10px -10px' }}>
            <Col xs={12}>
              <TransactionLimit partnerInfo={partnerInfo} />
            </Col>
          </Row>
          <Row style={{ margin: '10px -10px' }}>
            <Col xs={12}>
              <WalletLimit partnerInfo={partnerInfo} />
            </Col>
          </Row>
        </Container>
      </MainLayout>
    </>
  )
}

export default withAuthenticated(PartnersPage)
