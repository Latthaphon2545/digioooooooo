import Head from 'next/head'
import Router from 'next/router'
import { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-grid-system'
import { useDispatch, useSelector } from 'react-redux'

import Button from '../../components/commons/button'
import Input from '../../components/commons/input'
import Label from '../../components/commons/label'
import Section from '../../components/commons/section'
import Select from '../../components/commons/select'
import SubSection from '../../components/commons/subSection'
import Title from '../../components/commons/title'

import portalTypeMaster from '../../constants/masters/portalTypeMaster.json'

import MainLayout from '../../components/layouts/mainLayout'

import axios, {
  CustomAxiosRequestConfig,
  DispatchAction
} from '../../helpers/axios'
import Swal from '../../helpers/sweetalert'

import withAuthenticated from '../../hocs/withAuthenticated'
import { useSelectorProps } from '../../props/useSelectorProps'
import { Dispatch } from '@reduxjs/toolkit'
import CreateAgent from './components/createAgentForm'
import ConfirmCreateAgentForm from './components/confirmCreateAgentForm'

type AgentInfo = {
  username: string
  firstnameTH: string
  lastnameTH: string
  firstnameEN: string
  lastnameEN: string
  citizenId: string
  passport: string
  phoneNo: string
  email: string
  branchId: string
}

const AgentPage = () => {
  const dispatch = useDispatch<Dispatch<DispatchAction>>()
  const config: CustomAxiosRequestConfig = {
    dispatch
  }
  const user = useSelector((state: useSelectorProps) => state.user)

  const [page, setPage] = useState(0)
  const [isFormSubmitting, setIsFormSubmitting] = useState(false)
  const [inpartners, setInpartners] = useState([])
  const [partnerId, setPartnerId] = useState('')
  const [inbranches, setInbranches] = useState([])
  const [agentInfo, setAgentInfo] = useState<AgentInfo>()
  const [branchId, setBranchId] = useState('')

  const handleFetchInpartners = async () => {
    try {
      const response = await axios.get('/api/inpartner', config)
      const data = response.data
      setInpartners(data.inpartners)
      setPartnerId(data.inpartners.length ? data.inpartners[0].id : '')
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

  const handleFetchInbranches = async (partnerId) => {
    try {
      const finalConfig: CustomAxiosRequestConfig = {
        ...config,
        headers: { 'x-partner-id': partnerId }
      }
      const response = await axios.get('/api/inbranch', finalConfig)
      const data = response.data
      setInbranches(data.inbranches)
      setBranchId(data.inbranches.length ? data.inbranches[0].id : '')
    } catch (err) {
      console.error(err)
    }
  }
  const handleOnSubmitCreate = (e) => {
    e.preventDefault()
    if (branchId) {
      setPage(1)
    }
  }
  const handleOnClickCancel = () => {
    setPage(0)
  }
  const handleOnClickConfirm = async () => {
    setIsFormSubmitting(true)
    try {
      const finalConfig: CustomAxiosRequestConfig = {
        ...config,
        headers: { 'x-partner-id': partnerId }
      }
      console.log()

      await axios.post(
        '/api/inagent',
        {
          username: agentInfo.username,
          firstname_th: agentInfo.firstnameTH,
          lastname_th: agentInfo.lastnameTH,
          firstname_en: agentInfo.firstnameEN,
          lastname_en: agentInfo.lastnameEN,
          citizen_id: agentInfo.citizenId || undefined,
          passport: agentInfo.passport || undefined,
          phone_no: agentInfo.phoneNo,
          email: agentInfo.email,
          branch_id: agentInfo.branchId
        },
        finalConfig
      )
      setIsFormSubmitting(false)
      Router.push('/agents')
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
      if (user.type === portalTypeMaster.DIGIO) {
        handleFetchInpartners()
      } else {
        handleFetchInbranches(partnerId)
      }
    }
  }, [user])
  return (
    <>
      <Head>
        <title>Create Agent · Whalepay</title>
      </Head>
      <MainLayout isFetching={!user}>
        {(() => {
          if (page === 0) {
            return (
              <Container fluid>
                <Row style={{ margin: '0px -10px' }}>
                  <Col sm={12}>
                    <Title>Create Agent</Title>
                  </Col>
                </Row>
                <Row style={{ margin: '10px -10px 0px -10px' }}>
                  <Col lg={7}>
                    <Section title="Detail">
                      <CreateAgent
                        user={user}
                        handleOnSubmitCreate={handleOnSubmitCreate}
                        handleFetchInbranches={handleFetchInbranches}
                        inpartners={inpartners}
                        inbranches={inbranches}
                        setAgentInfo={setAgentInfo}
                      />
                    </Section>
                  </Col>
                </Row>
              </Container>
            )
          } else if (page === 1) {
            return (
              <Container fluid>
                <Row style={{ margin: '0px -10px' }}>
                  <Col sm={12}>
                    <Title>Create Agent</Title>
                  </Col>
                </Row>
                <Row style={{ margin: '10px -10px 0px -10px' }}>
                  <Col lg={7}>
                    <Section title="Detail">
                      <ConfirmCreateAgentForm
                        user={user}
                        agentInfo={agentInfo}
                        inpartners={inpartners}
                        inbranches={inbranches}
                        branchId={branchId}
                        partnerId={partnerId}
                        handleOnClickCancel={handleOnClickCancel}
                        handleOnClickConfirm={handleOnClickConfirm}
                        isFormSubmitting={isFormSubmitting}
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
