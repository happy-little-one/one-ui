import axios, { AxiosRequestConfig } from 'axios'
import { message } from 'antd'

interface Config extends AxiosRequestConfig {
  note?: string // 操作成功后的弹出消息
}

export interface Success<T> {
  success: true
  data: T
}

interface Failure {
  success: false
  msg: string
  code: number
}

export type Response<T> = Success<T> | Failure

const http = axios.create({
  baseURL: 'https://www.fastmock.site/mock/003b0c1c8962b5b9a59af64f42a053dd/api',
})

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
  async get<T>(url: string, config: Config = {}) {
    const { data } = await http.get<Response<T>>(url, config)

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
  async post<T>(url: string, body?: object, config?: Config) {
    const { data } = await http.post<Response<T>>(url, body, config)

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

export interface ResponseList<T> {
  list: Array<T>
  total: number
}

export default request
