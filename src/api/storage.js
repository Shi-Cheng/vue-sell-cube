/**
 * project: vue-sell-cube
 * @author panshicheng
 * @date 2020/3/8
 * description:
 */
import storage from 'better-storage'

const FAVORITE_KEY = '__favorite__'

export function toSaveFavorite (id, key, val) {
  const seller = storage.get(FAVORITE_KEY, {})
  if (!seller[id]) {
    seller[id] = {}
  }
  seller[id][key] = val
  storage.set(FAVORITE_KEY, seller)
}

export function toLoadFavorite (id, key, def) {
  const seller = storage.get(FAVORITE_KEY, {})
  if (!seller[id]) {
    return def
  }
  return seller[id][key] || def
}
