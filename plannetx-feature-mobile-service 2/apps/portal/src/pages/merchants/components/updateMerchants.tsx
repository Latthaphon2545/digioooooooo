import { Col, Container, Row } from 'react-grid-system'
import Button from '../../../components/commons/button'
import Input from '../../../components/commons/input'
import Section from '../../../components/commons/section'
import Select from '../../../components/commons/select'
import SubSection from '../../../components/commons/subSection'
import Title from '../../../components/commons/title'
import agentStatusMaster from '../../../constants/masters/agentStatusMaster.json'
import userSubTypeMaster from '../../../constants/masters/userSubTypeMaster.json'
import { useState } from 'react'
import { MerchantInfoProps } from '../../../props/merchantInfoProps'

interface MerchantUpdatefoProps {
  merchantInfo: MerchantInfoProps
  handleOnSubmitEditForm: ({
    e,
    merchantInfoUpdate
  }: {
    e: React.FormEvent<HTMLFormElement>
    merchantInfoUpdate: MerchantInfoProps
  }) => void
  branchId: string
  branchNameEN: string
  inagents: any[]
  handleOnClickCancel: () => void
  isFormSubmitting: boolean
}

export const UpdateMerchants = ({
  merchantInfo,
  handleOnSubmitEditForm,
  branchId,
  branchNameEN,
  inagents,
  handleOnClickCancel,
  isFormSubmitting
}: MerchantUpdatefoProps) => {
  const [username, setUsername] = useState(merchantInfo.username)
  const [mid, setMid] = useState(merchantInfo.mid)
  const [subType, setSubType] = useState(merchantInfo.subType)
  const [firstnameEN, setFirstnameEN] = useState(merchantInfo.firstnameEN)
  const [lastnameEN, setLastnameEN] = useState(merchantInfo.lastnameEN)
  const [firstnameTH, setFirstnameTH] = useState(merchantInfo.firstnameTH)
  const [lastnameTH, setLastnameTH] = useState(merchantInfo.lastnameTH)
  const [taxId, setTaxId] = useState(merchantInfo.taxId)
  const [citizenId, setCitizenId] = useState(merchantInfo.citizenId)
  const [passport, setPassport] = useState(merchantInfo.passport)
  const [phoneNo, setPhoneNo] = useState(merchantInfo.phoneNo)
  const [email, setEmail] = useState(merchantInfo.email)
  const [settleTime, setSettleTime] = useState(merchantInfo.settleTime)
  const [agentId, setAgentId] = useState(merchantInfo.agentId)

  const merchantInfoUpdate = {
    mid,
    subType,
    firstnameEN,
    lastnameEN,
    firstnameTH,
    lastnameTH,
    taxId,
    citizenId,
    passport,
    phoneNo,
    email,
    settleTime,
    agentId
  }

  return (
    <Container fluid>
      <Row style={{ margin: '0px -10px' }}>
        <Col sm={6}>
          <Title>Edit Merchant</Title>
        </Col>
      </Row>
      <Row style={{ margin: '10px -10px 0px -10px' }}>
        <Col lg={7}>
          <Section title="Detail">
            <form
              onSubmit={(e) =>
                handleOnSubmitEditForm({ e, merchantInfoUpdate })
              }
            >
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
                        onChange={(e) => setUsername(e.target.value)}
                        disabled={true}
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
                          <Row style={{ margin: '10px -10px 0px -10px' }}>
                            <Col xs={12}>
                              <Input
                                icon="fas fa-id-card"
                                type="text"
                                name="citizen-id"
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
                                onChange={(e) => setFirstnameEN(e.target.value)}
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
                                onChange={(e) => setLastnameEN(e.target.value)}
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
                                onChange={(e) => setFirstnameTH(e.target.value)}
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
                                onChange={(e) => setLastnameTH(e.target.value)}
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
                                placeholder="CitizenID"
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
                        onChange={(e) => setPhoneNo(e.target.value)}
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
              <SubSection title="Branch" style={{ margin: '10px 0px 0px 0px' }}>
                <Container fluid>
                  <Row style={{ margin: '0px -10px' }}>
                    <Col sm={12}>
                      <Select
                        icon="fas fa-code-branch"
                        value={branchId}
                        disabled={true}
                        onChange={() => {}}
                      >
                        <option value={branchId}>{branchNameEN}</option>
                      </Select>
                    </Col>
                  </Row>
                </Container>
              </SubSection>
              <SubSection
                title="Settlement"
                style={{ margin: '10px 0px 0px 0px' }}
              >
                <Container fluid>
                  <Row style={{ margin: '0px -10px' }}>
                    <Col sm={12}>
                      <Select
                        icon="fas fa-clock"
                        onChange={(e) => setSettleTime(e.target.value)}
                      >
                        <option value="15:00" selected={settleTime === '15:00'}>
                          15:00
                        </option>
                        <option value="16:00" selected={settleTime === '16:00'}>
                          16:00
                        </option>
                        <option value="17:00" selected={settleTime === '17:00'}>
                          17:00
                        </option>
                        <option value="18:00" selected={settleTime === '18:00'}>
                          18:00
                        </option>
                        <option value="19:00" selected={settleTime === '19:00'}>
                          19:00
                        </option>
                        <option value="20:00" selected={settleTime === '20:00'}>
                          20:00
                        </option>
                        <option value="21:00" selected={settleTime === '21:00'}>
                          21:00
                        </option>
                        <option value="22:00" selected={settleTime === '22:00'}>
                          22:00
                        </option>
                        <option value="23:00" selected={settleTime === '23:00'}>
                          23:00
                        </option>
                      </Select>
                    </Col>
                  </Row>
                  <Row style={{ margin: '10px -10px 0px -10px' }}>
                    <Col sm={12}>
                      <Select
                        icon="fas fa-user"
                        onChange={(e) => setAgentId(e.target.value)}
                      >
                        {inagents
                          .filter((inagent) => {
                            return (
                              inagent.id === merchantInfo.settleToAgentId ||
                              inagent.status ===
                                agentStatusMaster.VERIFIED.value
                            )
                          })
                          .map((inagent, index) => {
                            return (
                              <option
                                value={inagent.id}
                                selected={inagent.id === agentId}
                                key={index}
                              >
                                {inagent.firstname_en} {inagent.lastname_en}
                              </option>
                            )
                          })}
                      </Select>
                    </Col>
                  </Row>
                </Container>
              </SubSection>
              <Container style={{ margin: '10px -10px 0px -10px' }} fluid>
                <Row>
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
                    <Button $primary type="submit" disabled={isFormSubmitting}>
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
            </form>
          </Section>
        </Col>
      </Row>
    </Container>
  )
}
