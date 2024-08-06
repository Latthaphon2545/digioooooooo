import React from 'react'
import { Col, Container, Row } from 'react-grid-system'
import Select from '../../../components/commons/select'
import portalTypeMaster from '../../../constants/masters/portalTypeMaster.json'
import transactionTypeMaster from '../../../constants/masters/transactionTypeMaster.json'
import transactionSubTypeMaster from '../../../constants/masters/transactionSubTypeMaster.json'
import transactionStatusMaster from '../../../constants/masters/transactionStatusMaster.json'
import Button from '../../../components/commons/button'
import Input from '../../../components/commons/input'
import DatePickerRange from '../../../components/commons/datePickerRange'
import { useSelectorProps } from '../../../props/useSelectorProps'
import moment from 'moment'

type FilterRowProps = {
  user: useSelectorProps['user']
  partnerID: string
  setPartnerID: (partnerID: string) => void
  inpartners: any[]
  query: string | string[]
  setQuery: (query: string | string[]) => void
  type: string | string[]
  setType: (type: string | string[]) => void
  subType: string | string[]
  setSubType: (subType: string | string[]) => void
  startDate: moment.Moment | null
  setStartDate: (startDate: moment.Moment | null) => void
  endDate: moment.Moment | null
  setEndDate: (endDate: moment.Moment | null) => void
  status: string | string[]
  setStatus: (status: string) => void
  handleOnClickExport: () => void
  permission: any
  handleOnClickSearch: () => void
}

export default function FilterRow({
  user,
  partnerID,
  setPartnerID,
  inpartners,
  query,
  setQuery,
  type,
  setType,
  subType,
  setSubType,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  status,
  setStatus,
  handleOnClickExport,
  permission,
  handleOnClickSearch
}: FilterRowProps) {
  return (
    <Row style={{ margin: '10px -10px 0px -10px' }}>
      <Col lg={10}>
        <Container fluid>
          <Row style={{ margin: '0px -10px' }}>
            {user && user.type === portalTypeMaster.DIGIO ? (
              <>
                <Col lg={2}>
                  <Select
                    icon="fas fa-handshake"
                    onChange={(e) => setPartnerID(String(e.target.value))}
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
                <Col lg={5}>
                  <Input
                    type="text"
                    icon="fas fa-search"
                    placeholder="Search by Reference No, Order ID, Payer, Payee or Batch No"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </Col>
              </>
            ) : (
              <Col lg={7}>
                <Input
                  type="text"
                  icon="fas fa-search"
                  placeholder="Search by Reference No, Order ID, Payer, Payee or Batch No"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </Col>
            )}
            <Col lg={2}>
              <Select
                icon="fas fa-bars"
                onChange={(e) => setType(e.target.value)}
                value={type}
              >
                <option value="">All Type</option>
                {Object.keys(transactionTypeMaster).map((_type, index) => {
                  return (
                    <option
                      value={transactionTypeMaster[_type].value}
                      key={index}
                    >
                      {transactionTypeMaster[_type].label}
                    </option>
                  )
                })}
              </Select>
            </Col>
            <Col lg={3}>
              <Select
                icon="fas fa-bars"
                onChange={(e) => setSubType(e.target.value)}
                value={subType}
              >
                <option value="">All Sub Type</option>
                {Object.keys(transactionSubTypeMaster).map(
                  (_subType, index) => {
                    return (
                      <option
                        value={transactionSubTypeMaster[_subType].value}
                        key={index}
                      >
                        {transactionSubTypeMaster[_subType].label}
                      </option>
                    )
                  }
                )}
              </Select>
            </Col>
          </Row>
          <Row style={{ margin: '10px -10px 0px -10px' }}>
            <Col lg={7}>
              <DatePickerRange
                icon="fas fa-calendar"
                startDate={startDate}
                endDate={endDate}
                onDatesChange={({ startDate, endDate }) => {
                  if (startDate) setStartDate(startDate)
                  if (endDate) setEndDate(endDate)
                }}
              />
            </Col>
            <Col lg={5}>
              <Select
                icon="fas fa-bars"
                onChange={(e) => setStatus(e.target.value)}
                value={status}
              >
                <option value="">All Status</option>
                {Object.keys(transactionStatusMaster).map((_status, index) => {
                  return (
                    <option
                      value={transactionStatusMaster[_status].value}
                      key={index}
                    >
                      {transactionStatusMaster[_status].label}
                    </option>
                  )
                })}
              </Select>
            </Col>
          </Row>
        </Container>
      </Col>
      <Col lg={2}>
        <Container fluid>
          <Row style={{ margin: '0px -10px' }}>
            <Col xs={12}>
              <Button
                $secondary
                onClick={handleOnClickExport}
                hidden={permission && !permission.export}
              >
                <i className="fas fa-cloud-download-alt" />
                Export
              </Button>
            </Col>
          </Row>
          <Row style={{ margin: '10px -10px 0px -10px' }}>
            <Col xs={12}>
              <Button $primary onClick={handleOnClickSearch}>
                <i className="fas fa-search" />
                Search
              </Button>
            </Col>
          </Row>
        </Container>
      </Col>
    </Row>
  )
}
