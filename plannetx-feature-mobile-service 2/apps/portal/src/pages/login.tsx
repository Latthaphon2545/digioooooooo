import axios from 'axios'
import Head from 'next/head'
import Router from 'next/router'
import { Col, Container, Hidden, Row } from 'react-grid-system'
import { useState } from 'react'
import styled from 'styled-components'

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

const ForgotPasswordLink = styled.a`
  font-size: 0.875em;
  text-decoration: none;
  color: #1479ff;
`

const Footer = styled.div`
  font-size: 0.875em;
  color: #92a3b9;
`

const LoginPage = () => {
  const [isFetching, setIsFetching] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleOnSubmitLoginForm = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault()
    setIsFetching(true)
    try {
      console.log(username, password)
      const response = await axios.post('/api/authen/login', {
        username,
        password
      })

      if (response.status === 200) {
        Router.push('/')
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

  return (
    <>
      <Head>
        <title>Login · Whalepay</title>
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
            <form onSubmit={handleOnSubmitLoginForm}>
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
                    <Title>Sign In</Title>
                    <Subtitle>
                      Welcome, Please sign in with your username and password
                    </Subtitle>
                  </Col>
                </Row>
                <Row style={{ margin: '0px -10px' }}>
                  <Col xs={12}>
                    <Input
                      icon="fas fa-user"
                      type="text"
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required={true}
                    />
                  </Col>
                </Row>
                <Row style={{ margin: '10px -10px' }}>
                  <Col xs={12}>
                    <Input
                      icon="fas fa-key"
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required={true}
                    />
                  </Col>
                </Row>
                <Row align="center" style={{ margin: '0px -10px' }}>
                  <Col xs={6} style={{ margin: '10px 0px 0px 0px' }}>
                    <ForgotPasswordLink href="/forgot-password">
                      Forgot password?
                    </ForgotPasswordLink>
                  </Col>
                  <Col xs={6} style={{ margin: '10px 0px 0px 0px' }}>
                    <Button $primary type="submit">
                      {isFetching ? (
                        <i className="fas fa-spinner fa-spin" />
                      ) : (
                        <>
                          <i className="fas fa-sign-in-alt" /> Login
                        </>
                      )}
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

export default LoginPage
