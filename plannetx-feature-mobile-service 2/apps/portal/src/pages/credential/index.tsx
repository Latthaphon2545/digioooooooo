import Head from 'next/head'
import Tooltip from 'rc-tooltip'
import { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-grid-system'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import Button from '../../components/commons/button'
import Hr from '../../components/commons/hr'
import Label from '../../components/commons/label'
import Section from '../../components/commons/section'
import Skeleton from '../../components/commons/skeleton'
import Title from '../../components/commons/title'

import MainLayout from '../../components/layouts/mainLayout'

import portalPermissionMaster from '../../constants/masters/portalPermissionMaster.json'

import axios, {
  CustomAxiosRequestConfig,
  DispatchAction
} from '../../helpers/axios'
import Swal from '../../helpers/sweetalert'

import withAuthenticated from '../../hocs/withAuthenticated'
import { useSelectorProps } from '../../props/useSelectorProps'
import { Dispatch } from '@reduxjs/toolkit'

const CopyButton = styled.button`
  apperance: none;
  padding: 0px 10px;
  font-size: 1em;
  color: #92a3b9;
  background: transparent;
  border: none;
  outline: none;
  &:hover {
    cursor: pointer;
    color: #3b5475;
  }
`

const CredentialPage = () => {
  const dispatch = useDispatch<Dispatch<DispatchAction>>()
  const config: CustomAxiosRequestConfig = {
    dispatch
  }
  const user = useSelector((state: useSelectorProps) => state.user)
  const [permission, setPermission] = useState(null)
  const [isFetching, setIsFetching] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [apiId, setApiId] = useState('')
  const [apiKey, setApiKey] = useState('')
  const [copy, setCopy] = useState('Copy')
  const [updatedAt, setUpdatedAt] = useState('')

  const handleFetchCredential = async () => {
    setIsFetching(true)
    try {
      const response = await axios.get('/api/partner/credential', config)
      const data = response.data
      setApiId(data.api_id)
      setApiKey(data.api_key)
      setUpdatedAt(data.updated_at)
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

  const handleOnClickCopy = (text) => {
    setCopy('Copied')
    navigator.clipboard.writeText(text)
  }

  const handleOnClickRefreshAPI = async () => {
    setIsFetching(true)
    setIsRefreshing(true)
    try {
      const response = await axios.patch('/api/partner/credential', config)
      handleFetchCredential()
    } catch (err) {
      const message = err.response ? err.response.data.res_desc : err.message
      Swal.fire({
        icon: 'error',
        title: 'Errror',
        text: message
      })
      console.error(err)
    } finally {
      setIsFetching(false)
      setIsRefreshing(false)
    }
  }

  useEffect(() => {
    if (user) {
      setPermission(
        user.permissions.find(
          (permission) => permission.name === portalPermissionMaster.CREDENTIAL
        )
      )
      handleFetchCredential()
    }
  }, [user])
  return (
    <>
      <Head>
        <title>Credential · Whalepay</title>
      </Head>
      <MainLayout isFetching={!user}>
        <Container fluid>
          <Row style={{ margin: '0px -10px' }}>
            <Col sm={6}>
              <Title>Credential</Title>
            </Col>
          </Row>
          <Row style={{ margin: '10px -10px 0px -10px' }}>
            <Col xs={12}>
              <Section title="API ID & API Key">
                <Label>API ID</Label>
                {isFetching ? (
                  <Skeleton />
                ) : (
                  <>
                    {apiId}
                    <Tooltip
                      placement="top"
                      overlay={copy}
                      onVisibleChange={(isVisible) => {
                        if (!isVisible) setCopy('Copy')
                      }}
                      overlayInnerStyle={{ minHeight: '0px' }}
                    >
                      <CopyButton onClick={() => handleOnClickCopy(apiId)}>
                        <i className="fas fa-clipboard" />
                      </CopyButton>
                    </Tooltip>
                  </>
                )}
                <Label>API Key</Label>
                {isFetching ? (
                  <Skeleton />
                ) : (
                  <>
                    {apiKey}
                    <Tooltip
                      placement="top"
                      overlay={copy}
                      onVisibleChange={(isVisible) => {
                        if (!isVisible) setCopy('Copy')
                      }}
                      overlayInnerStyle={{ minHeight: '0px' }}
                    >
                      <CopyButton onClick={() => handleOnClickCopy(apiKey)}>
                        <i className="fas fa-clipboard" />
                      </CopyButton>
                    </Tooltip>
                  </>
                )}
                <Label>Updated At</Label>
                {isFetching ? <Skeleton /> : updatedAt}
                {permission && permission.edit ? (
                  <>
                    <Hr />
                    <Container fluid>
                      <Row style={{ margin: '0px -10px' }}>
                        <Col sm={4}>
                          <Button
                            dangeralt
                            onClick={handleOnClickRefreshAPI}
                            disabled={isRefreshing}
                          >
                            {isRefreshing ? (
                              <i className="fas fa-sync fa-spin" />
                            ) : (
                              <i className="fas fa-sync" />
                            )}
                            Refresh API
                          </Button>
                        </Col>
                      </Row>
                    </Container>
                  </>
                ) : null}
              </Section>
            </Col>
          </Row>
        </Container>
      </MainLayout>
    </>
  )
}

export default withAuthenticated(CredentialPage)
