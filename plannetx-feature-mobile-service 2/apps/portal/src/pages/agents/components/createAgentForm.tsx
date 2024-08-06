import { Col, Container, Row } from 'react-grid-system'
import SubSection from '../../../components/commons/subSection'
import Select from '../../../components/commons/select'
import Button from '../../../components/commons/button'
import Input from '../../../components/commons/input'
import { useSelectorProps } from '../../../props/useSelectorProps'
import portalTypeMaster from '../../../constants/masters/portalTypeMaster.json'
import { useState } from 'react'

type CreateAgentProps = {
  user: useSelectorProps['user']
  handleOnSubmitCreate: (e: React.FormEvent<HTMLFormElement>) => void
  handleFetchInbranches: (partnerId: string) => void
  inpartners: any[]
  inbranches: any[]
  setAgentInfo: (agentInfo: AgentInfo) => void
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
  inpartner: string
}

export default function CreateAgent({
  user,
  handleOnSubmitCreate,
  handleFetchInbranches,
  inpartners,
  inbranches,
  setAgentInfo
}: CreateAgentProps) {
  const [partnerId, setPartnerId] = useState(0)
  const [username, setUsername] = useState('')
  const [firstnameEN, setFirstnameEN] = useState('')
  const [lastnameEN, setLastnameEN] = useState('')
  const [firstnameTH, setFirstnameTH] = useState('')
  const [lastnameTH, setLastnameTH] = useState('')
  const [citizenId, setCitizenId] = useState('')
  const [passport, setPassport] = useState('')
  const [phoneNo, setPhoneNo] = useState('')
  const [email, setEmail] = useState('')
  const [branchId, setBranchId] = useState(0)

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const agentUpdated = {
      username,
      firstnameTH,
      lastnameTH,
      firstnameEN,
      lastnameEN,
      citizenId,
      passport,
      phoneNo: phoneNo,
      email,
      branchId: branchId.toString(),
      inpartner: partnerId.toString()
    }
    setAgentInfo(agentUpdated)
    handleOnSubmitCreate(e)
  }

  return (
    <form onSubmit={handleOnSubmit}>
      {user && user.type === portalTypeMaster.DIGIO ? (
        <SubSection title="Partner" style={{ margin: '0px 0px 10px 0px' }}>
          <Select
            icon="fas fa-handshake"
            onChange={(e) => {
              setPartnerId(Number(e.target.value))
              handleFetchInbranches(e.target.value)
            }}
            required={true}
          >
            {inpartners.map((inpartner, index) => {
              return (
                <option value={inpartner.id} key={index}>
                  {inpartner.name}
                </option>
              )
            })}
          </Select>
        </SubSection>
      ) : null}
      <SubSection title="Account">
        <Container fluid>
          <Row style={{ margin: '0px -10px' }}>
            <Col xs={12}>
              <Input
                icon="fas fa-user-cog"
                type="text"
                placeholder="Username"
                minLength={5}
                maxLength={20}
                value={username}
                onChange={(e) =>
                  setUsername(e.target.value.replace(/[^a-z0-9\-_]/, ''))
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
                placeholder="Firstname [EN]"
                maxLength={100}
                value={firstnameEN}
                onChange={(e) =>
                  setFirstnameEN(e.target.value.replace(/[^a-zA-Z]/, ''))
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
          <Row style={{ margin: '10px -10px' }}>
            <Col xs={12}>
              <Input
                icon="fas fa-id-card"
                type="text"
                name="citizen-id"
                minLength={13}
                maxLength={13}
                placeholder="Citizen ID"
                value={citizenId}
                onChange={(e) =>
                  setCitizenId(e.target.value.replace(/[^0-9]/, ''))
                }
                required={passport === ''}
              />
            </Col>
          </Row>
          <Row style={{ margin: '0px -10px 0px -10px' }}>
            <Col xs={12}>
              <Input
                icon="fas fa-passport"
                type="text"
                name="passport"
                minLength={6}
                maxLength={12}
                placeholder="Passport"
                value={passport}
                onChange={(e) =>
                  setPassport(e.target.value.replace(/[^0-9a-zA-Z]/, ''))
                }
                required={citizenId === ''}
              />
            </Col>
          </Row>
        </Container>
      </SubSection>
      <SubSection title="Contact" style={{ margin: '10px 0px' }}>
        <Container fluid>
          <Row style={{ margin: '0px -10px' }}>
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
      <SubSection title="Branch" style={{ margin: '10px 0px' }}>
        <Container fluid>
          <Row style={{ margin: '0px -10px' }}>
            <Col sm={12}>
              <Select
                icon="fas fa-code-branch"
                onChange={(e) => setBranchId(Number(e.target.value))}
              >
                {inbranches.map((branch, index) => {
                  return (
                    <option value={branch.id} key={index}>
                      {branch.name_en}
                    </option>
                  )
                })}
              </Select>
            </Col>
          </Row>
        </Container>
      </SubSection>
      <Container style={{ margin: '10px -5px 0px -5px' }} fluid>
        <Row>
          <Col sm={12}>
            <Button type="submit" $primary>
              Next <i className="fas fa-chevron-right" />
            </Button>
          </Col>
        </Row>
      </Container>
    </form>
  )
}
