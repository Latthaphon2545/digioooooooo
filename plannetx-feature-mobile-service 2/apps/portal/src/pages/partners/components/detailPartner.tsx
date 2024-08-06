import { Col, Container, Row } from 'react-grid-system'
import SectionWrapper from '../../../components/commons/section'
import Badge from '../../../components/commons/badge'
import partnerStatusMaster from '../../../constants/masters/partnerStatusMaster.json'
import { partnerInfoProps } from '../../../props/partnerInfoProps'
import styled from 'styled-components'
import { RenderField } from '../../../utils/renderField'

const Logo = styled.img`
  padding: 10px;
  width: 100%;
  height: auto;
  box-sizing: border-box;
`

export const DetailPartner = ({
  partnerInfo,
  isFetching
}: {
  partnerInfo: partnerInfoProps
  isFetching: boolean
}) => {
  return (
    <SectionWrapper title="Detail">
      <Container fluid>
        <Row style={{ margin: '0px -10px' }}>
          <Col md={2} style={{ alignSelf: 'center' }}>
            <RenderField
              value={<Logo src={partnerInfo.logo} />}
              isFetching={isFetching}
              style={{ paddingBottom: '100%' }}
            />
          </Col>
          <Col md={5}>
            <RenderField
              label="Name"
              value={partnerInfo.name}
              isFetching={isFetching}
            />
            <RenderField
              label="Currency"
              value={partnerInfo.currency}
              isFetching={isFetching}
            />
            <RenderField
              label="Timezone"
              value={partnerInfo.timezone}
              isFetching={isFetching}
            />
            <RenderField
              label="Date Format"
              value={partnerInfo.date_format}
              isFetching={isFetching}
            />
          </Col>
          <Col md={5}>
            <RenderField
              label="Status"
              value={
                partnerInfo.status && (
                  <Badge
                    width="80px;"
                    color={partnerStatusMaster[partnerInfo.status].color}
                    backgroundcolor={
                      partnerStatusMaster[partnerInfo.status].backgroundColor
                    }
                  >
                    {partnerStatusMaster[partnerInfo.status].label}
                  </Badge>
                )
              }
              isFetching={isFetching}
            />
            <RenderField
              label="Created At"
              value={partnerInfo.created_at}
              isFetching={isFetching}
            />
            <RenderField
              label="Updated At"
              value={partnerInfo.updated_at}
              isFetching={isFetching}
            />
          </Col>
        </Row>
      </Container>
    </SectionWrapper>
  )
}
