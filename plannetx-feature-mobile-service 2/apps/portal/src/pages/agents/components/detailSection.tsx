import { Col, Container, Row } from 'react-grid-system'
import Label from '../../../components/commons/label'
import Section from '../../../components/commons/section'
import Badge from '../../../components/commons/badge'
import Skeleton from '../../../components/commons/skeleton'
import Button from '../../../components/commons/button'
import agentStatusMaster from '../../../constants/masters/agentStatusMaster.json'
import Hr from '../../../components/commons/hr'
import { AgentInfoProps } from '../../../props/agentInfoProps'

type DetailSectionProps = {
  isFetching: boolean
  agentInfo: AgentInfoProps
  permission: any
  handleOnClickSuspend: () => void
  handleOnClickUnsuspend: () => void
  handleOnClickEdit: () => void
}

export default function DetailSection({
  isFetching,
  agentInfo,
  permission,
  handleOnClickSuspend,
  handleOnClickUnsuspend,
  handleOnClickEdit
}: DetailSectionProps) {
  return (
    <Section title="Detail">
      <Container fluid={true}>
        <Row style={{ margin: '0px -10px' }}>
          <Col sm={12}>
            <Container fluid={true}>
              <Row style={{ margin: '0px -10px' }}>
                <Col sm={6}>
                  <Label>Username</Label>
                  {isFetching ? <Skeleton /> : agentInfo.username}
                  <Label>Name [EN]</Label>
                  {isFetching ? (
                    <Skeleton />
                  ) : (
                    agentInfo.firstnameEN + ' ' + agentInfo.lastnameEN
                  )}
                  <Label>Name [TH]</Label>
                  {isFetching ? (
                    <Skeleton />
                  ) : (
                    agentInfo.firstnameTH + ' ' + agentInfo.lastnameTH
                  )}
                  <Label>Phone No</Label>
                  {isFetching ? <Skeleton /> : agentInfo.phoneNo}
                  <Label>Email</Label>
                  {isFetching ? <Skeleton /> : agentInfo.email}
                  <Label>Created At</Label>
                  {isFetching ? <Skeleton /> : agentInfo.createdAt}
                </Col>
                <Col sm={6}>
                  <Label>Status</Label>
                  {isFetching ? (
                    <Skeleton />
                  ) : (
                    <Badge
                      width="80px;"
                      color={agentStatusMaster[agentInfo.status].color}
                      backgroundcolor={
                        agentStatusMaster[agentInfo.status].backgroundColor
                      }
                    >
                      {agentStatusMaster[agentInfo.status].label}
                    </Badge>
                  )}
                  <Label>Citizen ID</Label>
                  {isFetching ? <Skeleton /> : agentInfo.citizenId || '-'}
                  <Label>Passport</Label>
                  {isFetching ? <Skeleton /> : agentInfo.passport || '-'}
                  <Label>Branch</Label>
                  {isFetching ? <Skeleton /> : agentInfo.branchNameEN}
                  <Label>Updated At</Label>
                  {isFetching ? <Skeleton /> : agentInfo.updatedAt}
                </Col>
              </Row>
              {isFetching ? null : (
                <>
                  <Row style={{ margin: '0px -10px' }}>
                    <Hr />
                  </Row>
                  <Row style={{ margin: '0px -10px' }}>
                    {(() => {
                      if (permission && permission.edit) {
                        switch (agentInfo.status) {
                          case agentStatusMaster.VERIFIED.value:
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
                          case agentStatusMaster.SUSPENDED.value:
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
                      if (permission && permission.edit) {
                        return (
                          <Col sm={6}>
                            <Button $secondary onClick={handleOnClickEdit}>
                              <i className="fas fa-user-edit" />
                              Edit Agent
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
  )
}
