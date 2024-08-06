import Badge from '../../../components/commons/badge'
import portalSubTypeMaster from '../../../constants/masters/portalSubTypeMaster.json'
import portalTypeMaster from '../../../constants/masters/portalTypeMaster.json'
import portalStatusMaster from '../../../constants/masters/portalStatusMaster.json'
import { useSelectorProps } from '../../../props/useSelectorProps'

export const BodyStaff = (user: useSelectorProps['user']) => {
  return user && user.type === portalTypeMaster.DIGIO
    ? [
        {
          label: 'Partner',
          key: 'partner_name',
          width: '10%'
        },
        {
          label: 'Role',
          key: 'sub_type',
          width: '10%',
          dataMutation: (row) => portalSubTypeMaster[row.sub_type].label
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
          label: 'Username',
          key: 'username',
          width: '20%'
        },
        {
          label: 'Recent Login',
          key: 'recent_login',
          width: '20%'
        },
        {
          label: 'Status',
          key: 'status',
          width: '10%',
          align: 'center',
          dataMutation: (row) => (
            <Badge
              color={portalStatusMaster[row.status].color}
              backgroundcolor={portalStatusMaster[row.status].backgroundColor}
            >
              {portalStatusMaster[row.status].label}
            </Badge>
          )
        }
      ]
    : [
        {
          label: 'Role',
          key: 'sub_type',
          width: '10%',
          dataMutation: (row) => portalSubTypeMaster[row.sub_type].label
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
          label: 'Username',
          key: 'username',
          width: '20%'
        },
        {
          label: 'Recent Login',
          key: 'recent_login',
          width: '20%'
        },
        {
          label: 'Status',
          key: 'status',
          width: '10%',
          align: 'center',
          dataMutation: (row) => (
            <Badge
              color={portalStatusMaster[row.status].color}
              backgroundcolor={portalStatusMaster[row.status].backgroundColor}
            >
              {portalStatusMaster[row.status].label}
            </Badge>
          )
        }
      ]
}
