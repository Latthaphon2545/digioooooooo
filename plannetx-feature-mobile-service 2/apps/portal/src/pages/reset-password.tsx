import Router, { useRouter } from 'next/router'
import Head from 'next/head'
import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Container, Row, Col, Hidden } from 'react-grid-system'
import axios from 'axios'

import Button from '../components/commons/button'
import Input from '../components/commons/input'

import Swal from '../helpers/sweetalert'

const Logo = styled.img`
  display: block;
  width: 100%;
  height: auto;
  box-sizing: border-box;
`

const Title = styled.div`
  font-size: 2em;
  font-weight: bold;
`

const Subtitle = styled.div`
  color: #92a3b9;
`

const GoBackLoginLink = styled.a`
  font-size: 0.875em;
  text-decoration: none;
  color: #1479ff;
  > i {
    margin-right: 5px;
  }
`

const Footer = styled.div`
  font-size: 0.875em;
  color: #92a3b9;
`

const ResetPasswordPage = () => {
  const router = useRouter()
  const [isFetching, setIsFetching] = useState(true)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleFetchResetPassword = async () => {
    const token = router.query.token
    try {
      const response = await axios.get('/api/authen/reset-password', {
        params: { token }
      })
      setIsFetching(false)
      setUsername(response.data.username)
    } catch (err) {
      setIsFetching(false)
      const message = err.response ? err.response.data.res_desc : err.message
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: message
      })
      Router.push('/login')
      console.error(err)
    }
  }

  const handleOnSubmitForm = async (e) => {
    e.preventDefault()
    const token = router.query.token
    if (password !== confirmPassword) {
      e.target['confirm-password'].setCustomValidity('Password does not match')
    } else {
      setIsFetching(true)
      try {
        await axios.post(
          '/api/authen/reset-password',
          { password },
          { params: { token } }
        )
        setIsFetching(false)
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Reset Password Successfully'
        })
        Router.push('/login')
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
  }
  useEffect(() => {
    if (router.query.token) {
      handleFetchResetPassword()
    }
  }, [router])

  return (
    <>
      <Head>
        <title>Forgot Password · Whalepay</title>
      </Head>
      <Container fluid={true} style={{ height: '100%' }}>
        <Row style={{ height: '100%' }}>
          <Col
            md={6}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <form onSubmit={handleOnSubmitForm}>
              <Container
                fluid={true}
                style={{ position: 'static', margin: '0px 30px 30% 30px' }}
              >
                <Row style={{ margin: '10px -10px' }}>
                  <Col xs={2}>
                    <Logo
                      src="/icon.png"
                      draggable={false}
                      onContextMenu={(e) => e.preventDefault()}
                    />
                  </Col>
                </Row>
                <Row style={{ margin: '0px -10px 30px -10px' }}>
                  <Col xs={12}>
                    <Title>Reset Password</Title>
                    <Subtitle>Please enter your new password</Subtitle>
                  </Col>
                </Row>
                <Row style={{ margin: '0px -10px' }}>
                  <Col xs={12}>
                    <Input
                      icon="fas fa-user"
                      type="text"
                      placeholder="Username"
                      value={username}
                      disabled={true}
                    />
                  </Col>
                </Row>
                <Row style={{ margin: '10px -10px' }}>
                  <Col xs={12}>
                    <Input
                      icon="fas fa-key"
                      type="password"
                      name="password"
                      placeholder="Password"
                      maxLength={15}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required={true}
                      disabled={isFetching}
                    />
                  </Col>
                </Row>
                <Row style={{ margin: '10px -10px' }}>
                  <Col xs={12}>
                    <Input
                      icon="fas fa-key"
                      type="password"
                      name="confirm-password"
                      placeholder="Confirm Password"
                      maxLength={15}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required={true}
                      disabled={isFetching}
                    />
                  </Col>
                </Row>
                <Row align="center" style={{ margin: '0px -10px' }}>
                  <Col xs={6} style={{ margin: '10px 0px 0px 0px' }}>
                    <GoBackLoginLink href="/login">
                      <i className="fas fa-chevron-left" />
                      Back to Login
                    </GoBackLoginLink>
                  </Col>
                  <Col xs={6} style={{ margin: '10px 0px 0px 0px' }}>
                    <Button $primary type="submit">
                      {isFetching ? (
                        <i className="fas fa-spinner fa-spin" />
                      ) : (
                        <i className="far fa-check-circle" />
                      )}
                      Reset Password
                    </Button>
                  </Col>
                </Row>
                <Row
                  style={{
                    position: 'absolute',
                    bottom: '20px',
                    margin: '0px -10px'
                  }}
                >
                  <Col xs={12}>
                    <Footer>
                      © 2019 DIGIO (THAILAND) CO., LTD. ALL RIGHTS RESERVED
                    </Footer>
                  </Col>
                </Row>
              </Container>
            </form>
          </Col>
          <Hidden xs sm>
            <Col md={6} style={{ backgroundColor: '#1479ff' }}></Col>
          </Hidden>
        </Row>
      </Container>
    </>
  )
}

export default ResetPasswordPage
