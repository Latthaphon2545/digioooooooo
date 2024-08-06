import { Col, Container, Row } from 'react-grid-system'
import SectionWrapper from '../../../components/commons/section'
import Badge from '../../../components/commons/badge'
import Label from '../../../components/commons/label'
import transactionStatusMaster from '../../../constants/masters/transactionStatusMaster.json'
import transactionSubTypeMaster from '../../../constants/masters/transactionSubTypeMaster.json'
import transactionTypeMaster from '../../../constants/masters/transactionTypeMaster.json'
import { partnerInfoProps } from '../../../props/partnerInfoProps'

export const TransactionConfig = ({
  partnerInfo
}: {
  partnerInfo: partnerInfoProps
}) => {
  return (
    <SectionWrapper title="Transaction Config">
      <Container fluid>
        <Row style={{ margin: '0px -10px' }}>
          <Col md={2}>
            <Label>Type</Label>
          </Col>
          <Col md={2}>
            <Label>SubType</Label>
          </Col>
          <Col md={2}>
            <Label>Holding</Label>
          </Col>
          <Col md={2}>
            <Label>Updated At</Label>
          </Col>
        </Row>
        {partnerInfo.transaction_configs.map((transactionConfig, index) => {
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
                {transactionTypeMaster[transactionConfig.type].label}
              </Col>
              <Col md={2}>
                {transactionSubTypeMaster[transactionConfig.sub_type].label}
              </Col>
              <Col md={2}>
                {transactionConfig.is_holding ? (
                  <Badge
                    width="80px"
                    color={transactionStatusMaster.HOLDED.color}
                    backgroundcolor={
                      transactionStatusMaster.HOLDED.backgroundColor
                    }
                  >
                    Hold
                  </Badge>
                ) : (
                  <Badge
                    width="80px"
                    color={transactionStatusMaster.APPROVED.color}
                    backgroundcolor={
                      transactionStatusMaster.APPROVED.backgroundColor
                    }
                  >
                    Release
                  </Badge>
                )}
              </Col>
              <Col md={2}>{transactionConfig.updated_at}</Col>
            </Row>
          )
        })}
      </Container>
    </SectionWrapper>
  )
}
