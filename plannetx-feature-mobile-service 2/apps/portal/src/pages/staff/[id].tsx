import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch } from '@reduxjs/toolkit'
import MainLayout from '../../components/layouts/mainLayout'
import portalPermissionMaster from '../../constants/masters/portalPermissionMaster.json'
import portalStatusMaster from '../../constants/masters/portalStatusMaster.json'
import axios, {
  CustomAxiosRequestConfig,
  DispatchAction
} from '../../helpers/axios'
import Swal from '../../helpers/sweetalert'
import withAuthenticated from '../../hocs/withAuthenticated'
import { useSelectorProps } from '../../props/useSelectorProps'
import { DefaultStaffInfo, StaffInfoProps } from '../../props/staffInfoProps'
import { DisplayStaff } from './components/displayStaff'
import { UpdateStaff } from './components/updateStaff'

const StaffPage = () => {
  const router = useRouter()
  const id = router.query.id

  const user = useSelector((state: useSelectorProps) => state.user)

  const [staff, setStaff] = useState<StaffInfoProps>(DefaultStaffInfo)
  const [isFetching, setIsFetching] = useState(false)
  const [isFormSubmitting, setIsFormSubmitting] = useState(false)
  const [page, setPage] = useState(0)
  const [permission, setPermission] = useState<any>(null)

  const dispatch = useDispatch<Dispatch<DispatchAction>>()
  const config: CustomAxiosRequestConfig = {
    dispatch
  }

  const handleFetchStaff = async () => {
    try {
      setIsFetching(true)
      const response = await axios.get(`/api/inportal/${id}`, config)
      if (response.status === 200) {
        const data = response.data
        const fetchedStaff: StaffInfoProps = {
          username: data.username,
          firstnameEN: data.firstname_en,
          lastnameEN: data.lastname_en,
          firstnameTH: data.firstname_th,
          lastnameTH: data.lastname_th,
          email: data.email,
          phoneNo: data.phone_no,
          role: data.sub_type,
          subType: data.sub_type,
          status: data.status,
          recentLogin: data.recent_login,
          createdAt: data.created_at,
          updatedAt: data.updated_at
        }
        setStaff(fetchedStaff)
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

  const handleOnClickResendActivate = async () => {
    try {
      const response = await axios.post(
        `/api/inportal/${id}/resend-activate`,
        config
      )
      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Resend Activate Successfully'
        })
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
    }
  }

  const handleOnClickSuspend = async () => {
    try {
      setIsFetching(true)
      const response = await axios.patch(
        `/api/inportal/${id}`,
        {
          status: portalStatusMaster.SUSPENDED.value
        },
        config
      )
      if (response.status === 200) {
        handleFetchStaff()
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
      setIsFetching(true)
      const response = await axios.patch(
        `/api/inportal/${id}`,
        {
          status: portalStatusMaster.VERIFIED.value
        },
        config
      )
      if (response.status === 200) {
        handleFetchStaff()
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
    handleFetchStaff()
    setPage(0)
  }

  const handleOnSubmitEditForm = async ({
    e,
    staffUpdateInfo
  }: {
    e: any
    staffUpdateInfo: {
      email: string
      firstnameEN: string
      lastnameEN: string
      firstnameTH: string
      lastnameTH: string
      phoneNo: string
      subType: string
    }
  }) => {
    e.preventDefault()
    try {
      setIsFormSubmitting(true)
      const response = await axios.patch(
        `/api/inportal/${id}`,
        {
          email: staffUpdateInfo.email,
          firstname_en: staffUpdateInfo.firstnameEN,
          lastname_en: staffUpdateInfo.lastnameEN,
          firstname_th: staffUpdateInfo.firstnameTH,
          lastname_th: staffUpdateInfo.lastnameTH,
          phone_no: staffUpdateInfo.phoneNo,
          sub_type: staffUpdateInfo.subType
        },
        config
      )
      if (response.status === 200) {
        handleFetchStaff()
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
          (permission) => permission.name === portalPermissionMaster.INPORTAL
        )
      )
      handleFetchStaff()
    }
  }, [user])

  return (
    <>
      <Head>
        <title>Staff · Whalepay</title>
      </Head>
      <MainLayout isFetching={!user}>
        {(() => {
          if (page === 0) {
            return (
              <DisplayStaff
                isFetching={isFetching}
                username={staff.username}
                role={staff.role}
                recentLogin={staff.recentLogin}
                id_router={id}
                user={user}
                staffInfo={staff}
                handleOnClickResendActivate={handleOnClickResendActivate}
                handleOnClickSuspend={handleOnClickSuspend}
                handleOnClickUnsuspend={handleOnClickUnsuspend}
                handleOnClickEdit={handleOnClickEdit}
                permission={permission}
              />
            )
          } else if (page === 1) {
            return (
              <UpdateStaff
                username={staff.username}
                staffInfo={staff}
                handleOnSubmitEditForm={handleOnSubmitEditForm}
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

export default withAuthenticated(StaffPage)
