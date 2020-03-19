/**
 * project: vue-sell-cube
 * @author panshicheng
 * @date 3/19/20
 * description:
 */

/**
 * 封装window.open
 * @param url
 * @param paramStr
 */
import config from '../common/config/index'

/**
 * 封装window.open, 可以实现文件下载功能
 * @param url
 * @param paramStr
 * 实例
 * windowOpen('/employee/exportEmployee', paramStr)
 */
export const windowOpen = (url, paramStr) => {
  const baseUrl = process.env.NODE_ENV === 'production' ? config.baseUrl.pro : config.baseUrl.dev
  window.open(baseUrl + url + paramStr, '_self')
}

/**
 * 根据身份证号码带出性别和出生日期
 * @param idnumber
 */
export const analysisIdnumber = (idnumber) => {
  if (!idnumber || idnumber.length < 18) {
    return false
  }
  const birthday = idnumber.substring(6, 10) + '-' + idnumber.substring(10, 12) + '-' + idnumber.substring(12, 14)
  let gentleCode = ''
  if (parseInt(idnumber.substr(16, 1)) % 2 === 1) {
    gentleCode = '0'
  } else {
    gentleCode = '1'
  }
  return {
    birthday: birthday,
    gentle: gentleCode
  }
}

/**
 * 开始loading事件， iview
 * @param vm
 */
export const startLoading = (vm) => {
  vm.$Spin.show({
    render: (h) => {
      return h('div', [
        h('Icon', {
          class: 'demo-spin-icon-load',
          props: {
            type: 'ios-loading',
            size: 30
          }
        }),
        h('div', 'Loading...')
      ])
    }
  })
}

/**
 * 停止loading事件
 * @param vm
 */
export const stopLoading = (vm) => {
  vm.$Spin.hide()
}

/**
 * 跳转到指定路由
 * @param vue
 * @param name
 * @param params
 * eg: linkRouter(this, 'asset-edit', { id: res.data })
 */
export const linkRouter = (vue, name, params) => {
  vue.$router.push({
    name: name,
    params: params
  })
}
