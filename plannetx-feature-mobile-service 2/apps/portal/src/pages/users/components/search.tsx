import { useSelectorProps } from '../../../props/useSelectorProps'
import portalTypeMaster from '../../../constants/masters/portalTypeMaster.json'
import userStatusMaster from '../../../constants/masters/userStatusMaster.json'
import userSubTypeMaster from '../../../constants/masters/userSubTypeMaster.json'
import userTypeMaster from '../../../constants/masters/userTypeMaster.json'
import { Col } from 'react-grid-system'
import Select from '../../../components/commons/select'
import Input from '../../../components/commons/input'
import ButtonWrapper from '../../../components/commons/button'
import { SetStateAction } from 'react'

interface SearchUsersProps {
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
  setSubType: (subType: SetStateAction<string | string[]>) => void
  setType: (type: SetStateAction<string | string[]>) => void
}

export const SearchUsers = ({
  user,
  handleOnClickSearch,
  handleOnClearSearch,
  inpartners,
  partnerID,
  setPartnerID,
  query,
  setQuery,
  setStatus,
  status,
  subType,
  setSubType,
  setType
}: SearchUsersProps) => {
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
          <Col lg={2}>
            <Input
              typeof="text"
              icon="fas fa-search"
              placeholder="Search by UID, Name, PhoneNo, Email, TaxId or CitizenID"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </Col>
        </>
      ) : (
        <Col lg={4}>
          <Input
            typeof="text"
            icon="fas fa-search"
            placeholder="Search by UID, Name, PhoneNo, Email, TaxId or CitizenID"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </Col>
      )}
      <Col lg={2}>
        <Select
          icon="fas fa-bars"
          onChange={(e: {
            target: { value: SetStateAction<string | string[]> }
          }) => setType(e.target.value)}
        >
          <option value="">All Type</option>
          {Object.keys(userTypeMaster).map((type, index) => {
            return (
              <option value={userTypeMaster[type].value} key={index}>
                {userTypeMaster[type].label}
              </option>
            )
          })}
        </Select>
      </Col>
      <Col lg={2}>
        <Select
          icon="fas fa-bars"
          onChange={(e: {
            target: { value: SetStateAction<string | string[]> }
          }) => setSubType(e.target.value)}
          value={subType}
        >
          <option value="">All Sub Type</option>
          {Object.keys(userSubTypeMaster).map((_subType, index) => {
            return (
              <option value={userSubTypeMaster[_subType].value} key={index}>
                {userSubTypeMaster[_subType].label}
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
          {Object.keys(userStatusMaster).map((_status, index) => {
            return (
              <option value={userStatusMaster[_status].value} key={index}>
                {userStatusMaster[_status].label}
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
