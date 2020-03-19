/**
 * project: vue-sell-cube
 * @author panshicheng
 * @date 3/18/20
 * description:
 */

import axios from 'axios'
import { Message } from 'iview'
import { getToken } from './auth'
import config from '../common/config/index'

// 创建axios实例
const LOGIN_API = 'login.do'
const baseUrl = process.env.NODE_ENV === 'production' ? config.baseUrl.pro : config.baseUrl.dev
const service = axios.create({
  baseURL: baseUrl, // api 的 base_url
  withCredentials: true
  // timeout: 15000  请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  config.headers.Authorization = getToken()
  return config
}, error => {
  Promise.reject(error)
})

// response 拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    const responseURL = response.request.responseURL
    if (responseURL && responseURL.toString().indexOf(LOGIN_API) > 0) {
      return res
    }
    if (res && res.code !== config.apiSuccessCode) {
      Message.error(res.message)
      return Promise.reject(res.message)
    } else {
      return res
    }
  },
  error => {
    Message.error(config.apiErrorMsg)
    return Promise.reject(error)
  }
)

export default service
