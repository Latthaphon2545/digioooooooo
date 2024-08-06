import Router from 'next/router'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import MainLayout from '../components/layouts/mainLayout'

import withAuthenticated from '../hocs/withAuthenticated'
import { useSelectorProps } from '../props/useSelectorProps'

const HomePage = () => {
  const user = useSelector((state: useSelectorProps) => state.user)

  useEffect(() => {
    if (user) {
      Router.push('/transactions')
    }
  }, [user])

  return <MainLayout isFetching={!user}></MainLayout>
}

export default withAuthenticated(HomePage)
