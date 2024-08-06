import { Col } from 'react-grid-system'
import Table from '../components/commons/table'
import Router from 'next/router'

interface Body {
  isFetching: boolean
  total: number
  pageSize: number
  page: number
  rows: any[]
  handleOnChangePageSize: (pageSize: number) => void
  handleOnChangePage: (page: number) => void
  permission: any
  columns: any[]
  navigate: string
  navigateWithId: string
}

export const Body = ({
  isFetching,
  total,
  pageSize,
  page,
  rows,
  handleOnChangePageSize,
  handleOnChangePage,
  permission,
  columns,
  navigate,
  navigateWithId
}: Body) => {
  const onClickRow =
    navigate && permission && permission.detail
      ? (row) => Router.push(navigate, `/${navigateWithId}/${row.id}`)
      : undefined

  return (
    <Col xs={12}>
      <Table
        isFetching={isFetching}
        total={total}
        pageSize={pageSize}
        setPageSize={handleOnChangePageSize}
        page={page}
        setPage={handleOnChangePage}
        columns={columns}
        rows={rows}
        onClickRow={onClickRow}
      />
    </Col>
  )
}
