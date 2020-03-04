import axios from 'axios'
import { ERR_OK } from './config'

export function getSeller () {
  return axios.get('/api/seller').then((res) => {
    if (res.data.errno === ERR_OK) {
      return res.data
    }
  })
}
