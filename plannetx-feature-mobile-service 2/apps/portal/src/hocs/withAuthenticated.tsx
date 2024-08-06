import axios from 'axios'
import Router from 'next/router'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSelectorProps } from '../props/useSelectorProps'

const withAuthenticated = (Component: React.FC) => {
  const ComponentWithAuthenticated = (props: any) => {
    const dispatch = useDispatch()
    const user = useSelector((state: useSelectorProps) => state.user)

    const handleFetchUserProfile = async () => {
      try {
        const res = await axios.get(
          '/api/authen/profile'
          // { dispatch }
        )
        const user = {
          id: res.data.id,
          type: res.data.type,
          subType: res.data.sub_type,
          firstnameEN: res.data.firstname_en,
          lastnameEN: res.data.lastname_en,
          firstnameTH: res.data.firstname_th,
          lastnameTH: res.data.lastname_th,
          email: res.data.email,
          recentLogin: res.data.recent_login,
          lastLogin: res.data.last_login,
          permissions: res.data.permissions
        }
        dispatch({ type: 'SET_THEME', payload: 'default' })
        dispatch({ type: 'SET_USER', payload: user })
      } catch (err) {
        console.error(err)
        Router.push('/login')
      }
    }

    useEffect(() => {
      if (!user) {
        handleFetchUserProfile()
      }
    }, [])

    return <Component {...props} />
  }
  return ComponentWithAuthenticated
}

export default withAuthenticated
