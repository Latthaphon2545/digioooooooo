import { Col, Container, Row } from 'react-grid-system'
import Button from '../../../components/commons/button'
import Input from '../../../components/commons/input'
import Section from '../../../components/commons/section'
import Select from '../../../components/commons/select'
import SubSection from '../../../components/commons/subSection'
import Title from '../../../components/commons/title'
import portalTypeMaster from '../../../constants/masters/portalTypeMaster.json'
import userSubTypeMaster from '../../../constants/masters/userSubTypeMaster.json'
import { useSelectorProps } from '../../../props/useSelectorProps'
import { useState } from 'react'
import { MerchantInfoProps } from '../../../props/merchantInfoProps'

interface CreateMerchantProps {
  user: useSelectorProps['user']
  handleOnSubmitCreate: (e: React.FormEvent<HTMLFormElement>) => void
  handleFetchInbranches: (partnerId: string) => void
  inpartners: any[]
  inbranches: any[]
  inagents: any[]
  setMerchantInfo: (merchantInfo: MerchantInfoProps) => void
  agentId: string
  setAgentId: (agentId: string) => void
}

export const CreateMerchant = ({
  user,
  handleOnSubmitCreate,
  handleFetchInbranches,
  inpartners,
  inbranches,
  inagents,
  setMerchantInfo,
  agentId,
  setAgentId
}: CreateMerchantProps) => {
  const [partnerId, setPartnerId] = useState<number>(0)
  const [branchId, setBranchId] = useState<number>(0)
  const [username, setUsername] = useState<string>('')
  const [mid, setMid] = useState<string>('')
  const [subType, setSubType] = useState(userSubTypeMaster.CORPORATION.value)
  const [firstnameEN, setFirstnameEN] = useState<string>('')
  const [lastnameEN, setLastnameEN] = useState<string>('')
  const [firstnameTH, setFirstnameTH] = useState<string>('')
  const [lastnameTH, setLastnameTH] = useState<string>('')
  const [taxId, setTaxId] = useState<string>('')
  const [citizenId, setCitizenId] = useState<string>('')
  const [passport, setPassport] = useState<string>('')
  const [phoneNo, setPhoneNo] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [settleTime, setSettleTime] = useState<string>('15:00')

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const ubdateMerchart = {
      username,
      mid,
      subType,
      firstnameTH,
      lastnameTH,
      firstnameEN,
      lastnameEN,
      taxId,
      citizenId,
      passport,
      phoneNo,
      email,
      settleTime
    }
    setMerchantInfo(ubdateMerchart)
    handleOnSubmitCreate(e)
  }

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
            <form onSubmit={handleOnSubmit}>
              {user && user.type === portalTypeMaster.DIGIO ? (
                <SubSection
                  title="Partner"
                  style={{ margin: '0px 0px 10px 0px' }}
                >
                  <Select
                    icon="fas fa-handshake"
                    onChange={(e) => {
                      setPartnerId(Number(e.target.value))
                      handleFetchInbranches(e.target.value)
                      if (inbranches.length > 0) {
                        setBranchId(0)
                      } else {
                        setBranchId(1)
                      }
                    }}
                    required={true}
                  >
                    {inpartners.map((inpartner, index) => {
                      return (
                        <option
                          value={inpartner.id}
                          selected={inpartner.id === partnerId}
                          key={index}
                        >
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
                          setUsername(
                            e.target.value.replace(/[^a-z0-9\-_]/, '')
                          )
                        }
                        required={true}
                      />
                    </Col>
                  </Row>
                  <Row style={{ margin: '10px -10px 0px -10px' }}>
                    <Col xs={12}>
                      <Input
                        icon="fas fa-tag"
                        type="text"
                        placeholder="MID"
                        minLength={5}
                        maxLength={15}
                        value={mid}
                        onChange={(e) =>
                          setMid(e.target.value.replace(/[^0-9]/, ''))
                        }
                        required={true}
                      />
                    </Col>
                  </Row>
                  <Row style={{ margin: '10px -10px 0px -10px' }}>
                    <Col xs={12}>
                      <Select
                        icon="fas fa-bars"
                        onChange={(e) => setSubType(e.target.value)}
                        required={true}
                      >
                        <option value={userSubTypeMaster.CORPORATION.value}>
                          {userSubTypeMaster.CORPORATION.label}
                        </option>
                        <option value={userSubTypeMaster.INDIVIDUAL.value}>
                          {userSubTypeMaster.INDIVIDUAL.label}
                        </option>
                      </Select>
                    </Col>
                  </Row>
                  {(() => {
                    if (subType === userSubTypeMaster.CORPORATION.value) {
                      return (
                        <>
                          <Row style={{ margin: '10px -10px 0px -10px' }}>
                            <Col sm={12}>
                              <Input
                                icon="fas fa-id-card"
                                type="text"
                                placeholder="Name [EN]"
                                maxLength={100}
                                value={firstnameEN}
                                onChange={(e) => setFirstnameEN(e.target.value)}
                                required={true}
                              />
                            </Col>
                          </Row>
                          <Row style={{ margin: '10px -10px 0px -10px' }}>
                            <Col sm={12}>
                              <Input
                                icon="fas fa-id-card"
                                type="text"
                                placeholder="Name [TH]"
                                maxLength={100}
                                value={firstnameTH}
                                onChange={(e) => setFirstnameTH(e.target.value)}
                                required={true}
                              />
                            </Col>
                          </Row>
                          <Row style={{ margin: '10px -10px' }}>
                            <Col xs={12}>
                              <Input
                                icon="fas fa-bars"
                                type="text"
                                name="tax-id"
                                minLength={13}
                                maxLength={13}
                                placeholder="Tax ID"
                                value={taxId}
                                onChange={(e) =>
                                  setTaxId(e.target.value.replace(/[^0-9]/, ''))
                                }
                                required={true}
                              />
                            </Col>
                          </Row>
                        </>
                      )
                    } else if (subType === userSubTypeMaster.INDIVIDUAL.value) {
                      return (
                        <>
                          <Row style={{ margin: '10px -10px 0px -10px' }}>
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
                                  setLastnameEN(
                                    e.target.value.replace(/[^a-zA-Z]/, '')
                                  )
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
                                  setFirstnameTH(
                                    e.target.value.replace(/[^ก-๛]/, '')
                                  )
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
                                  setLastnameTH(
                                    e.target.value.replace(/[^ก-๛]/, '')
                                  )
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
                                  setCitizenId(
                                    e.target.value.replace(/[^0-9]/, '')
                                  )
                                }
                                required={passport === ''}
                              />
                            </Col>
                          </Row>
                          <Row style={{ margin: '10px -10px 0px -10px' }}>
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
                                  setPassport(
                                    e.target.value.replace(/[^0-9a-zA-Z]/, '')
                                  )
                                }
                                required={citizenId === ''}
                              />
                            </Col>
                          </Row>
                        </>
                      )
                    }
                  })()}
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
                      {inbranches.length === 0 ? (
                        <Select
                          icon="fas fa-code-branch"
                          disabled={true}
                          onChange={() => {}}
                        >
                          <option value="">No branch</option>
                        </Select>
                      ) : (
                        <Select
                          icon="fas fa-code-branch"
                          onChange={(e) => {
                            const branchId = Number(e.target.value)
                            const _inagents = inagents.filter(
                              (inagent) => inagent.branch_id === branchId
                            )
                            setBranchId(branchId)
                            setAgentId(
                              _inagents.length > 0 ? _inagents[0].id : ''
                            )
                          }}
                        >
                          {inbranches.map((branch, index) => {
                            return (
                              <option
                                value={branch.id}
                                selected={branch.id === branchId}
                                key={index}
                              >
                                {branch.name_en}
                              </option>
                            )
                          })}
                        </Select>
                      )}
                    </Col>
                  </Row>
                </Container>
              </SubSection>
              <SubSection title="Settlement" style={{ margin: '10px 0px' }}>
                <Container fluid>
                  <Row style={{ margin: '0px -10px' }}>
                    <Col sm={12}>
                      <Select
                        icon="fas fa-clock"
                        onChange={(e) => setSettleTime(e.target.value)}
                      >
                        <option value="15:00">15:00</option>
                        <option value="16:00">16:00</option>
                        <option value="17:00">17:00</option>
                        <option value="18:00">18:00</option>
                        <option value="19:00">19:00</option>
                        <option value="20:00">20:00</option>
                        <option value="21:00">21:00</option>
                        <option value="22:00">22:00</option>
                        <option value="23:00">23:00</option>
                      </Select>
                    </Col>
                  </Row>
                  <Row style={{ margin: '10px -10px 0px -10px' }}>
                    <Col sm={12}>
                      {inagents.length === 0 ? (
                        <Select
                          icon="fas fa-user"
                          disabled={true}
                          onChange={() => {}}
                        >
                          <option value="">No agent</option>
                        </Select>
                      ) : (
                        <Select
                          icon="fas fa-user"
                          onChange={(e) => setAgentId(e.target.value)}
                        >
                          {inagents.filter(
                            (inagent) => inagent.branch_id === branchId
                          ).length > 0 ? (
                            inagents
                              .filter(
                                (inagent) => inagent.branch_id === branchId
                              )
                              .map((inagent, index) => (
                                <option
                                  value={inagent.id}
                                  selected={inagent.id === agentId}
                                  key={index}
                                >
                                  {inagent.firstname_en} {inagent.lastname_en}
                                </option>
                              ))
                          ) : (
                            <option
                              disabled
                              value="No agents available for this branch"
                              selected
                              key="0"
                            >
                              No agents
                            </option>
                          )}
                        </Select>
                      )}
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
          </Section>
        </Col>
      </Row>
    </Container>
  )
}
