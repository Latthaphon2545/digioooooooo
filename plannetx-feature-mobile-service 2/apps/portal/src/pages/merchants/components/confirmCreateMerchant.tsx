import { Col, Container, Row } from 'react-grid-system'

import Button from '../../../components/commons/button'
import Label from '../../../components/commons/label'
import Section from '../../../components/commons/section'
import Title from '../../../components/commons/title'
import portalTypeMaster from '../../../constants/masters/portalTypeMaster.json'
import { MerchantInfoProps } from '../../../props/merchantInfoProps'
import { useSelectorProps } from '../../../props/useSelectorProps'

interface ConfirmCreateMerchantProps {
  merchantInfo: MerchantInfoProps
  user: useSelectorProps['user']
  isFormSubmitting: boolean
  inpartners: any[]
  partnerId: string
  inbranches: any[]
  branchId: string
  inagents: any[]
  agentId: string
  handleOnClickCancel: () => void
  handleOnClickConfirm: () => void
}

export const ConfirmCreateMerchant = ({
  user,
  isFormSubmitting,
  merchantInfo,
  inpartners,
  partnerId,
  inbranches,
  branchId,
  inagents,
  agentId,
  handleOnClickCancel,
  handleOnClickConfirm
}: ConfirmCreateMerchantProps) => {
  return (
    <Container fluid>
      <Row style={{ margin: '0px -10px' }}>
        <Col sm={12}>
          <Title>Create Merchant</Title>
        </Col>
      </Row>
      <Row style={{ margin: '10px -10px 0px -10px' }}>
        <Col lg={7}>
          <Section title="Detail">
            <Container fluid={true}>
              <Row style={{ margin: '0px -10px' }}>
                <Col sm={12}>
                  {user && user.type === portalTypeMaster.DIGIO ? (
                    <>
                      <Label>Partner</Label>
                      {
                        inpartners.find((_partner) => _partner.id === partnerId)
                          .name
                      }
                    </>
                  ) : null}
                  <Label>MID</Label>
                  {merchantInfo.mid}
                  <Label>Username</Label>
                  {merchantInfo.username}
                  <Label>Name [EN]</Label>
                  {merchantInfo.firstnameEN + ' ' + merchantInfo.lastnameEN}
                  <Label>Name [TH]</Label>
                  {merchantInfo.firstnameTH + ' ' + merchantInfo.lastnameTH}
                  <Label>Phone No</Label>
                  {merchantInfo.phoneNo}
                  <Label>Email</Label>
                  {merchantInfo.email}
                  <Label>Branch</Label>
                  {
                    inbranches.find((_branch) => _branch.id === branchId)
                      .name_en
                  }
                  <Label>Settle Time</Label>
                  {merchantInfo.settleTime}
                  <Label>Settle to Agent</Label>
                  {(() => {
                    const inagent = inagents.find(
                      (inagent) => parseInt(inagent.id) === parseInt(agentId)
                    )
                    return `${inagent.firstname_en} ${inagent.lastname_en}`
                  })()}
                </Col>
              </Row>
              <Row style={{ margin: '10px -10px 0px -10px' }}>
                <Col sm={6}>
                  <Button
                    $secondary
                    onClick={handleOnClickCancel}
                    disabled={isFormSubmitting}
                  >
                    <i className="fas fa-chevron-left" /> Cancel
                  </Button>
                </Col>
                <Col sm={6}>
                  <Button
                    $primary
                    onClick={handleOnClickConfirm}
                    disabled={isFormSubmitting}
                  >
                    {isFormSubmitting ? (
                      <i className="fas fa-spinner fa-spin" />
                    ) : (
                      <i className="far fa-check-circle" />
                    )}
                    Create Merchant
                  </Button>
                </Col>
              </Row>
            </Container>
          </Section>
        </Col>
      </Row>
    </Container>
  )
}