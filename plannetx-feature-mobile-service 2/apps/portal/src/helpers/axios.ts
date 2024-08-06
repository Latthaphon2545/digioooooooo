import Router from 'next/router'
import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios'
import Cookies from 'js-cookie'
import dayjs from 'dayjs'
import Swal, { SweetAlertOptions } from 'sweetalert2'
import { Dispatch } from 'react'

// User interface definition
interface User {
  id: string
  type: string
  subType: string
  firstnameEN: string
  lastnameEN: string
  firstnameTH: string
  lastnameTH: string
  email: string
  recentLogin: string
  lastLogin: string
  permissions: string[]
}

// DispatchAction and CustomAxiosRequestConfig interface definitions
export interface DispatchAction {
  type: string
  payload: any
}

export interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  dispatch?: Dispatch<DispatchAction>
}

// Create an Axios instance
const instance: AxiosInstance = axios.create()

let timer: NodeJS.Timeout

const setSessionTimeout = (dispatch: Dispatch<DispatchAction>) => {
  const expires = Cookies.get('expires')
  if (!expires) return
  const diff = dayjs(expires).diff(dayjs().add(1, 'minute'), 'milliseconds')
  if (diff > 0) {
    clearTimeout(timer)
    timer = setTimeout(() => {
      const options: SweetAlertOptions = {
        icon: 'warning',
        title: 'Warning',
        html: `Your session will expire in <span id="session-timer">${
          diff < 60000 ? Math.floor(diff / 1000) : 60
        }</span> seconds<br />Do you want to extend the session?`,
        showCancelButton: true,
        confirmButtonText: 'Extend',
        cancelButtonText: 'Logout',
        timer: diff < 60000 ? diff : 60000,
        timerProgressBar: true,
        didRender: () => {
          const sessionTimer = document.getElementById('session-timer')
          let interval: NodeJS.Timeout
          if (sessionTimer && Number(sessionTimer.innerText) === 0) {
            clearInterval(interval)
          } else {
            interval = setInterval(() => {
              if (sessionTimer) {
                sessionTimer.innerText = (
                  Number(sessionTimer.innerText) - 1
                ).toString()
              }
            }, 1000)
          }
        }
      }

      Swal.fire(options).then((result) => {
        if (result.isConfirmed) {
          instance
            .get('/api/authen/profile')
            .then(({ data }) => {
              const user: User = {
                id: data.id,
                type: data.type,
                subType: data.sub_type,
                firstnameEN: data.firstname_en,
                lastnameEN: data.lastname_en,
                firstnameTH: data.firstname_th,
                lastnameTH: data.lastname_th,
                email: data.email,
                recentLogin: data.recent_login,
                lastLogin: data.last_login,
                permissions: data.permissions
              }
              dispatch({ type: 'SET_THEME', payload: 'default' })
              dispatch({ type: 'SET_USER', payload: user })
            })
            .catch((err) => {
              console.error(err)
              Router.push('/login')
            })
        } else if (result.dismiss === Swal.DismissReason.timer) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Your session has expired'
          })
          dispatch({ type: 'SET_THEME', payload: 'default' })
          dispatch({ type: 'SET_USER', payload: null })
          axios.get('/api/authen/logout')
          Router.push('/login')
        } else {
          dispatch({ type: 'SET_THEME', payload: 'default' })
          dispatch({ type: 'SET_USER', payload: null })
          axios.get('/api/authen/logout')
          Router.push('/login')
        }
      })
    }, diff)
  }
}

const handleVisibilityChange = (dispatch: Dispatch<DispatchAction>) => {
  if (document.visibilityState === 'visible') {
    setSessionTimeout(dispatch)
  }
}

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    const { dispatch } = response.config as CustomAxiosRequestConfig
    if (dispatch) {
      setSessionTimeout(dispatch)
      document.removeEventListener('visibilitychange', () => {
        handleVisibilityChange(dispatch)
      })
      document.addEventListener('visibilitychange', () => {
        handleVisibilityChange(dispatch)
      })
    }
    return response
  },
  (err) => {
    const { dispatch } = err.config as CustomAxiosRequestConfig
    if (err.response && err.response.status === 401 && dispatch) {
      dispatch({ type: 'SET_THEME', payload: 'default' })
      dispatch({ type: 'SET_USER', payload: null })
      Router.push('/login')
    }
    return Promise.reject(err)
  }
)

export default instance
