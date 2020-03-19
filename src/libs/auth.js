/**
 * project: vue-sell-cube
 * @author panshicheng
 * @date 3/18/20
 * description:
 */
import Cookies from 'js-cookie'
import packageObject from '../../package'

const tokenKey = 'gz-user-token'

export const getToken = () => {
  return Cookies.get(`${tokenKey}-${packageObject.version}`)
}

export const setToken = (token) => {
  return Cookies.set(`${tokenKey}-${packageObject.version}`, token)
}

export const removeToken = () => {
  return Cookies.remove(`${tokenKey}-${packageObject.version}`)
}
