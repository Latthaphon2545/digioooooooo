import currencyFormatter from 'currency-formatter'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { renderToString } from 'react-dom/server'
import { Col, Container, Row } from 'react-grid-system'
import { useDispatch, useSelector } from 'react-redux'

import Button from '../../components/commons/button'
import Hr from '../../components/commons/hr'
import IconSelect from '../../components/commons/iconSelect'
import Input from '../../components/commons/input'
import Label from '../../components/commons/label'
import Section from '../../components/commons/section'
import Select from '../../components/commons/select'
import SubSection from '../../components/commons/subSection'
import Title from '../../components/commons/title'

import MainLayout from '../../components/layouts/mainLayout'

import portalTypeMaster from '../../constants/masters/portalTypeMaster'

import axios from '../../helpers/axios'
import Swal from '../../helpers/sweetalert'

import withAuthenticated from '../../hocs/withAuthenticated'

const AdjustmentPage = () => {
  const dispatch = useDispatch()
  const theme = useSelector((state) => state.theme)
  const user = useSelector((state) => state.user)
  const [isFormSubmitting, setIsFormSubmitting] = useState(false)
  const [inpartners, setInpartners] = useState([])
  const [type, setType] = useState('ADD')
  const [partnerId, setPartnerId] = useState(null)
  const [payerType, setPayerType] = useState('DIGIO')
  const [payeeType, setPayeeType] = useState('CONSUMER')
  const [payerValue, setPayerValue] = useState('')
  const [payeeValue, setPayeeValue] = useState('')
  const [amount, setAmount] = useState()
  const [remark, setRemark] = useState('')
  const handleOnChangePayerType = (payer) => {
    if (payer === 'CONSUMER') setPayeeType('DIGIO')
    switch (payer) {
      case 'DIGIO':
        setPayeeType('CONSUMER')
        break
      case 'COLLATERAL':
        setPayeeType('CONSUMER')
        break
      case 'CONSUMER':
        setPayeeType('DIGIO')
        break
    }
    setPayerType(payer)
  }
  const handleOnChangePayeeType = (payee) => {
    setPayeeType(payee)
  }
  const handleOnSubmitForm = (e) => {
    e.preventDefault()
    setIsFormSubmitting(true)
    let referenceNo
    axios
      .post(
        '/api/adjustment/inquiry',
        {
          ...(type === 'ADD'
            ? {
                partner_id: partnerId,
                payer_proxy_type: payerType,
                payer_proxy_value: payerValue,
                payee_proxy_type: payeeType,
                payee_proxy_value: payeeValue,
                amount: Number(amount),
                remark
              }
            : {
                partner_id: partnerId,
                payer_proxy_type: payeeType,
                payer_proxy_value: payeeValue,
                payee_proxy_type: payerType,
                payee_proxy_value: payerValue,
                amount: Number(amount),
                remark
              })
        },
        { dispatch }
      )
      .then(({ data }) => {
        setIsFormSubmitting(false)
        referenceNo = data.reference_no
        return Swal.fire({
          title: 'Adjustment',
          html: renderToString(
            <Container style={{ textAlign: 'left' }} fluid>
              <Row style={{ margin: '-10px -10px 0px -10px' }}>
                <Hr />
              </Row>
              <Row style={{ margin: '0px -10px' }}>
                <Col
                  sm={6}
                  style={{
                    textAlign: 'center',
                    borderRight: '1px solid #f4f6f9'
                  }}
                >
                  <Label>Starting Balance</Label>
                  <span style={{ fontSize: '1.2em' }}>
                    {currencyFormatter.format(data.balance_before, {
                      code: data.currency
                    })}
                  </span>
                </Col>
                <Col sm={6} style={{ textAlign: 'center' }}>
                  <Label>New Balance</Label>
                  <span style={{ fontSize: '1.2em' }}>
                    {currencyFormatter.format(data.balance_after, {
                      code: data.currency
                    })}
                  </span>
                </Col>
              </Row>
              <Row style={{ margin: '0px -10px' }}>
                <Hr />
              </Row>
              <Row style={{ margin: '0px -10px' }}>
                <Col sm={6}>
                  <Label>Reference No</Label>
                  {data.reference_no}
                  <Label>Order ID</Label>
                  {data.order_id}
                  <Label>Remark</Label>
                  {data.remark || '-'}
                </Col>
                <Col sm={6}>
                  <Label>From</Label>
                  {data.payer_name}
                  <Label>To</Label>
                  {data.payee_name}
                  <Label>Total</Label>
                  {currencyFormatter.format(data.total, {
                    code: data.currency
                  })}
                </Col>
              </Row>
            </Container>
          ),
          confirmButtonText: 'Confirm',
          showCancelButton: true
        })
      })
      .then((result) => {
        if (result.isConfirmed) {
          return axios.post(
            '/api/adjustment/confirm',
            {
              partner_id: partnerId,
              reference_no: referenceNo
            },
            { dispatch }
          )
        } else {
          return false
        }
      })
      .then((result) => {
        if (result) {
          return Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Adjustment Successfully'
          })
        }
      })
      .catch((err) => {
        setIsFormSubmitting(false)
        const message = err.response ? err.response.data.res_desc : err.message
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: message
        })
        console.error(err)
      })
  }
  const handleFetchPartner = () => {
    axios
      .get('/api/inpartner', { dispatch })
      .then(({ data }) => {
        setInpartners(data.inpartners)
        setPartnerId(data.inpartners[0].id)
      })
      .catch((err) => {
        const message = err.response ? err.response.data.res_desc : err.message
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: message
        })
        console.error(err)
      })
  }
  useEffect(() => {
    if (user && user.type === portalTypeMaster.DIGIO) {
      handleFetchPartner()
    }
  }, [user])
  return (
    <>
      <Head>
        <title>Adjustment · Whalepay</title>
      </Head>
      <MainLayout isFetching={!user}>
        <Container fluid>
          <Row justify="between" style={{ margin: '0px -10px' }}>
            <Col xs={12}>
              <Title>Adjustment</Title>
            </Col>
          </Row>
          <Row style={{ margin: '10px -10px 0px -10px' }}>
            <Col lg={7}>
              <form onSubmit={handleOnSubmitForm}>
                <Section title="Adjustment">
                  <Container fluid>
                    <Row style={{ margin: '0px -10px' }}>
                      <Col xs={12}>
                        <IconSelect
                          value={type}
                          onChange={(value) => setType(value)}
                          options={[
                            {
                              label: 'Add',
                              value: 'ADD',
                              iconIdle: `/icons/${theme.NAME}/adjustment/add-idle.png`,
                              iconActive: `/icons/${theme.NAME}/adjustment/add-active.png`
                            },
                            {
                              label: 'Deduct',
                              value: 'DEDUCT',
                              iconIdle: `/icons/${theme.NAME}/adjustment/deduct-idle.png`,
                              iconActive: `/icons/${theme.NAME}/adjustment/deduct-active.png`
                            }
                          ]}
                        />
                      </Col>
                    </Row>
                    {user && user.type === portalTypeMaster.DIGIO ? (
                      <Row style={{ margin: '10px -10px' }}>
                        <Col xs={12}>
                          <SubSection title="Partner">
                            <Select
                              icon="fas fa-handshake"
                              onChange={(e) => setPartnerId(e.target.value)}
                            >
                              {inpartners.map((inpartner, index) => {
                                return (
                                  <option value={inpartner.id} key={index}>
                                    {inpartner.name}
                                  </option>
                                )
                              })}
                            </Select>
                          </SubSection>
                        </Col>
                      </Row>
                    ) : null}
                    <Row style={{ margin: '10px -10px' }}>
                      <Col xs={12}>
                        <SubSection title="From">
                          <Container fluid>
                            <Row style={{ margin: '0px -10px' }}>
                              <Col xs={12}>
                                <Select
                                  icon="fas fa-bars"
                                  onChange={(e) =>
                                    handleOnChangePayerType(e.target.value)
                                  }
                                  value={payerType}
                                >
                                  <option value="DIGIO">Digio</option>
                                  <option value="COLLATERAL">Collateral</option>
                                  <option value="CONSUMER">Consumer</option>
                                </Select>
                              </Col>
                            </Row>
                            {(() => {
                              switch (payerType) {
                                case 'CONSUMER':
                                  return (
                                    <Row
                                      style={{ margin: '10px -10px 0px -10px' }}
                                    >
                                      <Col xs={12}>
                                        <Input
                                          icon="fas fa-wallet"
                                          placeholder="Wallet ID"
                                          minLength={15}
                                          maxLength={15}
                                          value={payerValue}
                                          onChange={(e) =>
                                            setPayerValue(
                                              e.target.value.replace(
                                                /[^0-9]/,
                                                ''
                                              )
                                            )
                                          }
                                          required={true}
                                        />
                                      </Col>
                                    </Row>
                                  )
                              }
                            })()}
                          </Container>
                        </SubSection>
                      </Col>
                    </Row>
                    <Row style={{ margin: '10px -10px' }}>
                      <Col xs={12}>
                        <SubSection title="To">
                          <Container fluid>
                            <Row style={{ margin: '0px -10px' }}>
                              <Col xs={12}>
                                <Select
                                  icon="fas fa-bars"
                                  onChange={(e) =>
                                    handleOnChangePayeeType(e.target.value)
                                  }
                                  value={payeeType}
                                >
                                  <option
                                    value="DIGIO"
                                    disabled={
                                      payerType === 'DIGIO' ||
                                      payerType === 'COLLATERAL'
                                    }
                                  >
                                    Digio
                                  </option>
                                  <option
                                    value="COLLATERAL"
                                    disabled={
                                      payerType === 'DIGIO' ||
                                      payerType === 'COLLATERAL'
                                    }
                                  >
                                    Collateral
                                  </option>
                                  <option
                                    value="CONSUMER"
                                    disabled={payerType === 'CONSUMER'}
                                  >
                                    Consumer
                                  </option>
                                </Select>
                              </Col>
                            </Row>
                            {(() => {
                              switch (payeeType) {
                                case 'CONSUMER':
                                  return (
                                    <Row
                                      style={{ margin: '10px -10px 0px -10px' }}
                                    >
                                      <Col xs={12}>
                                        <Input
                                          icon="fas fa-wallet"
                                          placeholder="Wallet ID"
                                          minLength={15}
                                          maxLength={15}
                                          value={payeeValue}
                                          onChange={(e) =>
                                            setPayeeValue(
                                              e.target.value.replace(
                                                /[^0-9]/,
                                                ''
                                              )
                                            )
                                          }
                                          required={true}
                                        />
                                      </Col>
                                    </Row>
                                  )
                              }
                            })()}
                          </Container>
                        </SubSection>
                      </Col>
                    </Row>
                    <Row style={{ margin: '10px -10px' }}>
                      <Col xs={12}>
                        <SubSection title="Amount">
                          <Input
                            icon="fas fa-coins"
                            type="number"
                            placeholder="Amount"
                            min={1}
                            value={amount}
                            onChange={(e) =>
                              setAmount(e.target.value.replace(/[^0-9.]/, ''))
                            }
                            onBlur={(e) => {
                              if (
                                /^\d{1,19}\.{0,1}\d{0,4}$/.test(e.target.value)
                              ) {
                                setAmount(e.target.value)
                              } else {
                                setAmount()
                              }
                            }}
                            required={true}
                          />
                        </SubSection>
                      </Col>
                    </Row>
                    <Row style={{ margin: '10px -10px' }}>
                      <Col xs={12}>
                        <Input
                          icon="fas fa-marker"
                          type="text"
                          placeholder="Remark"
                          value={remark}
                          onChange={(e) => setRemark(e.target.value)}
                          required={true}
                        />
                      </Col>
                    </Row>
                    <Row style={{ margin: '10px -10px 0px -10px' }}>
                      <Col xs={12}>
                        <Button
                          primary
                          type="submit"
                          disabled={isFormSubmitting}
                        >
                          {isFormSubmitting ? (
                            <i className="fas fa-spinner fa-spin" />
                          ) : (
                            <i className="far fa-check-circle" />
                          )}
                          Submit
                        </Button>
                      </Col>
                    </Row>
                  </Container>
                </Section>
              </form>
            </Col>
          </Row>
        </Container>
      </MainLayout>
    </>
  )
}

export default withAuthenticated(AdjustmentPage)
