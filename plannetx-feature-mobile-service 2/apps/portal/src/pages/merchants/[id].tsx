import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch } from '@reduxjs/toolkit'
import MainLayout from '../../components/layouts/mainLayout'
import merchantStatusMaster from '../../constants/masters/merchantStatusMaster.json'
import portalPermissionMaster from '../../constants/masters/portalPermissionMaster.json'
import axios, {
  CustomAxiosRequestConfig,
  DispatchAction
} from '../../helpers/axios'
import Swal from '../../helpers/sweetalert'
import withAuthenticated from '../../hocs/withAuthenticated'
import { useSelectorProps } from '../../props/useSelectorProps'
import {
  DefaultMerchantInfo,
  MerchantInfoProps
} from '../../props/merchantInfoProps'
import { MerchantDetail } from './components/merchantDetail'
import { UpdateMerchants } from './components/updateMerchants'

const MerchantPage = () => {
  const router = useRouter()
  const id = router.query.id

  const dispatch = useDispatch<Dispatch<DispatchAction>>()
  const config: CustomAxiosRequestConfig = {
    dispatch
  }

  const user = useSelector((state: useSelectorProps) => state.user)

  const [permission, setPermission] = useState(null)
  const [isFetching, setIsFetching] = useState(true)
  const [isFormSubmitting, setIsFormSubmitting] = useState(false)
  const [page, setPage] = useState(0)
  const [branchId, setBranchId] = useState('')
  const [branchNameEN, setBranchNameEN] = useState('')
  const [inagents, setInagents] = useState([])

  const [merchantInfo, setMerchantInfo] =
    useState<MerchantInfoProps>(DefaultMerchantInfo)

  const handleFetchInagents = async (partnerId, branchId) => {
    try {
      const finalConfig: CustomAxiosRequestConfig = {
        ...config,
        headers: {
          ...config?.headers,
          'x-partner-id': partnerId
        },
        params: {
          branch_id: branchId,
          ...config?.params
        }
      }
      const res = await axios.get('/api/inagent', finalConfig)
      if (res.status === 200) {
        setInagents(res.data.inagents)
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleFetchInmerchant = async () => {
    try {
      const res = await axios.get(`/api/inmerchant/${id}`, config)
      const data = res.data
      if (res.status === 200) {
        setBranchId(data.inmerchant.branch_id)
        setBranchNameEN(data.inmerchant.branch_name_en)
        const fetchedMerchant: MerchantInfoProps = {
          username: data.inmerchant.username,
          mid: data.inmerchant.mid,
          subType: data.inmerchant.sub_type,
          firstnameEN: data.inmerchant.firstname_en,
          lastnameEN: data.inmerchant.lastname_en,
          firstnameTH: data.inmerchant.firstname_th,
          lastnameTH: data.inmerchant.lastname_th,
          taxId: data.inmerchant.tax_id,
          citizenId: data.inmerchant.citizen_id,
          passport: data.inmerchant.passport,
          phoneNo: data.inmerchant.phone_no,
          email: data.inmerchant.email,
          wallets: data.inmerchant.wallets.map((wallet) => ({
            id: wallet.id,
            type: wallet.type,
            walletId: wallet.wallet_id,
            balance: wallet.balance,
            holdBalance: wallet.hold_balance,
            currency: wallet.currency,
            isDefault: wallet.is_default,
            status: wallet.status
          })),
          settleTime: data.inmerchant.settle_time,
          settleToAgentId: data.inmerchant.settle_to_agent_id,
          settleToAgentFirstnameEN:
            data.inmerchant.settle_to_agent_firstname_en,
          settleToAgentLastnameEN: data.inmerchant.settle_to_agent_lastname_en,
          inagents: data.inmerchant.inagents,
          agentId: data.inmerchant.agent_id,
          status: data.inmerchant.status,
          createdAt: data.inmerchant.created_at,
          updatedAt: data.inmerchant.updated_at
        }

        setMerchantInfo(fetchedMerchant)

        handleFetchInagents(
          data.inmerchant.partner_id,
          data.inmerchant.branch_id
        )
      }
    } catch (err) {
      const message = err.response ? err.response.data.res_desc : err.message
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: message
      })
      console.error(err)
    } finally {
      setIsFetching(false)
    }
  }

  const handleOnClickSuspend = async () => {
    try {
      setIsFetching(true)
      const response = await axios.patch(
        `/api/inmerchant/${id}`,
        {
          status: merchantStatusMaster.SUSPENDED.value
        },
        config
      )
      if (response.status === 200) {
        handleFetchInmerchant()
      }
    } catch (err) {
      console.error(err)
    } finally {
      setIsFetching(false)
    }
  }

  const handleOnClickUnsuspend = async () => {
    try {
      setIsFetching(true)
      const response = await axios.patch(
        `/api/inmerchant/${id}`,
        {
          status: merchantStatusMaster.VERIFIED.value
        },
        config
      )
      if (response.status === 200) {
        handleFetchInmerchant()
      }
    } catch (err) {
      const message = err.response ? err.response.data.res_desc : err.message
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: message
      })
      console.error(err)
    } finally {
      setIsFetching(false)
    }
  }

  const handleOnClickEdit = () => {
    setPage(1)
  }

  const handleOnClickCancel = () => {
    setPage(0)
  }

  const handleOnSubmitEditForm = async ({
    e,
    merchantInfoUpdate
  }: {
    e: React.FormEvent<HTMLFormElement>
    merchantInfoUpdate: MerchantInfoProps
  }) => {
    try {
      e.preventDefault()
      setIsFormSubmitting(true)
      const response = await axios.patch(
        `/api/inmerchant/${id}`,
        {
          mid: merchantInfoUpdate.mid,
          sub_type: merchantInfoUpdate.subType,
          firstname_en: merchantInfoUpdate.firstnameEN,
          lastname_en: merchantInfoUpdate.lastnameEN,
          firstname_th: merchantInfoUpdate.firstnameTH,
          lastname_th: merchantInfoUpdate.lastnameTH,
          tax_id: merchantInfoUpdate.taxId || null,
          citizen_id: merchantInfoUpdate.citizenId || null,
          passport: merchantInfoUpdate.passport || null,
          phone_no: merchantInfoUpdate.phoneNo,
          email: merchantInfoUpdate.email,
          settle_time: merchantInfoUpdate.settleTime,
          settle_to_agent_id: merchantInfoUpdate.agentId
        },
        config
      )
      if (response.status === 200) {
        handleFetchInmerchant()
        setPage(0)
      }
    } catch (err) {
      const message = err.response ? err.response.data.res_desc : err.message
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: message
      })
      console.error(err)
    } finally {
      setIsFormSubmitting(false)
    }
  }

  useEffect(() => {
    if (user) {
      setPermission(
        user.permissions.find(
          (permission) => permission.name === portalPermissionMaster.INAGENT
        )
      )
      handleFetchInmerchant()
    }
  }, [user])

  return (
    <>
      <Head>
        <title>Merchant · Whalepay</title>
      </Head>
      <MainLayout isFetching={!user}>
        {(() => {
          if (page === 0) {
            return (
              <MerchantDetail
                isFetching={isFetching}
                merchantInfo={merchantInfo}
                handleOnClickSuspend={handleOnClickSuspend}
                handleOnClickUnsuspend={handleOnClickUnsuspend}
                handleOnClickEdit={handleOnClickEdit}
                permission={permission}
              />
            )
          } else if (page === 1) {
            return (
              <UpdateMerchants
                merchantInfo={merchantInfo}
                handleOnSubmitEditForm={handleOnSubmitEditForm}
                branchId={branchId}
                branchNameEN={branchNameEN}
                inagents={inagents}
                handleOnClickCancel={handleOnClickCancel}
                isFormSubmitting={isFormSubmitting}
              />
            )
          }
        })()}
      </MainLayout>
    </>
  )
}

export default withAuthenticated(MerchantPage)
