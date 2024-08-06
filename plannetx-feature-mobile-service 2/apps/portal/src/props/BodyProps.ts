import { useSelectorProps } from './useSelectorProps'

export interface BodyProps {
  user: useSelectorProps['user']
  isFetching: boolean
  total: number
  pageSize: number
  page: number
  rows: any[]
  handleOnChangePageSize: (value: number) => void
  handleOnChangePage: (value: number) => void
  permission?: any
}
