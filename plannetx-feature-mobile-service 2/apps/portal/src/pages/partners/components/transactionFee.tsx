import currencyFormatter from 'currency-formatter'
import { Col, Container, Row } from 'react-grid-system'
import SectionWrapper from '../../../components/commons/section'
import Label from '../../../components/commons/label'
import transactionSubTypeMaster from '../../../constants/masters/transactionSubTypeMaster.json'
import transactionTypeMaster from '../../../constants/masters/transactionTypeMaster.json'
import { partnerInfoProps } from '../../../props/partnerInfoProps'

export const TransactionFee = ({
  partnerInfo
}: {
  partnerInfo: partnerInfoProps
}) => {
  return (
    <SectionWrapper title="Transaction Fee">
      <Container fluid>
        <Row style={{ margin: '0px -10px' }}>
          <Col sm={2}>
            <Label>Type</Label>
          </Col>
          <Col sm={2}>
            <Label>SubType</Label>
          </Col>
          <Col sm={4}>
            <Label>Range</Label>
          </Col>
          <Col sm={2}>
            <Label>Fee</Label>
          </Col>
          <Col sm={2}>
            <Label>Updated At</Label>
          </Col>
        </Row>
        {partnerInfo.transaction_fees.map((transactionFee, index) => {
          return (
            <Row
              style={
                index + 1 === partnerInfo.transaction_fees.length
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
                {transactionTypeMaster[transactionFee.type].label}
              </Col>
              <Col md={2}>
                {transactionSubTypeMaster[transactionFee.sub_type].label}
              </Col>
              <Col md={4}>
                {currencyFormatter.format(transactionFee.start, {
                  code: partnerInfo.currency
                })}{' '}
                -{' '}
                {currencyFormatter.format(transactionFee.end, {
                  code: partnerInfo.currency
                })}
              </Col>
              <Col md={2}>
                {currencyFormatter.format(transactionFee.fee, {
                  code: partnerInfo.currency
                })}
              </Col>
              <Col md={2}>{transactionFee.updated_at}</Col>
            </Row>
          )
        })}
      </Container>
    </SectionWrapper>
  )
}
