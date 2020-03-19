/**
 * project: vue-sell-cube
 * @author panshicheng
 * @date 3/3/20
 * description:
 */

export default {
  /**
   * 项目名称
   */
  projectName: 'seller',
  /**
   * @description 配置显示在浏览器标签的title
   */
  title: 'sell',
  /**
   * @description token在Cookie中存储的天数，默认1天
   */
  cookieExpires: 1,
  /**
   * @description 是否使用国际化，默认为false
   *              如果不使用，则需要在路由中给需要在菜单中展示的路由设置meta: {title: 'xxx'}
   *              用来在菜单中显示文字
   */
  useI18n: true,
  /**
   * @description api请求基础路径
   */
  baseUrl: {
    /**
     * 本地开发地址
     */
    dev: 'http://127.0.0.1:9090',

    /**
     * 生产环境
     */
    pro: '/sell/api/'
  },

  /**
   * 接口返回成功编码
   */
  apiSuccessCode: '1',

  /**
   * 接口失败全局提示
   */
  apiErrorMsg: '操作失败，请稍后再试！',
  /**
   * @description 默认打开的首页的路由name值，默认为home
   */
  homeName: 'home',
  /**
   * @description 需要加载的插件
   */
  companyRoot: 1,

  /**
   * 富文本编辑器默认功能
   */
  editorMenu: [
    'bold',
    'italic',
    'underline',
    'strikeThrough',
    'foreColor',
    'list',
    'justify',
    'image',
    'table',
    'link',
    'strikeThrough',
    'undo',
    'redo'
  ]
}
