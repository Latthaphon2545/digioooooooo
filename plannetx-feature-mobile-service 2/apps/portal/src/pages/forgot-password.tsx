import axios from 'axios'
import Head from 'next/head'
import Router from 'next/router'
import { useState } from 'react'
import { Col, Container, Hidden, Row } from 'react-grid-system'
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

const ForgotPasswordPage = () => {
  const [isFetching, setIsFetching] = useState(false)
  const [email, setEmail] = useState('')

  const handleOnSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsFetching(true)
    try {
      console.log(email)
      const response = await axios.post('/api/authen/forgot', { email })
      if (response.status === 200) {
        const alert = Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Please check your email to reset your password'
        })

        if ((await alert).isConfirmed) {
          Router.push('/login')
        }
      }
    } catch (err) {
      console.error(err)
      const message = err.response ? err.response.data.res_desc : err.message
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: message
      })
    } finally {
      setIsFetching(false)
    }
  }

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
                    <Title>Forgot Password</Title>
                    <Subtitle>
                      Enter your email address and we&apos;ll send you a link to
                      reset your password
                    </Subtitle>
                  </Col>
                </Row>
                <Row style={{ margin: '0px -10px' }}>
                  <Col xs={12}>
                    <Input
                      icon="fas fa-envelope"
                      type="text"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required={true}
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
                        <>
                          <i className="far fa-check-circle" /> Forgot Password
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

export default ForgotPasswordPage
