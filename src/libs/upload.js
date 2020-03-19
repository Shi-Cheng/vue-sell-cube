/**
 * project: vue-sell-cube
 * @author panshicheng
 * @date 3/18/20
 * description:
 */

import axios from 'axios'
import config from '../common/config/index'
import Vue from 'vue'
import { Message } from 'iview'
import { getToken } from './auth'

const baseUrl = process.env.NODE_ENV === 'production' ? config.baseUrl.pro : config.baseUrl.dev

const upload = axios.create({
  baseURL: baseUrl, // api 的 base_url
  withCredentials: true,
  headers: { 'Content-Type': 'multipart/form-data' }
  // timeout: 15000  请求超时时间
})

// request拦截器
upload.interceptors.request.use(config => {
  config.headers.Authorization = getToken()
  return config
}, error => {
  Promise.reject(error)
})

upload.interceptors.response.use(
  response => {
    const res = response.data
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

Vue.config.productionTip = false
Vue.prototype.instance = upload
export default upload
