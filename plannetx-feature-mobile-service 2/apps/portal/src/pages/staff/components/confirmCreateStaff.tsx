import { Col, Container, Row } from 'react-grid-system'
import Button from '../../../components/commons/button'
import Label from '../../../components/commons/label'
import Section from '../../../components/commons/section'
import Title from '../../../components/commons/title'
import { StaffInfoProps } from '../../../props/staffInfoProps'

interface ConfirmCreateStaffProps {
  staff: StaffInfoProps
  isFormSubmitting: boolean
  handleOnClickCancel: () => void
  handleOnClickConfirm: () => void
}

export const IsConfirmCreateStaff = ({
  staff,
  isFormSubmitting,
  handleOnClickCancel,
  handleOnClickConfirm
}: ConfirmCreateStaffProps) => {
  return (
    <Container fluid>
      <Row style={{ margin: '0px -10px' }}>
        <Col sm={12}>
          <Title>Create Staff</Title>
        </Col>
      </Row>
      <Row style={{ margin: '10px -10px 0px -10px' }}>
        <Col lg={7}>
          <Section title="Detail">
            <Container fluid={true}>
              <Row style={{ margin: '0px -10px' }}>
                <Col sm={12}>
                  <Label>Username</Label>
                  {staff.username}
                  <Label>Email</Label>
                  {staff.email}
                  <Label>Name [EN]</Label>
                  {staff.firstnameEN + ' ' + staff.lastnameEN}
                  <Label>Name [TH]</Label>
                  {staff.firstnameTH + ' ' + staff.lastnameTH}
                  <Label>Phone No</Label>
                  {staff.phoneNo}
                  <Label>Role</Label>
                  {staff.subType}
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
                    Create Staff
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
