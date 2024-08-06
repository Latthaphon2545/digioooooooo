import Badge from '../../../components/commons/badge'
import merchantStatusMaster from '../../../constants/masters/merchantStatusMaster.json'
import portalTypeMaster from '../../../constants/masters/portalTypeMaster.json'
import { useSelectorProps } from '../../../props/useSelectorProps'

export const BodyMerchants = (user: useSelectorProps['user']) => {
  return user && user.type === portalTypeMaster.DIGIO
    ? [
        {
          label: 'Partner',
          key: 'partner_name',
          width: '10%'
        },
        {
          label: 'Username',
          key: 'username',
          width: '20%'
        },
        {
          label: 'Firstname',
          key: 'firstname_en',
          subKey: 'firstname_th',
          width: '15%'
        },
        {
          label: 'Lastname',
          key: 'lastname_en',
          subKey: 'lastname_th',
          width: '15%'
        },
        {
          label: 'Branch',
          key: 'branch_name_en',
          subKey: 'branch_name_th',
          width: '20%'
        },
        {
          label: 'Status',
          key: 'status',
          width: '10%',
          align: 'center',
          dataMutation: (row) => (
            <Badge
              color={merchantStatusMaster[row.status].color}
              backgroundcolor={merchantStatusMaster[row.status].backgroundColor}
            >
              {merchantStatusMaster[row.status].label}
            </Badge>
          )
        }
      ]
    : [
        {
          label: 'Username',
          key: 'username',
          width: '20%'
        },
        {
          label: 'Firstname',
          key: 'firstname_en',
          subKey: 'firstname_th',
          width: '17.5%'
        },
        {
          label: 'Lastname',
          key: 'lastname_en',
          subKey: 'lastname_th',
          width: '17.5%'
        },
        {
          label: 'Branch',
          key: 'branch_name_en',
          subKey: 'branch_name_th',
          width: '15%'
        },
        {
          label: 'Updated At',
          key: 'updated_at',
          width: '20%'
        },
        {
          label: 'Status',
          key: 'status',
          width: '10%',
          align: 'center',
          dataMutation: (row) => (
            <Badge
              color={merchantStatusMaster[row.status].color}
              backgroundcolor={merchantStatusMaster[row.status].backgroundColor}
            >
              {merchantStatusMaster[row.status].label}
            </Badge>
          )
        }
      ]
}
