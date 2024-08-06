import axios from 'axios'

const http = axios.create({
  baseURL: process.env.OTTERIO_BASE_URL,
  auth: {
    username: process.env.OTTERIO_USERNAME!,
    password: process.env.OTTERIO_PASSWORD!
  }
})

export default {
  http
}
