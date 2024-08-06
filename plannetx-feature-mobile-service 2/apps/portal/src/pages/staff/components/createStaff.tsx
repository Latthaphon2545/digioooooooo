import { Col, Container, Row } from 'react-grid-system'
import Button from '../../../components/commons/button'
import Input from '../../../components/commons/input'
import Section from '../../../components/commons/section'
import Select from '../../../components/commons/select'
import SubSection from '../../../components/commons/subSection'
import Title from '../../../components/commons/title'
import portalSubTypeMaster from '../../../constants/masters/portalSubTypeMaster.json'
import { StaffInfoProps } from '../../../props/staffInfoProps'
import { useState } from 'react'

interface CreateStaffProps {
  staffInfo: StaffInfoProps
  handleOnSubmitCreate: (e: React.FormEvent<HTMLFormElement>) => void
  setStaffInfo: (staffInfo: StaffInfoProps) => void
}

export const CreateStaff = ({
  staffInfo,
  handleOnSubmitCreate,
  setStaffInfo
}: CreateStaffProps) => {
  const [username, setUsername] = useState(staffInfo.username)
  const [email, setEmail] = useState(staffInfo.email)
  const [firstnameEN, setFirstnameEN] = useState(staffInfo.firstnameEN)
  const [lastnameEN, setLastnameEN] = useState(staffInfo.lastnameEN)
  const [firstnameTH, setFirstnameTH] = useState(staffInfo.firstnameTH)
  const [lastnameTH, setLastnameTH] = useState(staffInfo.lastnameTH)
  const [phoneNo, setPhoneNo] = useState(staffInfo.phoneNo)
  const [subType, setSubType] = useState(staffInfo.subType)

  const handleSubmitCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStaffInfo({
      username,
      email,
      firstnameEN,
      lastnameEN,
      firstnameTH,
      lastnameTH,
      phoneNo,
      subType,
      role: '',
      status: '',
      recentLogin: '',
      createdAt: '',
      updatedAt: ''
    })
    handleOnSubmitCreate(e)
  }

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
            <form onSubmit={handleSubmitCreate}>
              <SubSection title="Account">
                <Container fluid>
                  <Row style={{ margin: '0px -10px' }}>
                    <Col xs={12}>
                      <Input
                        icon="fas fa-user-cog"
                        type="text"
                        placeholder="Username"
                        minLength={5}
                        maxLength={15}
                        value={username}
                        onChange={(e) =>
                          setUsername(
                            e.target.value.replace(/[^a-z0-9\-_]/, '')
                          )
                        }
                        required={true}
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
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required={true}
                      />
                    </Col>
                  </Row>
                </Container>
              </SubSection>
              <SubSection title="Contact" style={{ margin: '20px 0px' }}>
                <Container fluid>
                  <Row style={{ margin: '0px -10px' }}>
                    <Col sm={6}>
                      <Input
                        icon="fas fa-id-card"
                        type="text"
                        placeholder="Firstname [EN]"
                        maxLength={100}
                        value={firstnameEN}
                        onChange={(e) =>
                          setFirstnameEN(
                            e.target.value.replace(/[^a-zA-Z]/, '')
                          )
                        }
                        required={true}
                      />
                    </Col>
                    <Col sm={6}>
                      <Input
                        icon="fas fa-id-card"
                        type="text"
                        placeholder="Lastname [EN]"
                        maxLength={100}
                        value={lastnameEN}
                        onChange={(e) =>
                          setLastnameEN(e.target.value.replace(/[^a-zA-Z]/, ''))
                        }
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
                        value={firstnameTH}
                        onChange={(e) =>
                          setFirstnameTH(e.target.value.replace(/[^ก-๛]/, ''))
                        }
                        required={true}
                      />
                    </Col>
                    <Col sm={6}>
                      <Input
                        icon="fas fa-id-card"
                        type="text"
                        placeholder="Lastname [TH]"
                        maxLength={100}
                        value={lastnameTH}
                        onChange={(e) =>
                          setLastnameTH(e.target.value.replace(/[^ก-๛]/, ''))
                        }
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
                        value={phoneNo}
                        onChange={(e) =>
                          setPhoneNo(e.target.value.replace(/[^\d]/, ''))
                        }
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
                        onChange={(e) => setSubType(e.target.value)}
                      >
                        {Object.keys(portalSubTypeMaster).map(
                          (subType, index) => {
                            return (
                              <option
                                value={portalSubTypeMaster[subType].value}
                                key={index}
                              >
                                {portalSubTypeMaster[subType].label}
                              </option>
                            )
                          }
                        )}
                      </Select>
                    </Col>
                  </Row>
                  <Row style={{ margin: '10px -10px 0px -10px' }}>
                    <Col sm={12}>
                      <Button type="submit" $primary>
                        Next <i className="fas fa-chevron-right" />
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
