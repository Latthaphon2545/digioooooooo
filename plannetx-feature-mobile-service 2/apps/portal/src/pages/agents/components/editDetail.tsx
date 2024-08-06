import React, { FormEvent } from 'react'
import { AgentInfoProps } from '../../../props/agentInfoProps'
import { Col, Container, Row } from 'react-grid-system'
import Input from '../../../components/commons/input'
import SubSection from '../../../components/commons/subSection'
import { useState } from 'react'
import Select from '../../../components/commons/select'
import Button from '../../../components/commons/button'

type EditDetailProps = {
  agentInfo: AgentInfoProps
  isFormSubmitting: boolean
  handleOnClickCancel: () => void
  handleOnSubmitEditForm: ({
    e,
    agentInfoUpdated
  }: {
    e: FormEvent<HTMLFormElement>
    agentInfoUpdated: {
      username: string
      firstnameEN: string
      lastnameEN: string
      firstnameTH: string
      lastnameTH: string
      citizenId: string
      passport: string
      branchId: string
    }
  }) => void
}

export default function EditDetail({
  agentInfo,
  isFormSubmitting,
  handleOnClickCancel,
  handleOnSubmitEditForm
}: EditDetailProps) {
  const [usernameInput, setUsernameInput] = useState(agentInfo.username)
  const [firstnameENInput, setFirstnameENInput] = useState(
    agentInfo.firstnameEN
  )
  const [lastnameENInput, setLastnameENInput] = useState(agentInfo.lastnameEN)
  const [firstnameTHInput, setFirstnameTHInput] = useState(
    agentInfo.firstnameTH
  )
  const [lastnameTHInput, setLastnameTHInput] = useState(agentInfo.lastnameTH)
  const [citizenIdInput, setCitizenIdInput] = useState(agentInfo.citizenId)
  const [passportInput, setPassportInput] = useState(agentInfo.passport)
  const [branchIdInput, setBranchIdInput] = useState(agentInfo.branchId)

  const agentInfoUpdated = {
    username: usernameInput,
    firstnameEN: firstnameENInput,
    lastnameEN: lastnameENInput,
    firstnameTH: firstnameTHInput,
    lastnameTH: lastnameTHInput,
    citizenId: citizenIdInput,
    passport: passportInput,
    branchId: branchIdInput
  }

  return (
    <form onSubmit={(e) => handleOnSubmitEditForm({ e, agentInfoUpdated })}>
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
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                disabled={true}
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
                value={firstnameENInput}
                onChange={(e) => setFirstnameENInput(e.target.value)}
                required={true}
              />
            </Col>
            <Col sm={6}>
              <Input
                icon="fas fa-id-card"
                type="text"
                placeholder="Lastname [EN]"
                maxLength={100}
                value={lastnameENInput}
                onChange={(e) => setLastnameENInput(e.target.value)}
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
                value={firstnameTHInput}
                onChange={(e) => setFirstnameTHInput(e.target.value)}
                required={true}
              />
            </Col>
            <Col sm={6}>
              <Input
                icon="fas fa-id-card"
                type="text"
                placeholder="Lastname [TH]"
                maxLength={100}
                value={lastnameTHInput}
                onChange={(e) => setLastnameTHInput(e.target.value)}
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
                value={citizenIdInput}
                onChange={(e) =>
                  setCitizenIdInput(e.target.value.replace(/[^0-9]/, ''))
                }
                required={passportInput === ''}
              />
            </Col>
          </Row>
          <Row style={{ margin: '10px -10px' }}>
            <Col xs={12}>
              <Input
                icon="fas fa-passport"
                type="text"
                name="passport"
                minLength={6}
                maxLength={12}
                placeholder="Passport"
                value={passportInput}
                onChange={(e) =>
                  setPassportInput(e.target.value.replace(/[^0-9a-zA-Z]/, ''))
                }
                required={citizenIdInput === ''}
              />
            </Col>
          </Row>
        </Container>
      </SubSection>
      <SubSection title="Branch">
        <Container fluid>
          <Row style={{ margin: '0px -10px' }}>
            <Col sm={12}>
              <Select
                icon="fas fa-code-branch"
                value={branchIdInput}
                onChange={(e) => setBranchIdInput(e.target.value)}
                //disabled={true}
              >
                <option value={branchIdInput}>{agentInfo.branchNameEN}</option>
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
      </SubSection>
    </form>
  )
}
