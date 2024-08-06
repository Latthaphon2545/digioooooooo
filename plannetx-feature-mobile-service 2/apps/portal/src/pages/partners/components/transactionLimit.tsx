import currencyFormatter from 'currency-formatter'
import { Col, Container, Row } from 'react-grid-system'
import SectionWrapper from '../../../components/commons/section'
import Label from '../../../components/commons/label'
import transactionSubTypeMaster from '../../../constants/masters/transactionSubTypeMaster.json'
import transactionTypeMaster from '../../../constants/masters/transactionTypeMaster.json'
import { partnerInfoProps } from '../../../props/partnerInfoProps'

export const TransactionLimit = ({
  partnerInfo
}: {
  partnerInfo: partnerInfoProps
}) => {
  return (
    <SectionWrapper title="Transaction Limit">
      <Container fluid>
        <Row style={{ margin: '0px -10px' }}>
          <Col md={2}>
            <Label>Type</Label>
          </Col>
          <Col md={2}>
            <Label>SubType</Label>
          </Col>
          <Col md={2}>
            <Label>Limit / Transaction</Label>
          </Col>
          <Col md={2}>
            <Label>Limit / Day</Label>
          </Col>
          <Col md={2}>
            <Label>Updated At</Label>
          </Col>
        </Row>
        {partnerInfo.transaction_limites.map((transactionLimit, index) => {
          return (
            <Row
              style={
                index + 1 === partnerInfo.transaction_configs.length
                  ? {
                      margin: '10px -10px 0px -10px'
                    }
                  : {
                      margin: '10px -10px'
                    }
              }
              key={index}
            >
              <Col md={2}>
                {transactionTypeMaster[transactionLimit.type].label}
              </Col>
              <Col md={2}>
                {transactionSubTypeMaster[transactionLimit.sub_type].label}
              </Col>
              <Col md={2}>
                {currencyFormatter.format(
                  transactionLimit.limit_per_transaction,
                  { code: partnerInfo.currency }
                )}
              </Col>
              <Col md={2}>
                {currencyFormatter.format(transactionLimit.limit_per_day, {
                  code: partnerInfo.currency
                })}
              </Col>
              <Col md={2}>{transactionLimit.updated_at}</Col>
            </Row>
          )
        })}
      </Container>
    </SectionWrapper>
  )
}
