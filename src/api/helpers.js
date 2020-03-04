/**
 * project: vue-sell-cube
 * @author panshicheng
 * @date 2020/3/3
 * description:
 */

import axios from 'axios'
import { ERR_OK } from './config'

export function get (url) {
  return function (params) {
    return axios.get(url, {
      params
    }).then((res) => {
      const { errno, data } = res.data
      if (errno === ERR_OK) {
        return data
      }
    })
  }
}
