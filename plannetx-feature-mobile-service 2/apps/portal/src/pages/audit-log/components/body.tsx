import auditLogMenuMaster from '../../../constants/masters/auditLogMenuMaster.json'
import portalTypeMaster from '../../../constants/masters/portalTypeMaster.json'
import { useSelectorProps } from '../../../props/useSelectorProps'

export const BodyAuditLog = (user: useSelectorProps['user']) => {
  return user && user.portalTypeId === portalTypeMaster.DIGIO
    ? [
        {
          label: 'Partner',
          key: 'partner_name',
          width: '10%'
        },
        {
          label: 'Menu',
          key: 'menu',
          width: '10%',
          dataMutation: (row) => auditLogMenuMaster[row.menu].label
        },
        {
          label: 'Action',
          key: 'action',
          width: '10%'
        },
        {
          label: 'Source',
          key: 'source_name',
          subKey: 'source_type',
          width: '15%'
        },
        {
          label: 'Destination',
          key: 'destination_name', // Added key property
          subKey: 'destination_type',
          width: '15%',
          dataMutation: (row) => row.destination_name || '-'
        },
        {
          label: 'Detail',
          key: 'detail',
          width: '20%',
          dataMutation: (row) => row.detail || '-'
        },
        {
          label: 'Created At',
          key: 'created_at',
          width: '20%'
        }
      ]
    : [
        {
          label: 'Menu',
          key: 'menu',
          width: '10%',
          dataMutation: (row) => auditLogMenuMaster[row.menu].label
        },
        {
          label: 'Action',
          key: 'action',
          width: '10%'
        },
        {
          label: 'Source',
          key: 'source_name',
          subKey: 'source_type',
          width: '15%'
        },
        {
          label: 'Destination',
          key: 'destination_name', // Added key property
          subKey: 'destination_type',
          width: '15%',
          dataMutation: (row) => row.destination_name || '-'
        },
        {
          label: 'Detail',
          key: 'detail',
          width: '30%',
          dataMutation: (row) => row.detail || '-'
        },
        {
          label: 'Created At',
          key: 'created_at',
          width: '20%'
        }
      ]
}
