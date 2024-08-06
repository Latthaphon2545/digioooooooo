import Head from 'next/head'
import Router from 'next/router'
import { useState } from 'react'
import { Dispatch } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import MainLayout from '../../components/layouts/mainLayout'
import axios, {
  CustomAxiosRequestConfig,
  DispatchAction
} from '../../helpers/axios'
import Swal from '../../helpers/sweetalert'
import withAuthenticated from '../../hocs/withAuthenticated'
import { useSelectorProps } from '../../props/useSelectorProps'
import { DefaultStaffInfo, StaffInfoProps } from '../../props/staffInfoProps'
import { IsConfirmCreateStaff } from './components/confirmCreateStaff'
import { CreateStaff } from './components/createStaff'

const StaffPage = () => {
  const user = useSelector((state: useSelectorProps) => state.user)
  const [page, setPage] = useState(0)
  const [isFormSubmitting, setIsFormSubmitting] = useState(false)

  const [staff, setStaff] = useState<StaffInfoProps>(DefaultStaffInfo)

  const dispatch = useDispatch<Dispatch<DispatchAction>>()
  const config: CustomAxiosRequestConfig = {
    dispatch
  }

  const handleOnSubmitCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setPage(1)
  }

  const handleOnClickCancel = () => {
    setPage(0)
  }

  const handleOnClickConfirm = async () => {
    try {
      setIsFormSubmitting(true)
      const response = await axios.post(
        '/api/inportal',
        {
          username: staff.username,
          firstname_th: staff.firstnameTH,
          lastname_th: staff.lastnameTH,
          firstname_en: staff.firstnameEN,
          lastname_en: staff.lastnameEN,
          email: staff.email,
          phone_no: staff.phoneNo,
          sub_type: staff.subType
        },
        config
      )
      if (response.status === 200) {
        Router.push('/staff')
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

  return (
    <>
      <Head>
        <title>Create Staff · Whalepay</title>
      </Head>
      <MainLayout isFetching={!user}>
        {(() => {
          if (page === 0) {
            return (
              <CreateStaff
                staffInfo={staff}
                handleOnSubmitCreate={handleOnSubmitCreate}
                setStaffInfo={setStaff}
              />
            )
          } else if (page === 1) {
            return (
              <IsConfirmCreateStaff
                staff={staff}
                isFormSubmitting={isFormSubmitting}
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

export default withAuthenticated(StaffPage)
