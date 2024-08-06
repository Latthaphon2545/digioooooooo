import { useSelectorProps } from '../../../props/useSelectorProps'
import portalTypeMaster from '../../../constants/masters/portalTypeMaster.json'
import merchantStatusMaster from '../../../constants/masters/merchantStatusMaster.json'
import { Col } from 'react-grid-system'
import Select from '../../../components/commons/select'
import Input from '../../../components/commons/input'
import ButtonWrapper from '../../../components/commons/button'

interface SearchMerchantsProps {
  user: useSelectorProps['user']
  handleOnClickSearch: () => void
  handleOnClearSearch: () => void
  inpartners: any
  inbranches: any
  partnerID: string | number
  setPartnerID: (partnerID: string | number) => void
  query: string | string[]
  setQuery: (query: string | string[]) => void
  branch: string | string[]
  setBranch: (branch: string | string[]) => void
  status: string | string[]
  setStatus: (status: string | string[]) => void
}

export const SearchMerchants = ({
  user,
  handleOnClickSearch,
  handleOnClearSearch,
  inpartners,
  inbranches,
  partnerID,
  setPartnerID,
  query,
  setQuery,
  branch,
  setBranch,
  status,
  setStatus
}: SearchMerchantsProps) => {
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
            placeholder="Search by Username, Name, PhoneNo, Email or Citizen ID / Passport"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </Col>
      )}
      <Col lg={2}>
        <Select
          icon="fas fa-bars"
          onChange={(e) => setBranch(e.target.value)}
          value={branch}
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
          {Object.keys(merchantStatusMaster).map((_status, index) => {
            return (
              <option value={merchantStatusMaster[_status].value} key={index}>
                {merchantStatusMaster[_status].label}
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
