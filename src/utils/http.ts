import axios, { AxiosRequestConfig } from 'axios'
import { message } from 'antd'

interface Config extends AxiosRequestConfig {
  note?: string
}

interface Success {
  success: true
  data: any
}

interface Failure {
  success: false
  msg: string
  code: number
}

type Response = Success | Failure

const http = axios.create()

http.interceptors.response.use(
  res => {
    const { data } = res
    if (data.code === 401) {
      message.info('登录状态失效，请重新登录')
      window.location.hash = '/login'
      return Promise.reject(data.code)
    }
    return res
  },
  error => {
    message.error(error.message)
    throw error
  },
)

const request = {
  async get(url: string, config: Config = {}) {
    const { data } = await http.get<Response>(url, config)

    if (data.success === true) {
      if (config && config.note) {
        message.success(config.note)
      }
      return data.data
    } else {
      message.error(data.msg)
      return Promise.reject(data.code)
    }
  },
  async post(url: string, body?: object, config?: Config) {
    const { data } = await http.post<Response>(url, body, config)

    if (data.success === true) {
      if (config && config.note) {
        message.success(config.note)
      }
      return data.data
    } else {
      message.error(data.msg)
      return Promise.reject(data.code)
    }
  },
}

export default request
