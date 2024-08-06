import { Col, Container, Row } from 'react-grid-system'
import Badge from '../../../components/commons/badge'
import Button from '../../../components/commons/button'
import Hr from '../../../components/commons/hr'
import Section from '../../../components/commons/section'
import Title from '../../../components/commons/title'
import portalStatusMaster from '../../../constants/masters/portalStatusMaster.json'
import { useSelectorProps } from '../../../props/useSelectorProps'
import { StaffInfoProps } from '../../../props/staffInfoProps'
import { RenderField } from '../../../utils/renderField'

interface DisplayStaffProps {
  staffInfo: StaffInfoProps
  isFetching: boolean
  username: string
  role: string
  recentLogin: string
  id_router: string | string[]
  user: useSelectorProps['user']
  handleOnClickResendActivate: () => void
  handleOnClickSuspend: () => void
  handleOnClickUnsuspend: () => void
  handleOnClickEdit: () => void
  permission: any
}

export const DisplayStaff = ({
  isFetching,
  username,
  role,
  recentLogin,
  id_router,
  user,
  staffInfo,
  handleOnClickResendActivate,
  handleOnClickSuspend,
  handleOnClickUnsuspend,
  handleOnClickEdit,
  permission
}: DisplayStaffProps) => {
  return (
    <Container fluid>
      <Row style={{ margin: '0px -10px' }}>
        <Col sm={6}>
          <Title>Staff</Title>
        </Col>
      </Row>
      <Row style={{ margin: '10px -10px 0px -10px' }}>
        <Col lg={7}>
          <Section title="Detail">
            <Container fluid={true}>
              <Row style={{ margin: '0px -10px' }}>
                <Col sm={12}>
                  <Container fluid={true}>
                    <Row style={{ margin: '0px -10px' }}>
                      <Col sm={6}>
                        <RenderField
                          label="Username"
                          value={username}
                          isFetching={isFetching}
                        />
                        <RenderField
                          label="Name [EN]"
                          value={
                            staffInfo.firstnameEN + ' ' + staffInfo.lastnameEN
                          }
                          isFetching={isFetching}
                        />
                        <RenderField
                          label="Name [TH]"
                          value={
                            staffInfo.firstnameTH + ' ' + staffInfo.lastnameTH
                          }
                          isFetching={isFetching}
                        />
                        <RenderField
                          label="Email"
                          value={staffInfo.email}
                          isFetching={isFetching}
                        />
                        <RenderField
                          label="Phone No"
                          value={staffInfo.phoneNo}
                          isFetching={isFetching}
                        />
                        <RenderField
                          label="Role"
                          value={role}
                          isFetching={isFetching}
                        />
                      </Col>
                      <Col sm={6}>
                        <RenderField
                          label="Role"
                          value={staffInfo.subType}
                          isFetching={isFetching}
                        />
                        <RenderField
                          label="Status"
                          value={
                            status && (
                              <Badge
                                width="80px;"
                                color={portalStatusMaster[status].color}
                                backgroundcolor={
                                  portalStatusMaster[status].backgroundColor
                                }
                              >
                                {portalStatusMaster[status].label}
                              </Badge>
                            )
                          }
                          isFetching={isFetching}
                        />
                        <RenderField
                          label="Recent Login"
                          value={recentLogin}
                          isFetching={isFetching}
                        />

                        <RenderField
                          label="Created At"
                          value={staffInfo.createdAt}
                          isFetching={isFetching}
                        />

                        <RenderField
                          label="Updated At"
                          value={staffInfo.updatedAt}
                          isFetching={isFetching}
                        />
                      </Col>
                    </Row>
                    {!isFetching && (
                      <>
                        <Row style={{ margin: '0px -10px' }}>
                          <Hr />
                        </Row>
                        <Row style={{ margin: '0px -10px' }}>
                          {(() => {
                            if (
                              Number(id_router) !== Number(user.id) &&
                              permission &&
                              permission.edit
                            ) {
                              switch (staffInfo.status) {
                                case portalStatusMaster.UNVERIFIED.value:
                                  return (
                                    <Col sm={6}>
                                      <Button
                                        primaryalt
                                        onClick={handleOnClickResendActivate}
                                      >
                                        <i className="fas fa-paper-plane" />
                                        Resend Activate
                                      </Button>
                                    </Col>
                                  )
                                case portalStatusMaster.VERIFIED.value:
                                  return (
                                    <Col sm={6}>
                                      <Button
                                        dangeralt
                                        onClick={handleOnClickSuspend}
                                      >
                                        <i className="fas fa-ban" />
                                        Suspend
                                      </Button>
                                    </Col>
                                  )
                                case portalStatusMaster.SUSPENDED.value:
                                  return (
                                    <Col sm={6}>
                                      <Button
                                        successalt
                                        onClick={handleOnClickUnsuspend}
                                      >
                                        <i className="far fa-check-circle" />
                                        Unsuspend
                                      </Button>
                                    </Col>
                                  )
                              }
                            }
                          })()}
                          {(() => {
                            if (
                              Number(id_router) !== Number(user.id) &&
                              permission &&
                              permission.edit
                            ) {
                              return (
                                <Col sm={6}>
                                  <Button
                                    $secondary
                                    onClick={handleOnClickEdit}
                                  >
                                    <i className="fas fa-user-edit" />
                                    Edit Staff
                                  </Button>
                                </Col>
                              )
                            }
                          })()}
                        </Row>
                      </>
                    )}
                  </Container>
                </Col>
              </Row>
            </Container>
          </Section>
        </Col>
      </Row>
    </Container>
  )
}
