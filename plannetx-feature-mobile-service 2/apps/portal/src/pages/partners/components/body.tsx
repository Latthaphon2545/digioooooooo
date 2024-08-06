import Badge from '../../../components/commons/badge'
import partnerStatusMaster from '../../../constants/masters/partnerStatusMaster.json'

export const BodyPartner = () => {
  return [
    {
      label: 'ID',
      key: 'id',
      width: '10%'
    },
    {
      label: 'Name',
      key: 'name',
      width: '60%'
    },
    {
      label: 'Updated At',
      key: 'updated_at',
      width: '20%'
    },
    {
      label: 'Status',
      key: 'status',
      width: '15%',
      align: 'center',
      dataMutation: (row: any) => (
        <Badge
          color={partnerStatusMaster[row.status].color}
          backgroundcolor={partnerStatusMaster[row.status].backgroundColor}
        >
          {partnerStatusMaster[row.status].label}
        </Badge>
      )
    }
  ]
}
