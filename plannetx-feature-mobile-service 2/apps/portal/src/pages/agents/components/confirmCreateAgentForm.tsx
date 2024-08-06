import { Col, Container, Row } from 'react-grid-system'
import Button from '../../../components/commons/button'
import portalTypeMaster from '../../../constants/masters/portalTypeMaster.json'
import Label from '../../../components/commons/label'
import { useSelectorProps } from '../../../props/useSelectorProps'

type ConfirmCreateAgentFormProps = {
  user: useSelectorProps['user']
  agentInfo: AgentInfo
  inpartners: any[]
  inbranches: any[]
  partnerId: string
  branchId: string
  handleOnClickCancel: () => void
  handleOnClickConfirm: () => void
  isFormSubmitting: boolean
}

type AgentInfo = {
  username: string
  firstnameTH: string
  lastnameTH: string
  firstnameEN: string
  lastnameEN: string
  citizenId: string
  passport: string
  phoneNo: string
  email: string
  branchId: string
}

export default function ConfirmCreateAgentForm({
  user,
  agentInfo,
  inpartners,
  inbranches,
  partnerId,
  branchId,
  handleOnClickCancel,
  handleOnClickConfirm,
  isFormSubmitting
}: ConfirmCreateAgentFormProps) {
  return (
    <Container fluid={true}>
      <Row style={{ margin: '0px -10px' }}>
        <Col sm={12}>
          {user && user.type === portalTypeMaster.DIGIO ? (
            <>
              <Label>Partner</Label>
              {inpartners.find((_partner) => _partner.id === partnerId).name}
            </>
          ) : null}
          <Label>Username</Label>
          {agentInfo.username}
          <Label>Name [EN]</Label>
          {agentInfo.firstnameEN + ' ' + agentInfo.lastnameEN}
          <Label>Name [TH]</Label>
          {agentInfo.firstnameTH + ' ' + agentInfo.lastnameTH}
          <Label>Phone No</Label>
          {agentInfo.phoneNo}
          <Label>Email</Label>
          {agentInfo.email}
          <Label>Branch</Label>
          {inbranches.find((_branch) => _branch.id === branchId).name_en}
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
            Create Agent
          </Button>
        </Col>
      </Row>
    </Container>
  )
}
