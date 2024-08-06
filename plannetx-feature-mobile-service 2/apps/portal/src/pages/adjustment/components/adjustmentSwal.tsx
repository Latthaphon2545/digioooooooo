import currencyFormatter from 'currency-formatter'
import { Col, Container, Row } from 'react-grid-system'
import Hr from '../../../components/commons/hr'
import Label from '../../../components/commons/label'

interface AdjustmentSwalProps {
  data: {
    balance_before: number
    balance_after: number
    currency: string
    reference_no: string
    order_id: string
    remark: string
    payer_name: string
    payee_name: string
    total: number
  }
}

export const AdjustmentSwal = ({ data }: AdjustmentSwalProps) => {
  return (
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
  )
}
