import Label from '../components/commons/label'
import Skeleton from '../components/commons/skeleton'

export const RenderField = ({
  label,
  value,
  isFetching,
  style
}: {
  label?: string
  value: string | number | JSX.Element
  isFetching: boolean
  style?: React.CSSProperties
}) => (
  <>
    <Label>{label}</Label>
    {isFetching ? <Skeleton style={style} /> : value || '-'}
  </>
)
