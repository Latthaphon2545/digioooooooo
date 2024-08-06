import currencyFormatter from 'currency-formatter'
import { Col, Container, Row } from 'react-grid-system'
import SectionWrapper from '../../../components/commons/section'
import Label from '../../../components/commons/label'
import { partnerInfoProps } from '../../../props/partnerInfoProps'
import walletTypeMaster from '../../../constants/masters/walletTypeMaster.json'

export const WalletLimit = ({
  partnerInfo
}: {
  partnerInfo: partnerInfoProps
}) => {
  return (
    <SectionWrapper title="Wallet Limit">
      <Container fluid>
        <Row style={{ margin: '0px -10px' }}>
          <Col md={2}>
            <Label>Type</Label>
          </Col>
          <Col md={2}>
            <Label>Balance Limit</Label>
          </Col>
          <Col md={2}>
            <Label>Updated At</Label>
          </Col>
        </Row>
        {partnerInfo.wallet_limites.map((walletLimit, index) => {
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
              <Col md={2}>{walletTypeMaster[walletLimit.type].label}</Col>
              <Col md={2}>
                {currencyFormatter.format(walletLimit.limit_balance, {
                  code: partnerInfo.currency
                })}
              </Col>
              <Col md={2}>{walletLimit.updated_at}</Col>
            </Row>
          )
        })}
      </Container>
    </SectionWrapper>
  )
}
