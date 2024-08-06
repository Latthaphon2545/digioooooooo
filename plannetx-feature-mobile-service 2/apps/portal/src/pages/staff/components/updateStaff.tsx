import { Col, Container, Row } from 'react-grid-system'
import Button from '../../../components/commons/button'
import Input from '../../../components/commons/input'
import Section from '../../../components/commons/section'
import Select from '../../../components/commons/select'
import SubSection from '../../../components/commons/subSection'
import Title from '../../../components/commons/title'
import portalSubTypeMaster from '../../../constants/masters/portalSubTypeMaster.json'
import SubSectionWrapper from '../../../components/commons/subSection'
import { FormEvent, useState } from 'react'
import { StaffInfoProps } from '../../../props/staffInfoProps'

interface UpdateStaffProps {
  staffInfo: StaffInfoProps
  username: string
  handleOnSubmitEditForm: ({
    e,
    staffUpdateInfo
  }: {
    e: FormEvent<HTMLFormElement>
    staffUpdateInfo: {
      email: string
      firstnameEN: string
      lastnameEN: string
      firstnameTH: string
      lastnameTH: string
      phoneNo: string
      subType: string
    }
  }) => void
  handleOnClickCancel: () => void
  isFormSubmitting: boolean
}

export const UpdateStaff = ({
  username,
  handleOnSubmitEditForm,
  staffInfo,
  handleOnClickCancel,
  isFormSubmitting
}: UpdateStaffProps) => {
  const [usernameField, setUsernameField] = useState(username)
  const [emailField, setEmailField] = useState(staffInfo.email)
  const [firstnameENField, setFirstnameENField] = useState(
    staffInfo.firstnameEN
  )
  const [lastnameENField, setLastnameENField] = useState(staffInfo.lastnameEN)
  const [firstnameTHField, setFirstnameTHField] = useState(
    staffInfo.firstnameTH
  )
  const [lastnameTHField, setLastnameTHField] = useState(staffInfo.lastnameTH)
  const [phoneNoField, setPhoneNoField] = useState(staffInfo.phoneNo)
  const [subTypeField, setSubTypeField] = useState(staffInfo.subType)

  const staffUpdateInfo = {
    email: emailField,
    firstnameEN: firstnameENField,
    lastnameEN: lastnameENField,
    firstnameTH: firstnameTHField,
    lastnameTH: lastnameTHField,
    phoneNo: phoneNoField.toString(),
    subType: subTypeField
  }

  return (
    <Container fluid>
      <Row style={{ margin: '0px -10px' }}>
        <Col sm={6}>
          <Title>Edit Staff</Title>
        </Col>
      </Row>
      <Row style={{ margin: '10px -10px 0px -10px' }}>
        <Col lg={7}>
          <Section title="Detail">
            <form
              onSubmit={(e) => handleOnSubmitEditForm({ e, staffUpdateInfo })}
            >
              <SubSectionWrapper title="Account">
                <Container fluid>
                  <Row style={{ margin: '0px -10px' }}>
                    <Col xs={12}>
                      <Input
                        icon="fas fa-user-cog"
                        type="text"
                        placeholder="Username"
                        minLength={5}
                        maxLength={15}
                        value={usernameField}
                        onChange={(e) => setUsernameField(e.target.value)}
                        disabled={true}
                      />
                    </Col>
                  </Row>
                  <Row style={{ margin: '10px -10px 0px -10px' }}>
                    <Col sm={12}>
                      <Input
                        icon="fas fa-envelope"
                        type="email"
                        placeholder="Email"
                        maxLength={45}
                        value={emailField}
                        onChange={(e) => setEmailField(e.target.value)}
                        required={true}
                      />
                    </Col>
                  </Row>
                </Container>
              </SubSectionWrapper>
              <SubSection title="Contact" style={{ margin: '20px 0px' }}>
                <Container fluid>
                  <Row style={{ margin: '0px -10px' }}>
                    <Col sm={6}>
                      <Input
                        icon="fas fa-id-card"
                        type="text"
                        placeholder="Firstname [EN]"
                        maxLength={100}
                        value={firstnameENField}
                        onChange={(e) => setFirstnameENField(e.target.value)}
                        required={true}
                      />
                    </Col>
                    <Col sm={6}>
                      <Input
                        icon="fas fa-id-card"
                        type="text"
                        placeholder="Lastname [EN]"
                        maxLength={100}
                        value={lastnameENField}
                        onChange={(e) => setLastnameENField(e.target.value)}
                        required={true}
                      />
                    </Col>
                  </Row>
                  <Row style={{ margin: '10px -10px 0px -10px' }}>
                    <Col sm={6}>
                      <Input
                        icon="fas fa-id-card"
                        type="text"
                        placeholder="Firstname [TH]"
                        maxLength={100}
                        value={firstnameTHField}
                        onChange={(e) => setFirstnameTHField(e.target.value)}
                        required={true}
                      />
                    </Col>
                    <Col sm={6}>
                      <Input
                        icon="fas fa-id-card"
                        type="text"
                        placeholder="Lastname [TH]"
                        maxLength={100}
                        value={lastnameTHField}
                        onChange={(e) => setLastnameTHField(e.target.value)}
                        required={true}
                      />
                    </Col>
                  </Row>
                  <Row style={{ margin: '10px -10px 0px -10px' }}>
                    <Col sm={12}>
                      <Input
                        icon="fas fa-phone"
                        type="text"
                        placeholder="Phone No"
                        value={phoneNoField}
                        onChange={(e) => setPhoneNoField(e.target.value)}
                        minLength={10}
                        maxLength={10}
                        required={true}
                      />
                    </Col>
                  </Row>
                </Container>
              </SubSection>
              <SubSection title="Role">
                <Container fluid>
                  <Row style={{ margin: '0px -10px' }}>
                    <Col sm={12}>
                      <Select
                        icon="fas fa-user-tag"
                        onChange={(e) => setSubTypeField(e.target.value)}
                        value={subTypeField}
                      >
                        {Object.keys(portalSubTypeMaster).map(
                          (_subType, index) => {
                            return (
                              <option
                                value={portalSubTypeMaster[_subType].value}
                                key={index}
                              >
                                {portalSubTypeMaster[_subType].label}
                              </option>
                            )
                          }
                        )}
                      </Select>
                    </Col>
                  </Row>
                  <Row style={{ margin: '10px -10px 0px -10px' }}>
                    <Col sm={6}>
                      <Button
                        $secondary
                        onClick={handleOnClickCancel}
                        disabled={isFormSubmitting}
                      >
                        <i className="fas fa-ban" />
                        Cancel
                      </Button>
                    </Col>
                    <Col sm={6}>
                      <Button
                        $primary
                        type="submit"
                        disabled={isFormSubmitting}
                      >
                        {isFormSubmitting ? (
                          <i className="fas fa-spinner fa-spin" />
                        ) : (
                          <i className="fas fa-save" />
                        )}
                        Save
                      </Button>
                    </Col>
                  </Row>
                </Container>
              </SubSection>
            </form>
          </Section>
        </Col>
      </Row>
    </Container>
  )
}
