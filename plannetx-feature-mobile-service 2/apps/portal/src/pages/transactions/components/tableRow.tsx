import React from 'react'
import { Col, Row } from 'react-grid-system'
import Table from '../../../components/commons/table'
import Badge from '../../../components/commons/badge'
import currencyFormatter from 'currency-formatter'

import portalTypeMaster from '../../../constants/masters/portalTypeMaster.json'
import transactionTypeMaster from '../../../constants/masters/transactionTypeMaster.json'
import transactionSubTypeMaster from '../../../constants/masters/transactionSubTypeMaster.json'
import transactionStatusMaster from '../../../constants/masters/transactionStatusMaster.json'
import { User } from '../../../types/types'

type TableRowProps = {
  user: User
  isFetching: boolean
  total: number
  pageSize: number
  setPageSize: (page: number) => void
  page: number
  setPage: (page: number) => void
  rows: any[]
  onClickRow: (row: any) => void
}

export default function TableRow({
  user,
  isFetching,
  total,
  pageSize,
  setPageSize: handleOnChangePageSize,
  page,
  setPage: handleOnChangePage,
  rows,
  onClickRow: handleOnClickRow
}: TableRowProps) {
  return (
    <Row style={{ margin: '20px -10px 0px -10px' }}>
      <Col xs={12}>
        <Table
          isFetching={isFetching}
          total={total}
          pageSize={pageSize}
          setPageSize={handleOnChangePageSize}
          page={page}
          setPage={handleOnChangePage}
          columns={
            user && user.type === portalTypeMaster.DIGIO
              ? [
                  {
                    label: 'Partner',
                    key: 'partner_name',
                    width: '10%'
                  },
                  {
                    label: 'ReferenceNo / CreatedAt',
                    key: 'reference_no',
                    subKey: 'created_at',
                    width: '20%'
                  },
                  {
                    label: 'Type / SubType',
                    width: '15%',
                    dataMutation: (row) =>
                      transactionTypeMaster[row.type].label,
                    subDataMutation: (row) =>
                      transactionSubTypeMaster[row.sub_type].label
                  },
                  {
                    label: 'Payer',
                    width: '17.5%',
                    dataMutation: (row) =>
                      row.type === transactionTypeMaster.TOPUP.value
                        ? '-'
                        : row.payer_name
                  },
                  {
                    label: 'Payee',
                    width: '17.5%',
                    dataMutation: (row) =>
                      row.type === transactionTypeMaster.WITHDRAW.value
                        ? '-'
                        : row.payee_name
                  },
                  {
                    label: 'Total',
                    width: '10%',
                    align: 'right',
                    dataMutation: (row) =>
                      currencyFormatter.format(row.total, {
                        code: row.currency
                      })
                  },
                  {
                    label: 'Status',
                    width: '10%',
                    align: 'center',
                    dataMutation: (row) => (
                      <Badge
                        color={transactionStatusMaster[row.status].color}
                        backgroundcolor={
                          transactionStatusMaster[row.status].backgroundColor
                        }
                      >
                        {transactionStatusMaster[row.status].label}
                      </Badge>
                    )
                  }
                ]
              : [
                  {
                    label: 'ReferenceNo / CreatedAt',
                    key: 'reference_no',
                    subKey: 'created_at',
                    width: '25%'
                  },
                  {
                    label: 'Type/SubType',
                    width: '15%',
                    dataMutation: (row) =>
                      transactionTypeMaster[row.type].label,
                    subDataMutation: (row) =>
                      transactionSubTypeMaster[row.sub_type].label
                  },
                  {
                    label: 'Payer',
                    width: '20%',
                    dataMutation: (row) =>
                      row.type === transactionTypeMaster.TOPUP.value
                        ? '-'
                        : row.payer_name
                  },
                  {
                    label: 'Payee',
                    width: '20%',
                    dataMutation: (row) =>
                      row.type === transactionTypeMaster.WITHDRAW.value
                        ? '-'
                        : row.payee_name
                  },
                  {
                    label: 'Total',
                    width: '10%',
                    align: 'right',
                    dataMutation: (row) =>
                      currencyFormatter.format(row.total, {
                        code: row.currency
                      })
                  },
                  {
                    label: 'Status',
                    width: '10%',
                    align: 'center',
                    dataMutation: (row) => (
                      <Badge
                        color={transactionStatusMaster[row.status].color}
                        backgroundcolor={
                          transactionStatusMaster[row.status].backgroundColor
                        }
                      >
                        {transactionStatusMaster[row.status].label}
                      </Badge>
                    )
                  }
                ]
          }
          rows={rows}
          onClickRow={handleOnClickRow}
        />
      </Col>
    </Row>
  )
}
