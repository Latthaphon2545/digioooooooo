import Badge from '../../../components/commons/badge'
import portalTypeMaster from '../../../constants/masters/portalTypeMaster.json'
import userStatusMaster from '../../../constants/masters/userStatusMaster.json'
import userSubTypeMaster from '../../../constants/masters/userSubTypeMaster.json'
import userTypeMaster from '../../../constants/masters/userTypeMaster.json'
import { useSelectorProps } from '../../../props/useSelectorProps'

export const BodyUsers = (user: useSelectorProps['user']) => {
  return user && user.type === portalTypeMaster.DIGIO
    ? [
        {
          label: 'Partner',
          key: 'partner_name',
          width: '10%'
        },
        {
          label: 'Type',
          key: 'type',
          width: '10%',
          dataMutation: (row: { type: string | number }) =>
            userTypeMaster[row.type].label
        },
        {
          label: 'SubType',
          key: 'sub_type',
          width: '10%',
          dataMutation: (row: { sub_type: string | number }) =>
            userSubTypeMaster[row.sub_type].label
        },
        {
          label: 'Firstname',
          key: 'firstname_en',
          subKey: 'firstname_th',
          width: '20%'
        },
        {
          label: 'Lastname',
          key: 'lastname_en',
          subKey: 'lastname_th',
          width: '20%'
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
          dataMutation: (row: { status: string | number }) => (
            <Badge
              color={userStatusMaster[row.status].color}
              backgroundcolor={userStatusMaster[row.status].backgroundColor}
            >
              {userStatusMaster[row.status].label}
            </Badge>
          )
        }
      ]
    : [
        {
          label: 'Type',
          key: 'type',
          width: '15%',
          dataMutation: (row: { type: string | number }) =>
            userTypeMaster[row.type].label
        },
        {
          label: 'SubType',
          key: 'sub_type',
          width: '15%',
          dataMutation: (row: { sub_type: string | number }) =>
            userSubTypeMaster[row.sub_type].label
        },
        {
          label: 'Firstname',
          key: 'firstname_en',
          subKey: 'firstname_th',
          width: '20%'
        },
        {
          label: 'Lastname',
          key: 'lastname_en',
          subKey: 'lastname_th',
          width: '20%'
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
          dataMutation: (row: { status: string | number }) => (
            <Badge
              color={userStatusMaster[row.status].color}
              backgroundcolor={userStatusMaster[row.status].backgroundColor}
            >
              {userStatusMaster[row.status].label}
            </Badge>
          )
        }
      ]
}
