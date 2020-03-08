/**
 * project: vue-sell-cube
 * @author panshicheng
 * @date ${DATE}
 * description:
 */
import { get } from './helper'

const getSeller = get('/api/seller')
const getGoods = get('/api/goods')
const getRating = get('/api/ratings')
export {
  getSeller,
  getGoods,
  getRating
}
