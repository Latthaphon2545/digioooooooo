import moment from 'moment'
import { Col } from 'react-grid-system'
import DatePickerRange from '../../../components/commons/datePickerRange'
import Input from '../../../components/commons/input'
import Select from '../../../components/commons/select'
import auditLogMenuMaster from '../../../constants/masters/auditLogMenuMaster.json'
import portalTypeMaster from '../../../constants/masters/portalTypeMaster.json'
import { useSelectorProps } from '../../../props/useSelectorProps'
import ButtonWrapper from '../../../components/commons/button'

interface SearchAuditLogProps {
  user: useSelectorProps['user']
  setPartnerID: (partnerID: string) => void
  setMenu: (menu: string) => void
  setQuery: (query: string) => void
  setStartDate: (startDate: moment.Moment | null) => void
  setEndDate: (endDate: moment.Moment | null) => void
  handleOnClickSearch: () => void
  handleOnClearSearch: () => void
  partnerID: string | number
  inpartners: any[]
  menu: string | string[]
  query: string | string[]
  startDate: moment.Moment | null
  endDate: moment.Moment | null
}

export const SearchAuditLog = ({
  user,
  setPartnerID,
  setMenu,
  setQuery,
  setStartDate,
  setEndDate,
  handleOnClickSearch,
  handleOnClearSearch,
  partnerID,
  inpartners,
  menu,
  query,
  startDate,
  endDate
}: SearchAuditLogProps) => {
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
            <Select
              icon="fas fa-bars"
              onChange={(e) => setMenu(e.target.value)}
              value={menu}
            >
              <option value="">All Menu</option>
              {Object.keys(auditLogMenuMaster).map((_menu, index) => {
                return (
                  <option value={auditLogMenuMaster[_menu].value} key={index}>
                    {auditLogMenuMaster[_menu].label}
                  </option>
                )
              })}
            </Select>
          </Col>
          <Col lg={3}>
            <Input
              type="text"
              icon="fas fa-search"
              placeholder="Search by Source or Destination"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </Col>
          <Col lg={3}>
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
        </>
      ) : (
        <>
          <Col lg={2}>
            <Select
              icon="fas fa-bars"
              onChange={(e) => setMenu(e.target.value)}
              value={menu}
            >
              <option value="">All Menu</option>
              {Object.keys(auditLogMenuMaster).map((_menu, index) => {
                return (
                  <option value={auditLogMenuMaster[_menu].value} key={index}>
                    {auditLogMenuMaster[_menu].label}
                  </option>
                )
              })}
            </Select>
          </Col>
          <Col lg={4}>
            <Input
              type="text"
              icon="fas fa-search"
              placeholder="Search by Source or Destination"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </Col>
          <Col lg={4}>
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
        </>
      )}
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
