import { useSelectorProps } from '../../../props/useSelectorProps'
import portalTypeMaster from '../../../constants/masters/portalTypeMaster.json'
import portalSubTypeMaster from '../../../constants/masters/portalSubTypeMaster.json'
import portalStatusMaster from '../../../constants/masters/portalStatusMaster.json'
import { Col } from 'react-grid-system'
import Select from '../../../components/commons/select'
import Input from '../../../components/commons/input'
import ButtonWrapper from '../../../components/commons/button'

interface SearchStaffProps {
  user: useSelectorProps['user']
  handleOnClickSearch: () => void
  handleOnClearSearch: () => void
  inpartners: any
  partnerID: string | number
  setPartnerID: (partnerID: string | number) => void
  query: string | string[]
  setQuery: (query: string | string[]) => void
  status: string | string[]
  setStatus: (status: string | string[]) => void
  subType: string | string[]
  setSubType: (subType: string | string[]) => void
}

export const SearchStaff = ({
  user,
  handleOnClickSearch,
  handleOnClearSearch,
  inpartners,
  partnerID,
  setPartnerID,
  query,
  setQuery,
  status,
  setStatus,
  subType,
  setSubType
}: SearchStaffProps) => {
  return (
    <>
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
            placeholder="Search by Name, Username, PhoneNo or Email"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </Col>
      )}
      <Col lg={2}>
        <Select
          icon="fas fa-bars"
          onChange={(e) => setSubType(e.target.value)}
          value={subType}
        >
          <option value="">All Role</option>
          {Object.keys(portalSubTypeMaster).map((_subType, index) => {
            return (
              <option value={portalSubTypeMaster[_subType].value} key={index}>
                {portalSubTypeMaster[_subType].label}
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
          {Object.keys(portalStatusMaster).map((_status, index) => {
            return (
              <option value={portalStatusMaster[_status].value} key={index}>
                {portalStatusMaster[_status].label}
              </option>
            )
          })}
        </Select>
      </Col>
      <Col lg={1}>
        <ButtonWrapper $primary onClick={handleOnClickSearch}>
          <i className="fas fa-search" />
          Search
        </ButtonWrapper>
      </Col>
      <Col lg={1}>
        <ButtonWrapper $danger onClick={handleOnClearSearch}>
          <i className="fas fa-ban" />
          Clear
        </ButtonWrapper>
      </Col>
    </>
  )
}
