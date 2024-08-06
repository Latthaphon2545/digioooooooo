import partnerStatusMaster from '../../../constants/masters/partnerStatusMaster.json'
import { Col } from 'react-grid-system'
import Select from '../../../components/commons/select'
import Input from '../../../components/commons/input'
import ButtonWrapper from '../../../components/commons/button'

interface SearchPartnerProps {
  handleOnClickSearch: () => void
  handleOnClearSearch: () => void
  query: string | string[]
  setQuery: (query: string | string[]) => void
  status: string | string[]
  setStatus: (status: string | string[]) => void
}

export const SearchPartner = ({
  handleOnClickSearch,
  handleOnClearSearch,
  query,
  setQuery,
  status,
  setStatus
}: SearchPartnerProps) => {
  return (
    <>
      <Col lg={7}>
        <Input
          type="text"
          icon="fas fa-search"
          placeholder="Search by ID or Name"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </Col>
      <Col lg={3}>
        <Select
          icon="fas fa-bars"
          onChange={(e) => setStatus(e.target.value)}
          value={status}
        >
          <option value="">All Status</option>
          {Object.keys(partnerStatusMaster).map((_status, index) => {
            return (
              <option value={partnerStatusMaster[_status].value} key={index}>
                {partnerStatusMaster[_status].label}
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
