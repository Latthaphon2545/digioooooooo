import Head from 'next/head'
import { useRouter } from 'next/router'
import { FormEvent, useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-grid-system'
import { useDispatch, useSelector } from 'react-redux'

import Section from '../../components/commons/section'

import Title from '../../components/commons/title'

import MainLayout from '../../components/layouts/mainLayout'

import agentStatusMaster from '../../constants/masters/agentStatusMaster.json'
import portalPermissionMaster from '../../constants/masters/portalPermissionMaster.json'

import axios, {
  CustomAxiosRequestConfig,
  DispatchAction
} from '../../helpers/axios'
import Swal from '../../helpers/sweetalert'

import withAuthenticated from '../../hocs/withAuthenticated'
import { useSelectorProps } from '../../props/useSelectorProps'

import DetailSection from './components/detailSection'
import WalletSection from './components/walletSection'
import { Dispatch } from '@reduxjs/toolkit'
import { AgentInfoProps, DefaultAgentInfo } from '../../props/agentInfoProps'
import { Wallet } from '../../props/userInfoProps'
import EditDetail from './components/editDetail'

const AgentPage = () => {
  const router = useRouter()
  const dispatch = useDispatch<Dispatch<DispatchAction>>()
  const config: CustomAxiosRequestConfig = {
    dispatch
  }

  const user = useSelector((state: useSelectorProps) => state.user)
  const [permission, setPermission] = useState(null)
  const [isFetching, setIsFetching] = useState(true)
  const [isFormSubmitting, setIsFormSubmitting] = useState(false)
  const [page, setPage] = useState(0)
  const [agentInfo, setAgentInfo] = useState<AgentInfoProps>(DefaultAgentInfo)

  const handleFetchInagent = async () => {
    const id = router.query.id
    try {
      const response = await axios.get(`/api/inagent/${id}`, config)
      const data = response.data
      const fetchedAgent = {
        branchId: data.inagent.branch_id,
        branchNameEN: data.inagent.branch_name_en,
        username: data.inagent.username,
        firstnameEN: data.inagent.firstname_en,
        lastnameEN: data.inagent.lastname_en,
        firstnameTH: data.inagent.firstname_th,
        lastnameTH: data.inagent.lastname_th,
        citizenId: data.inagent.citizen_id,
        passport: data.inagent.passport,
        phoneNo: data.inagent.phone_no,
        email: data.inagent.email,
        wallets: data.inagent.wallets.map((wallet: Wallet) => ({
          id: wallet.id,
          type: wallet.type,
          walletId: wallet.wallet_id,
          balance: wallet.balance,
          holdBalance: wallet.hold_balance,
          currency: wallet.currency,
          is_default: wallet.is_default,
          status: wallet.status
        })),
        status: data.inagent.status,
        createdAt: data.inagent.created_at,
        updatedAt: data.inagent.updated_at
      }
      setAgentInfo(fetchedAgent)
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

  const handleOnClickSuspend = async () => {
    setIsFetching(true)
    try {
      const id = router.query.id

      const response = await axios.patch(
        `/api/inagent/${id}`,
        {
          status: agentStatusMaster.SUSPENDED.value
        },
        config
      )
      setIsFetching(false)
      handleFetchInagent()
    } catch (err) {
      setIsFetching(false)
      const message = err.response ? err.response.data.res_desc : err.message
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: message
      })
      console.error(err)
    }
  }

  const handleOnClickUnsuspend = async () => {
    setIsFetching(true)
    try {
      const id = router.query.id
      const response = await axios.patch(
        `/api/inagent/${id}`,
        {
          status: agentStatusMaster.VERIFIED.value
        },
        config
      )
      setIsFetching(false)
      handleFetchInagent()
    } catch (err) {
      setIsFetching(false)
      const message = err.response ? err.response.data.res_desc : err.message
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: message
      })
      console.error(err)
    }
  }
  const handleOnClickEdit = () => {
    setPage(1)
  }
  const handleOnClickCancel = () => {
    setPage(0)
  }

  const handleOnSubmitEditForm = async ({
    e,
    agentInfoUpdated
  }: {
    e: FormEvent<HTMLFormElement>
    agentInfoUpdated: AgentInfoProps
  }) => {
    e.preventDefault()
    setIsFormSubmitting(true)
    const id = router.query.id
    console.log(agentInfoUpdated)

    try {
      const response = await axios.patch(
        `/api/inagent/${id}`,
        {
          firstname_en: agentInfoUpdated.firstnameEN,
          lastname_en: agentInfoUpdated.lastnameEN,
          firstname_th: agentInfoUpdated.firstnameTH,
          lastname_th: agentInfoUpdated.lastnameTH,
          citizen_id: agentInfoUpdated.citizenId || null,
          passport: agentInfoUpdated.passport || null,
          phone_no: agentInfoUpdated.phoneNo,
          email: agentInfoUpdated.email
        },
        config
      )
      setIsFormSubmitting(false)
      handleFetchInagent()
      setPage(0)
    } catch (err) {
      setIsFormSubmitting(false)
      const message = err.response ? err.response.data.res_desc : err.message
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: message
      })
      console.error(err)
    }
  }
  useEffect(() => {
    if (user) {
      setPermission(
        user.permissions.find(
          (permission) => permission.name === portalPermissionMaster.INAGENT
        )
      )
      handleFetchInagent()
    }
  }, [user])
  return (
    <>
      <Head>
        <title>Agent · Whalepay</title>
      </Head>
      <MainLayout isFetching={!user}>
        {(() => {
          if (page === 0) {
            return (
              <Container fluid>
                <Row style={{ margin: '0px -10px' }}>
                  <Col sm={6}>
                    <Title>Agent</Title>
                  </Col>
                </Row>
                <Row style={{ margin: '0px -10px' }}>
                  <Col lg={5} style={{ margin: '10px 0px' }}>
                    <DetailSection
                      isFetching={isFetching}
                      agentInfo={agentInfo}
                      permission={permission}
                      handleOnClickSuspend={handleOnClickSuspend}
                      handleOnClickUnsuspend={handleOnClickUnsuspend}
                      handleOnClickEdit={handleOnClickEdit}
                    />
                  </Col>
                  <Col lg={7} style={{ margin: '10px 0px' }}>
                    <WalletSection wallets={agentInfo.wallets} />
                  </Col>
                </Row>
              </Container>
            )
          } else if (page === 1) {
            return (
              <Container fluid>
                <Row style={{ margin: '0px -10px' }}>
                  <Col sm={6}>
                    <Title>Edit Agent</Title>
                  </Col>
                </Row>
                <Row style={{ margin: '10px -10px 0px -10px' }}>
                  <Col lg={7}>
                    <Section title="Detail">
                      <EditDetail
                        agentInfo={agentInfo}
                        isFormSubmitting={isFormSubmitting}
                        handleOnClickCancel={handleOnClickCancel}
                        handleOnSubmitEditForm={handleOnSubmitEditForm}
                      />
                    </Section>
                  </Col>
                </Row>
              </Container>
            )
          }
        })()}
      </MainLayout>
    </>
  )
}

export default withAuthenticated(AgentPage)
