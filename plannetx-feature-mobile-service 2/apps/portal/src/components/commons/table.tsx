import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'

import Skeleton from './skeleton'

const Container = styled.div`
  height: auto;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.05);
  overflow: hidden;
`

const Header = styled.div`
  display: flex;
  padding: 15px;
  color: #92a3b9;
  background-color: #fafbfd;
  border-bottom: 1px solid #f4f6f9;
`

const Row = styled.div`
  display: flex;
  padding: 10px 15px;
  color: #0b2f5f;
  border-bottom: 1px solid #f4f6f9;
  box-sizing: border-box;
  transition: background-color 0.2s;
  &:hover {
    background-color: #fafbfd;
  }
  ${(props) =>
    props.onClick &&
    css`
      &:hover {
        cursor: pointer;
      }
    `}
`
const Column = styled.div<{ width?: string; align?: string }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0px 10px;
  word-break: break-all;
  font-size: 0.875em;
  ${(props) => `
      flex-basis: ${props.width || 0};
      text-align: ${props.align || 'left'};
    `}
  > span:nth-child(2) {
    font-size: 0.875em;
    color: #92a3b9;
  }
`

const Message = styled.div`
  flex-grow: 1;
  margin: 10px;
  font-size: 1em;
  text-align: center;
  color: #92a3b9;
  > i {
    margin-right: 10px;
  }
`

const Pagination = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`

const Label = styled.div`
  margin-right: 10px;
  font-size: 0.875em;
  color: #92a3b9;
`

const Button = styled.button`
  padding: 10px;
  color: #0b2f5f;
  background: transparent;
  border: none;
  outline: none;
  opacity: 0.5;
  &:hover {
    cursor: pointer;
    opacity: 1;
  }
  &:disabled {
    cursor: default;
    opacity: 0.1;
  }
`

type TableProps = {
  isFetching: boolean
  total: number
  pageSize: number
  page: number
  setPage: (page: number) => void
  setPageSize: (pageSize: number) => void
  columns: {
    label: string
    key?: string
    width: string
    align?: string
    dataMutation?: (row: any) => React.ReactNode
    subKey?: string
    subDataMutation?: (row: any) => React.ReactNode
  }[]
  rows: any[]
  onClickRow?: (row: any) => void
}

const Table = ({
  isFetching,
  total,
  pageSize,
  page,
  setPage,
  setPageSize,
  columns,
  rows,
  onClickRow
}: TableProps) => {
  return (
    <Container>
      <Header>
        {columns.map((column, index) => {
          return (
            <Column width={column.width} align={column.align} key={index}>
              {column.label}
            </Column>
          )
        })}
      </Header>
      {(() => {
        if (isFetching) {
          return (
            <Row>
              {columns.map((column, columnIndex) => {
                return (
                  <Column
                    width={column.width}
                    align={column.align}
                    key={columnIndex}
                  >
                    <span>
                      <Skeleton />
                    </span>
                    {column.subKey ? (
                      <span>
                        <Skeleton />
                      </span>
                    ) : null}
                  </Column>
                )
              })}
            </Row>
          )
        } else if (total === 0) {
          return (
            <Row>
              <Message>
                <i className="fas fa-info-circle" />
                No results found
              </Message>
            </Row>
          )
        } else {
          return rows.map((row, rowIndex) => {
            return (
              <Row
                onClick={onClickRow ? () => onClickRow(row) : undefined}
                key={rowIndex}
              >
                {columns.map((column, columnIndex) => {
                  return (
                    <Column
                      width={column.width}
                      align={column.align}
                      key={columnIndex}
                    >
                      <span>
                        {column.dataMutation
                          ? column.dataMutation(row)
                          : row[column.key]}
                      </span>
                      <span>
                        {column.subDataMutation
                          ? column.subDataMutation(row)
                          : column.subKey
                          ? row[column.subKey]
                          : null}
                      </span>
                    </Column>
                  )
                })}
              </Row>
            )
          })
        }
      })()}
      <Pagination>
        <Label>
          {total > 0 ? page * pageSize + 1 : 0} -{' '}
          {(page + 1) * pageSize > total ? total : (page + 1) * pageSize} of{' '}
          {total}
        </Label>
        <Button disabled={page === 0} onClick={() => setPage(page - 1)}>
          <i className="fas fa-chevron-left" />
        </Button>
        <Button
          disabled={(page + 1) * pageSize >= total}
          onClick={() => setPage(page + 1)}
        >
          <i className="fas fa-chevron-right" />
        </Button>
      </Pagination>
    </Container>
  )
}

export default Table
