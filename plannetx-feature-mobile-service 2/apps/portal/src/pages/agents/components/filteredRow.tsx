import React, { FormEvent } from 'react'
import { Col, Container, Row } from 'react-grid-system'
import Input from '../../../components/commons/input'
import Select from '../../../components/commons/select'
import Button from '../../../components/commons/button'
import Title from '../../../components/commons/title'
import portalTypeMaster from '../../../constants/masters/portalTypeMaster.json'
import agentStatusMaster from '../../../constants/masters/agentStatusMaster.json'
import { useSelectorProps } from '../../../props/useSelectorProps'

type FilteredRowProps = {
  user: useSelectorProps['user']
  inpartners: any[]
  inbranches: any[]
  partnerID: string | number
  setPartnerID: (partnerID: string) => void
  query: string | string[]
  setQuery: (query: string) => void
  branchId: string | string[]
  setBranchId: (branchId: string) => void
  status: string | string[]
  setStatus: (status: string) => void
  handleOnClickSearch: () => void
  handleOnClickCreate: () => void
  permission: any
}

export default function FilteredRow({
  user,
  inpartners,
  inbranches,
  partnerID,
  setPartnerID,
  query,
  setQuery,
  branchId,
  setBranchId,
  status,
  setStatus,
  handleOnClickSearch,
  handleOnClickCreate,
  permission
}: FilteredRowProps) {
  return (
    <>
      <Row justify="between" style={{ margin: '0px -10px' }}>
        <Col sm={6}>
          <Title>Agents</Title>
        </Col>
        <Col sm={2}>
          <Button
            $secondary
            onClick={handleOnClickCreate}
            hidden={permission && !permission.create}
          >
            <i className="fas fa-plus" />
            Create
          </Button>
        </Col>
      </Row>
      <Row style={{ margin: '10px -10px 0px -10px' }}>
        {user && user.type === portalTypeMaster.DIGIO ? (
          <>
            <Col lg={2}>
              <Select
                icon="fas fa-handshake"
                onChange={(e) => setPartnerID(e.target.value)}
                value={partnerID}
              >
                <option value="">All Partner</option>
                {inpartners.map((inpartner, index) => {
                  return (
                    <option value={inpartner.id} key={index}>
                      {inpartner.name}
                    </option>
                  )
                })}
              </Select>
            </Col>
            <Col lg={4}>
              <Input
                type="text"
                icon="fas fa-search"
                placeholder="Search by Name, Username, PhoneNo or Email"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </Col>
          </>
        ) : (
          <Col lg={6}>
            <Input
              type="text"
              icon="fas fa-search"
              placeholder="Search by Username, Name, PhoneNo, Email or Citizen ID / Passport"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </Col>
        )}
        <Col lg={2}>
          <Select
            icon="fas fa-bars"
            onChange={(e) => setBranchId(e.target.value)}
            value={branchId}
          >
            <option value="">All Branch</option>
            {inbranches.map((branch, index) => {
              return (
                <option value={branch.id} key={index}>
                  {branch.name_en}
                </option>
              )
            })}
          </Select>
        </Col>
        <Col lg={2}>
          <Select
            icon="fas fa-bars"
            onChange={(e) => setStatus(e.target.value)}
            value={status}
          >
            <option value="">All Status</option>
            {Object.keys(agentStatusMaster).map((_status, index) => {
              return (
                <option value={agentStatusMaster[_status].value} key={index}>
                  {agentStatusMaster[_status].label}
                </option>
              )
            })}
          </Select>
        </Col>
        <Col lg={2}>
          <Button $primary onClick={handleOnClickSearch}>
            <i className="fas fa-search" />
            Search
          </Button>
        </Col>
      </Row>
    </>
  )
}
