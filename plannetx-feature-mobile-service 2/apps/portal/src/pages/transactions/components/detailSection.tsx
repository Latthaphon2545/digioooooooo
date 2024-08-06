import Label from '../../../components/commons/label'
import Section from '../../../components/commons/section'
import Skeleton from '../../../components/commons/skeleton'
import { Col, Container, Row } from 'react-grid-system'
import Badge from '../../../components/commons/badge'
import Button from '../../../components/commons/button'

import transactionStatusMaster from '../../../constants/masters/transactionStatusMaster.json'
import transactionSubTypeMaster from '../../../constants/masters/transactionSubTypeMaster.json'
import transactionTypeMaster from '../../../constants/masters/transactionTypeMaster.json'

import currencyFormatter from 'currency-formatter'
import Hr from '../../../components/commons/hr'

type DetailSectionProps = {
  isFetching: boolean
  transactionInfo: any
  permission: any
  onClickInquiry: () => void
  handleOnClickApprove: () => void
  handleOnClickVoid: () => void
}

export default function DetailSection({
  isFetching,
  transactionInfo,
  permission,
  onClickInquiry,
  handleOnClickApprove,
  handleOnClickVoid
}: DetailSectionProps) {
  return (
    <Section title="Detail">
      <Container fluid={true}>
        <Row style={{ margin: '0px -10px' }}>
          <Col sm={12}>
            <Container fluid={true}>
              <Row style={{ margin: '0px -10px' }}>
                <Col md={6}>
                  <Label>Reference No</Label>
                  {isFetching ? <Skeleton /> : transactionInfo.referenceNo}
                  <Label>Order ID</Label>
                  {isFetching ? <Skeleton /> : transactionInfo.orderId}
                  <Label>Discount Code</Label>
                  {isFetching ? (
                    <Skeleton />
                  ) : (
                    transactionInfo.discountCode || '-'
                  )}
                  <Label>Reference1</Label>
                  {isFetching ? (
                    <Skeleton />
                  ) : (
                    transactionInfo.reference1 || '-'
                  )}
                  <Label>Reference2</Label>
                  {isFetching ? (
                    <Skeleton />
                  ) : (
                    transactionInfo.reference2 || '-'
                  )}
                  <Label>Reference3</Label>
                  {isFetching ? (
                    <Skeleton />
                  ) : (
                    transactionInfo.reference3 || '-'
                  )}
                  <Label>External Reference</Label>
                  {isFetching ? (
                    <Skeleton />
                  ) : (
                    transactionInfo.externalReference || '-'
                  )}
                </Col>
                <Col md={6}>
                  <Label>Status</Label>
                  {isFetching ? (
                    <Skeleton />
                  ) : (
                    <Badge
                      width="80px"
                      color={transactionStatusMaster[status].color}
                      backgroundcolor={
                        transactionStatusMaster[status].backgroundColor
                      }
                    >
                      {transactionStatusMaster[status].label}
                    </Badge>
                  )}
                  <Label>Approval Code</Label>
                  {isFetching ? (
                    <Skeleton />
                  ) : (
                    transactionInfo.approvalCode || '-'
                  )}
                  <Label>Net / Fee</Label>
                  {isFetching ? (
                    <Skeleton />
                  ) : (
                    `${currencyFormatter.format(transactionInfo.net, {
                      code: transactionInfo.currency
                    })} / ${currencyFormatter.format(transactionInfo.fee, {
                      code: transactionInfo.currency
                    })}`
                  )}
                  <Label>Discount</Label>
                  {isFetching ? (
                    <Skeleton />
                  ) : (
                    currencyFormatter.format(transactionInfo.discount, {
                      code: transactionInfo.currency
                    })
                  )}
                  <Label>Total</Label>
                  {isFetching ? (
                    <Skeleton />
                  ) : (
                    currencyFormatter.format(transactionInfo.total, {
                      code: transactionInfo.currency
                    })
                  )}
                  <Label>Batch No</Label>
                  {isFetching ? <Skeleton /> : transactionInfo.batchNo || '-'}
                  <Label>Remark</Label>
                  {isFetching ? <Skeleton /> : transactionInfo.remark || '-'}
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
        <Row style={{ margin: '0px -10px' }}>
          <Col xs={12}>
            <Hr />
          </Col>
        </Row>
        <Row style={{ margin: '0px -10px' }}>
          {permission &&
          permission.edit &&
          transactionInfo.type === transactionTypeMaster.TOPUP.value &&
          (transactionInfo.subType ===
            transactionSubTypeMaster.PROMPTPAY.value ||
            transactionInfo.subType ===
              transactionSubTypeMaster.CREDITCARD.value) &&
          (status === transactionStatusMaster.PENDING.value ||
            status === transactionStatusMaster.APPROVED.value) ? (
            <Col lg={4}>
              <Button
                //primaryAlt
                $primary
                onClick={onClickInquiry}
                disabled={isFetching}
              >
                <i className="fas fa-sync" />
                Inquiry
              </Button>
            </Col>
          ) : null}
          {permission &&
          permission.edit &&
          status === transactionStatusMaster.HOLDED.value ? (
            <Col lg={4}>
              <Button
                successalt
                onClick={handleOnClickApprove}
                disabled={isFetching}
              >
                <i className="fas fa-check-double" />
                Approve
              </Button>
            </Col>
          ) : null}
          {permission &&
          permission.edit &&
          status === transactionStatusMaster.APPROVED.value &&
          ((transactionInfo.type === transactionTypeMaster.TOPUP.value &&
            transactionInfo.subType ===
              transactionSubTypeMaster.CREDITCARD.value) ||
            (transactionInfo.type === transactionTypeMaster.PAYMENT.value &&
              transactionInfo.subType ===
                transactionSubTypeMaster.CLOSELOOP.value)) ? (
            <Col lg={4}>
              <Button
                dangeralt
                onClick={handleOnClickVoid}
                disabled={isFetching}
              >
                <i className="fas fa-undo" />
                Void
              </Button>
            </Col>
          ) : null}
        </Row>
      </Container>
    </Section>
  )
}
