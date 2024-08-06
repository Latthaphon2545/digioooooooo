import dayjs from 'dayjs'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { FormEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch } from '@reduxjs/toolkit'
import MainLayout from '../../components/layouts/mainLayout'
import userStatusMaster from '../../constants/masters/userStatusMaster.json'
import axios, {
  CustomAxiosRequestConfig,
  DispatchAction
} from '../../helpers/axios'
import Swal from '../../helpers/sweetalert'
import withAuthenticated from '../../hocs/withAuthenticated'
import { useSelectorProps } from '../../props/useSelectorProps'
import {
  DefaultUserInfo,
  UserInfoProps,
  Wallet
} from '../../props/userInfoProps'
import { DisplayUsers } from './components/displayUsers'
import { UpdatedUser } from './components/updateUser'

const UserPage = () => {
  const router = useRouter()
  const user = useSelector((state: useSelectorProps) => state.user)
  const [isFetching, setIsFetching] = useState(true)
  const [isFormSubmitting, setIsFormSubmitting] = useState(false)
  const [page, setPage] = useState(0)

  const [userInfo, setUserInfo] = useState<UserInfoProps>(DefaultUserInfo)
  const id = router.query.id

  const dispatch = useDispatch<Dispatch<DispatchAction>>()
  const config: CustomAxiosRequestConfig = {
    dispatch
  }

  const handleFetchUser = async () => {
    try {
      const res = await axios.get(`/api/inuser/${id}`, config)
      if (res.status === 200) {
        const data = res.data
        const fetchedUser: UserInfoProps = {
          uid: data.uid,
          type: data.type,
          subType: data.sub_type,
          firstnameTH: data.firstname_th,
          lastnameTH: data.lastname_th,
          firstnameEN: data.firstname_en,
          lastnameEN: data.lastname_en,
          phoneNo: data.phone_no,
          email: data.email,
          taxId: data.tax_id,
          citizenId: data.citizen_id,
          passport: data.passport,
          birthdate: data.birthdate,
          gender: data.gender,
          bank: data.bank,
          bankBranch: data.bank_branch,
          bankAccountNumber: data.bank_account_number,
          bankAccountName: data.bank_account_name,
          wallets: data.wallets.map((wallet: Wallet) => ({
            id: wallet.id,
            type: wallet.type,
            wallet_id: wallet.wallet_id,
            balance: wallet.balance,
            hold_balance: wallet.hold_balance,
            currency: wallet.currency,
            is_default: wallet.is_default,
            status: wallet.status
          })),
          status: data.status,
          createdAt: data.created_at,
          updatedAt: data.updated_at
        }
        setUserInfo(fetchedUser)
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
      const res = await axios.patch(
        `/api/inuser/${id}`,
        {
          status: userStatusMaster.SUSPENDED.value
        },
        config
      )
      if (res.status === 200) {
        handleFetchUser()
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

  const handleOnClickUnsuspend = async () => {
    try {
      const res = await axios.patch(
        `/api/inuser/${id}`,
        {
          status: userStatusMaster.VERIFIED.value
        },
        config
      )
      if (res.status === 200) {
        handleFetchUser()
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
    handleFetchUser()
    setPage(0)
  }

  const handleOnSubmitForm = async ({
    e,
    userUpdateInfo
  }: {
    e: FormEvent<HTMLFormElement>
    userUpdateInfo: UserInfoProps
  }) => {
    try {
      e.preventDefault()
      setIsFormSubmitting(true)
      const res = await axios.patch(
        `/api/inuser/${id}`,
        {
          firstname_en: userUpdateInfo.firstnameEN,
          lastname_en: userUpdateInfo.lastnameEN,
          firstname_th: userUpdateInfo.firstnameTH,
          lastname_th: userUpdateInfo.lastnameTH,
          tax_id: userUpdateInfo.taxId,
          citizen_id: userUpdateInfo.citizenId,
          passport: userUpdateInfo.passport,
          birthdate:
            userUpdateInfo.birthdate &&
            dayjs(userUpdateInfo.birthdate).format('YYYY-MM-DD'),
          gender: userUpdateInfo.gender,
          phone_no: userUpdateInfo.phoneNo.toString(),
          email: userUpdateInfo.email,
          bank: userUpdateInfo.bank,
          bank_branch: userUpdateInfo.bankBranch,
          bank_account_number: userUpdateInfo.bankAccountNumber,
          bank_account_name: userUpdateInfo.bankAccountName
        },
        config
      )

      if (res.status === 200) {
        handleFetchUser()
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
      handleFetchUser()
    }
  }, [user])

  return (
    <>
      <Head>
        <title>User · Whalepay</title>
      </Head>
      <MainLayout isFetching={!user}>
        {(() => {
          if (page === 0) {
            return (
              <DisplayUsers
                userInfo={userInfo}
                isFetching={isFetching}
                handleOnClickSuspend={handleOnClickSuspend}
                handleOnClickUnsuspend={handleOnClickUnsuspend}
                handleOnClickEdit={handleOnClickEdit}
              />
            )
          } else if (page === 1) {
            return (
              <UpdatedUser
                userInfo={userInfo}
                isFormSubmitting={isFormSubmitting}
                handleOnSubmitForm={handleOnSubmitForm}
                handleOnClickCancel={handleOnClickCancel}
              />
            )
          }
        })()}
      </MainLayout>
    </>
  )
}

export default withAuthenticated(UserPage)
