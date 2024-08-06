import { Col, Container, Row } from 'react-grid-system'
import { FormEvent, useState } from 'react'
import Button from '../../../components/commons/button'
import Section from '../../../components/commons/section'
import Title from '../../../components/commons/title'
import SectionWrapper from '../../../components/commons/section'
import Input from '../../../components/commons/input'
import Select from '../../../components/commons/select'
import bankMaster from '../../../constants/masters/bankMaster.json'
import userSubTypeMaster from '../../../constants/masters/userSubTypeMaster.json'
import userGenderFieldMaster from '../../../constants/masters/userGenderMaster.json'
import { UserInfoProps } from '../../../props/userInfoProps'

interface UpdatedUserProps {
  userInfo: UserInfoProps

  isFormSubmitting: boolean
  handleOnSubmitForm: ({
    e,
    userUpdateInfo
  }: {
    e: FormEvent<HTMLFormElement>
    userUpdateInfo: UserInfoProps
  }) => void
  handleOnClickCancel: () => void
}

export const UpdatedUser = ({
  userInfo,
  isFormSubmitting,
  handleOnSubmitForm,
  handleOnClickCancel
}: UpdatedUserProps) => {
  const [firstnameTHField, setFirstnameTHField] = useState(userInfo.firstnameTH)
  const [lastnameTHField, setLastnameTHField] = useState(userInfo.lastnameTH)
  const [firstnameENField, setFirstnameENField] = useState(userInfo.firstnameEN)
  const [lastnameENField, setLastnameENField] = useState(userInfo.lastnameEN)
  const [phoneNoField, setPhoneNoField] = useState(userInfo.phoneNo.toString())
  const [emailField, setEmailField] = useState(userInfo.email)
  const [taxIdField, setTaxIdField] = useState(userInfo.taxId)
  const [citizenIdField, setCitizenIdField] = useState(userInfo.citizenId)
  const [passportField, setPassportField] = useState(userInfo.passport)
  const [birthdateField, setBirthdateField] = useState(userInfo.birthdate)
  const [genderField, setGenderField] = useState(userInfo.gender)
  const [bankField, setBankField] = useState(userInfo.bank)
  const [bankBranchField, setBankBranchField] = useState(userInfo.bankBranch)
  const [bankAccountNumberField, setBankAccountNumberField] = useState(
    userInfo.bankAccountNumber
  )
  const [bankAccountNameField, setBankAccountNameField] = useState(
    userInfo.bankAccountName
  )

  const userUpdateInfo = {
    firstnameEN: firstnameENField,
    lastnameEN: lastnameENField,
    firstnameTH: firstnameTHField,
    lastnameTH: lastnameTHField,
    taxId: taxIdField,
    citizenId: citizenIdField,
    passport: passportField,
    birthdate: birthdateField,
    gender: genderField,
    phoneNo: parseInt(phoneNoField),
    email: emailField,
    bank: bankField,
    bankBranch: bankBranchField,
    bankAccountNumber: bankAccountNumberField,
    bankAccountName: bankAccountNameField
  }

  return (
    <Container fluid>
      <Row style={{ margin: '0px -10px' }}>
        <Col sm={12}>
          <Title>Edit User</Title>
        </Col>
      </Row>
      <Row style={{ margin: '10px -10px 0px -10px' }}>
        <Col xs={6}>
          <Section title="Detail">
            <form onSubmit={(e) => handleOnSubmitForm({ e, userUpdateInfo })}>
              <Container fluid>
                <Row style={{ margin: '0px -10px' }}>
                  <Col xs={12}>
                    <SectionWrapper title="User">
                      <Container fluid>
                        <Row style={{ margin: '0px -10px' }}>
                          {userInfo.subType ===
                          userSubTypeMaster.CORPORATION.value ? (
                            <>
                              <Col sm={12}>
                                <Input
                                  icon="fas fa-user-tag"
                                  type="text"
                                  placeholder="Name (EN)"
                                  value={firstnameENField}
                                  onChange={(e) => {
                                    setFirstnameENField(e.target.value)
                                  }}
                                  required={true}
                                />
                              </Col>
                            </>
                          ) : (
                            <>
                              <Col sm={6}>
                                <Input
                                  icon="fas fa-user-tag"
                                  type="text"
                                  placeholder="Firstname (EN)"
                                  value={firstnameENField}
                                  onChange={(e) =>
                                    setFirstnameENField(e.target.value)
                                  }
                                  required={true}
                                />
                              </Col>
                              <Col sm={6}>
                                <Input
                                  type="text"
                                  placeholder="Lastname (EN)"
                                  value={lastnameENField}
                                  onChange={(e) =>
                                    setLastnameENField(e.target.value)
                                  }
                                />
                              </Col>
                            </>
                          )}
                        </Row>
                        <Row style={{ margin: '10px -10px 0px -10px' }}>
                          {userInfo.subType ===
                          userSubTypeMaster.CORPORATION.value ? (
                            <>
                              <Col sm={12}>
                                <Input
                                  icon="fas fa-user-tag"
                                  type="text"
                                  placeholder="Name (TH)"
                                  value={firstnameTHField}
                                  onChange={(e) =>
                                    setFirstnameTHField(e.target.value)
                                  }
                                />
                              </Col>
                            </>
                          ) : (
                            <>
                              <Col sm={6}>
                                <Input
                                  icon="fas fa-user-tag"
                                  type="text"
                                  placeholder="Firstname (TH)"
                                  value={firstnameTHField}
                                  onChange={(e) =>
                                    setFirstnameTHField(e.target.value)
                                  }
                                />
                              </Col>
                              <Col sm={6}>
                                <Input
                                  type="text"
                                  placeholder="Lastname (TH)"
                                  value={lastnameTHField}
                                  onChange={(e) =>
                                    setLastnameTHField(e.target.value)
                                  }
                                />
                              </Col>
                            </>
                          )}
                        </Row>
                        {userInfo.subType ===
                        userSubTypeMaster.CORPORATION.value ? (
                          <>
                            <Row
                              style={{
                                margin: '10px -10px 0px -10px'
                              }}
                            >
                              <Col xs={12}>
                                <Input
                                  icon="fas fa-tag"
                                  type="text"
                                  minLength={13}
                                  maxLength={13}
                                  placeholder="Tax ID"
                                  value={taxIdField}
                                  onChange={(e) =>
                                    setTaxIdField(
                                      e.target.value.replace(/[^0-9]/, '')
                                    )
                                  }
                                  required={true}
                                />
                              </Col>
                            </Row>
                          </>
                        ) : (
                          <>
                            <Row style={{ margin: '10px -10px' }}>
                              <Col xs={12}>
                                <Input
                                  icon="fas fa-id-card"
                                  type="text"
                                  name="citizen-id"
                                  minLength={13}
                                  maxLength={13}
                                  placeholder="Citizen ID"
                                  value={citizenIdField}
                                  onChange={(e) =>
                                    setCitizenIdField(
                                      e.target.value.replace(/[^0-9]/, '')
                                    )
                                  }
                                />
                              </Col>
                            </Row>
                            <Row style={{ margin: '10px -10px' }}>
                              <Col xs={12}>
                                <Input
                                  icon="fas fa-passportField"
                                  type="text"
                                  name="passportField"
                                  minLength={6}
                                  maxLength={12}
                                  placeholder="PassportField"
                                  value={passportField}
                                  onChange={(e) =>
                                    setPassportField(
                                      e.target.value.replace(/[^0-9a-zA-Z]/, '')
                                    )
                                  }
                                />
                              </Col>
                            </Row>
                            <Row
                              style={{
                                margin: '10px -10px 0px -10px'
                              }}
                            >
                              <Col xs={12}>
                                <Input
                                  icon="fas fa-birthday-cake"
                                  type="date"
                                  placeholder="BirthdateField"
                                  value={birthdateField}
                                  onChange={(e) =>
                                    setBirthdateField(e.target.value)
                                  }
                                />
                              </Col>
                            </Row>
                            <Row
                              style={{
                                margin: '10px -10px 0px -10px'
                              }}
                            >
                              <Col xs={12}>
                                <Select
                                  icon="fas fa-venus-mars"
                                  onChange={(e) =>
                                    setGenderField(e.target.value)
                                  }
                                  value={genderField}
                                >
                                  {Object.keys(userGenderFieldMaster).map(
                                    (_genderField, index) => {
                                      return (
                                        <option
                                          value={
                                            userGenderFieldMaster[_genderField]
                                              .value
                                          }
                                          key={index}
                                        >
                                          {
                                            userGenderFieldMaster[_genderField]
                                              .label
                                          }
                                        </option>
                                      )
                                    }
                                  )}
                                </Select>
                              </Col>
                            </Row>
                          </>
                        )}
                      </Container>
                    </SectionWrapper>
                  </Col>
                </Row>
                <Row style={{ margin: '20px -10px 10px -10px' }}>
                  <Col xs={12}>
                    <SectionWrapper title="Contact">
                      <Container fluid>
                        <Row style={{ margin: '0px -10px' }}>
                          <Col xs={12}>
                            <Input
                              icon="fas fa-phone"
                              type="text"
                              minLength={9}
                              maxLength={10}
                              placeholder="Phone No"
                              value={phoneNoField}
                              onChange={(e) =>
                                setPhoneNoField(
                                  e.target.value.replace(/[^0-9]/, '')
                                )
                              }
                              required={true}
                            />
                          </Col>
                        </Row>
                        <Row style={{ margin: '10px -10px 0px -10px' }}>
                          <Col xs={12}>
                            <Input
                              icon="fas fa-envelope"
                              type="text"
                              placeholder="EmailField"
                              value={emailField}
                              onChange={(e) => setEmailField(e.target.value)}
                            />
                          </Col>
                        </Row>
                      </Container>
                    </SectionWrapper>
                  </Col>
                </Row>
                <Row style={{ margin: '20px -10px 0px -10px' }}>
                  <Col xs={12}>
                    <SectionWrapper title="Bank Account">
                      <Container fluid>
                        <Row style={{ margin: '0px -10px' }}>
                          <Col xs={12}>
                            <Select
                              icon="fas fa-university"
                              onChange={(e) => setBankField(e.target.value)}
                              value={userInfo.bank}
                            >
                              <option value="">None</option>
                              {Object.keys(bankMaster).map((_bank, index) => {
                                return (
                                  <option
                                    value={bankMaster[_bank].value}
                                    key={index}
                                  >
                                    {bankMaster[_bank].label}
                                  </option>
                                )
                              })}
                            </Select>
                          </Col>
                        </Row>
                        <Row style={{ margin: '10px -10px 0px -10px' }}>
                          <Col xs={12}>
                            <Input
                              type="text"
                              maxLength={255}
                              placeholder="Bank Branch"
                              value={bankBranchField}
                              onChange={(e) =>
                                setBankBranchField(e.target.value)
                              }
                            />
                          </Col>
                        </Row>
                        <Row style={{ margin: '10px -10px 0px -10px' }}>
                          <Col xs={12}>
                            <Input
                              type="text"
                              minLength={10}
                              maxLength={12}
                              placeholder="Bank Account Number"
                              value={bankAccountNumberField}
                              onChange={(e) =>
                                setBankAccountNumberField(
                                  e.target.value.replace(/[^0-9]/, '')
                                )
                              }
                            />
                          </Col>
                        </Row>
                        <Row style={{ margin: '10px -10px 0px -10px' }}>
                          <Col xs={12}>
                            <Input
                              type="text"
                              minLength={1}
                              maxLength={100}
                              placeholder="Bank Account Name"
                              value={bankAccountNameField}
                              onChange={(e) =>
                                setBankAccountNameField(e.target.value)
                              }
                            />
                          </Col>
                        </Row>
                      </Container>
                    </SectionWrapper>
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
            </form>
          </Section>
        </Col>
      </Row>
    </Container>
  )
}
