/**
 * project: vue-sell-cube
 * @author panshicheng
 * @date 2020/3/3
 * description:
 */
import { get } from './helpers'
const getSeller = get('/api/seller')
const getGoods = get('/api/goods')
export {
  getSeller,
  getGoods
}
