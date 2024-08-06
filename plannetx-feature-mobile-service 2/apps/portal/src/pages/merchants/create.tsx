import Head from 'next/head'
import Router from 'next/router'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch } from '@reduxjs/toolkit'
import portalTypeMaster from '../../constants/masters/portalTypeMaster.json'
import MainLayout from '../../components/layouts/mainLayout'
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
import { ConfirmCreateMerchant } from './components/confirmCreateMerchant'
import { CreateMerchant } from './components/createMerchant'

const MerchantPage = () => {
  const dispatch = useDispatch<Dispatch<DispatchAction>>()
  const config: CustomAxiosRequestConfig = {
    dispatch
  }

  const user = useSelector((state: useSelectorProps) => state.user)
  const [page, setPage] = useState(0)
  const [isFormSubmitting, setIsFormSubmitting] = useState(false)
  const [inpartners, setInpartners] = useState([])
  const [partnerId, setPartnerId] = useState('')
  const [inbranches, setInbranches] = useState([])
  const [inagents, setInagents] = useState([])
  const [agentId, setAgentId] = useState('')
  const [branchId, setBranchId] = useState('')

  const [merchantInfo, setMerchantInfo] =
    useState<MerchantInfoProps>(DefaultMerchantInfo)

  const handleFetchInpartners = async () => {
    try {
      const res = await axios.get('/api/inpartner', config)
      if (res.status === 200) {
        setInpartners(res.data.inpartners)
        setPartnerId(res.data.inpartners[0].id)
      }
    } catch (err) {
      const message = err.response ? err.response.data.res_desc : err.message
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: message
      })
      console.error(err)
    }
  }

  const handleFetchInbranches = async (partnerId: string) => {
    try {
      const finalConfig: CustomAxiosRequestConfig = {
        ...config,
        headers: {
          ...config?.headers,
          'x-partner-id': partnerId
        }
      }
      const res = await axios.get('/api/inbranch', finalConfig)
      if (res.status === 200) {
        setInbranches(res.data.inbranches)
        setBranchId(res.data.inbranches[0].id)

        await handleFetchInagents(partnerId, res.data.inbranches[0].id)
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleFetchInagents = async (partnerId: string, branchId: string) => {
    try {
      const finalConfig: CustomAxiosRequestConfig = {
        ...config,
        headers: {
          ...config?.headers,
          'x-partner-id': partnerId
        }
      }
      const { data } = await axios.get('/api/inagent', finalConfig)
      setInagents(data.inagents)

      const inagents = data.inagents.filter(
        (inagent) => inagent.branch_id === branchId
      )
      setAgentId(inagents.length ? data.inagents[0].id : '')
    } catch (err) {
      console.error(err)
    }
  }

  const handleOnSubmitCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (branchId && agentId) {
      console.log(merchantInfo)
      setPage(1)
    }
  }

  const handleOnClickCancel = () => {
    setPage(0)
  }

  const handleOnClickConfirm = async () => {
    setIsFormSubmitting(true)
    const finalConfig: CustomAxiosRequestConfig = {
      ...config,
      headers: {
        ...config?.headers,
        'x-partner-id': partnerId
      }
    }
    try {
      await axios.post(
        '/api/inmerchant',
        {
          branch_id: branchId,
          username: merchantInfo.username,
          mid: merchantInfo.mid,
          sub_type: merchantInfo.subType,
          firstname_th: merchantInfo.firstnameTH,
          lastname_th: merchantInfo.lastnameTH || undefined,
          firstname_en: merchantInfo.firstnameEN,
          lastname_en: merchantInfo.lastnameEN || undefined,
          tax_id: merchantInfo.taxId || undefined,
          citizen_id: merchantInfo.citizenId || undefined,
          passport: merchantInfo.passport || undefined,
          phone_no: merchantInfo.phoneNo.toString(),
          email: merchantInfo.email,
          settle_time: merchantInfo.settleTime,
          settle_to_agent_id: agentId
        },
        finalConfig
      )
      setIsFormSubmitting(false)
      Router.push('/merchants')
    } catch (err) {
      setIsFormSubmitting(false)
      const message = err.response ? err.response.data.res_desc : err.message
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: message
      })
      console.error(err)
    }
  }

  useEffect(() => {
    if (user) {
      if (user.type === portalTypeMaster.DIGIO) {
        handleFetchInpartners()
      } else {
        handleFetchInbranches(partnerId)
      }
    }
  }, [user])

  return (
    <>
      <Head>
        <title>Create Merchant · Whalepay</title>
      </Head>
      <MainLayout isFetching={!user}>
        {(() => {
          // Page 0 -> Create Merchant
          if (page === 0) {
            return (
              <CreateMerchant
                user={user}
                inpartners={inpartners}
                inbranches={inbranches}
                inagents={inagents}
                handleOnSubmitCreate={handleOnSubmitCreate}
                handleFetchInbranches={handleFetchInbranches}
                setMerchantInfo={setMerchantInfo}
                agentId={agentId}
                setAgentId={setAgentId}
              />
            )
          }
          // Page 1 -> Confirm Create Merchant
          else if (page === 1) {
            return (
              <ConfirmCreateMerchant
                user={user}
                isFormSubmitting={isFormSubmitting}
                merchantInfo={merchantInfo}
                inpartners={inpartners}
                partnerId={partnerId}
                inbranches={inbranches}
                branchId={branchId}
                inagents={inagents}
                agentId={agentId}
                handleOnClickCancel={handleOnClickCancel}
                handleOnClickConfirm={handleOnClickConfirm}
              />
            )
          }
        })()}
      </MainLayout>
    </>
  )
}

export default withAuthenticated(MerchantPage)
