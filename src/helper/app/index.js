import cookie from '../cookie'
import YYApiCore from './YYApiCore'
import { isIphone } from '../brower'
import { VersionCompare } from '@/helper/v'
import goto from './jump'
import member from './member'
import media from './media'
// console.log(`member`, member)
//
function isApp () {
  const ua = window.navigator.userAgent.toLowerCase()
  if (/hamo/i.test(ua)) {
    return true
  }
  return false
}

// 通过cookie 获取用户数据 uid nickName headerUrl
function getUserByCookie (cb) {
  let d = {}
  const cookies = cookie.parse(document.cookie)
  const uid = cookies.yyuid
  if (uid) {
    d = {
      nickName: cookies.username || '',
      uid,
      headerUrl: cookies.headerUrl || ''
    }
  }
  cb && cb(d)
}
export default {
  /*!
   *分享功能
   *
   * @param { url, text, title, imageUrl, titleUrl, shareType, image }
   * @param text 分享描述
   * @param imageUrl, 分享图
   * @param titleUrl, 标题的网络链接，仅在人人网、QQ空间使用
   * @param shareType 分享类型，默认没有类型，包括以下几种值
   * @param shareType 1: SHARE_TEXT, 2: SHARE_IMAGE, 4: SHARE_WEBPAGE, 5: SHARE_MUSIC, 6: SHARE_VIDEO, 7: SHARE_APPS, 8: SHARE_FILE, 9: SHARE_EMOJI, 10: SHARE_ZHIFUBAO,  11: SHARE_WXMINIPROGRAM
   * 只分享图片时，使用image，不需要其他参数
  */
  appShare (map) {
    return YYApiCore.invokeClientMethod('ui', 'showShareDialog', map)
  },
  // 跳转到播放列表
  jumpPlayList () {
    return YYApiCore.invokeClientMethod('ui', 'jumpPlayList')
  },
  // 返回
  navigationBack () {
    return YYApiCore.invokeClientMethod('ui', 'navigationBack')
  },
  // 跳转到绑定手机号码
  pushBindPhoneView () {
    return YYApiCore.invokeClientMethod('ui', 'pushBindPhoneView')
  },
  // 返回上层视图
  popViewController () {
    return YYApiCore.invokeClientMethod('ui', 'popViewController')
  },
  // 显示短信登陆界面/*  */
  showSMSLoginView () {
    return YYApiCore.invokeClientMethod('ui', 'showSMSLoginView')
  },
  // 显示登陆界面
  showLoginView () {
    console.log(`显示登录界面showLoginView`)
    return YYApiCore.invokeClientMethod('ui', 'showLoginView')
  },
  // hamo app 登录页面
  showLoginDialog () {
    console.log(`显示hamo app 登录页面`)
    return YYApiCore.invokeClientMethod('ui', 'showLoginDialog')
  },
  // 显示loading动画
  showProgressWindow (show) {
    return YYApiCore.invokeClientMethod('ui', 'showProgressWindow', {
      show: show
    })
  },
  // 屏蔽下拉刷新功能
  setPullRefreshEnable (refresh = true) {
    // console.log(`YYApiCore.invokeClientMethod('ui', 'setPullRefreshEnable', {refresh})`, refresh)
    return YYApiCore.invokeClientMethod('ui', 'setPullRefreshEnable', { isRefresh: refresh })
  },
  // 获取用户数据 uid nickName headerUrl
  getLoginUserInfo () {
    if (isApp()) return new Promise(resolve => YYApiCore.invokeClientMethod('data', 'getLoginUserInfo', {}, resolve))
    return new Promise(resolve => getUserByCookie(resolve))
  },
  // 判断是否登陆
  isLogined () {
    return new Promise(resolve => YYApiCore.invokeClientMethod('data', 'isLogined', {}, resolve))
  },
  /// //v1.1 加入设备功能///////////////////
  // 获取设备信息
  deviceInfo () {
    return new Promise(resolve => YYApiCore.invokeClientMethod('device', 'deviceInfo', {}, resolve))
  },
  // 设备名称
  deviceName () {
    return new Promise(resolve => YYApiCore.invokeClientMethod(' ', 'deviceName', {}, resolve))
  },
  // app版本
  appVersion () {
    // return YYApiCore.invokeClientMethod('device', 'appVersion', {})
    console.log(`appVersion`)
    return new Promise(resolve => YYApiCore.invokeClientMethod('device', 'appVersion', {}, resolve))
  },
  appBuild () {
    return new Promise(resolve => YYApiCore.invokeClientMethod('device', 'appBuild', {}, resolve))
  },
  systemName () {
    return new Promise(resolve => YYApiCore.invokeClientMethod('device', 'systemName', {}, resolve))
  },
  systemVersion () {
    return new Promise(resolve => YYApiCore.invokeClientMethod('device', 'systemVersion', {}, resolve))
  },
  // 是否app内打开网页
  isMobileSODA () {
    return new Promise(resolve => YYApiCore.invokeClientMethod('device', 'isMobileSODA', {}, resolve))
  },
  networkStatus () {
    // return YYApiCore.invokeClientMethod('device', 'networkStatus')
    return new Promise(resolve => YYApiCore.invokeClientMethod('device', 'networkStatus', {}, resolve))
  },
  carrier () {
    return new Promise(resolve => YYApiCore.invokeClientMethod('device', 'carrier', {}, resolve))
  },
  carrierName () {
    return new Promise(resolve => YYApiCore.invokeClientMethod('device', 'carrierName', {}, resolve))
  },
  imei () {
    return new Promise(resolve => YYApiCore.invokeClientMethod('device', 'imei', {}, resolve))
  },
  imsi () {
    return new Promise(resolve => YYApiCore.invokeClientMethod('device', 'imsi', {}, resolve))
  },
  deviceMac () {
    return new Promise(resolve => YYApiCore.invokeClientMethod('device', 'deviceMac', {}, resolve))
  },
  getLocation () {
    return new Promise(resolve => YYApiCore.invokeClientMethod('device', 'getLocation', {}, resolve))
  },
  environment () {
    return new Promise(resolve => YYApiCore.invokeClientMethod('device', 'environment', {}, resolve))
  },
  isMobileOnePiece () {
    return new Promise(resolve => YYApiCore.invokeClientMethod('device', 'isMobileOnePiece', {}, resolve))
  },
  hdid () {
    return new Promise(resolve => YYApiCore.invokeClientMethod('device', 'hdid', {}, resolve))
  },
  /**
   * 监听所有方法
   * onLogin  登陆完成
   * onPublishCompletion  发布视频完成事件
   * onPublishReviewCompletion  视频审核通知事件
   */
  listenEvent (event, cb) {
    return YYApiCore.invokeClientMethod('ui', 'addEventCallback', { event }, cb)
  },
  /// /////////////////////
  /**
   * setNavigationBar 设置头部功能
   * @param {*} title {"title":"红包","backgroundColor":0xff0000}
   * @param {*} rightItem {"id":1,"title":"提现","enabled":1,"hidden":0,"color":0xffffff}}
   * cb
   * @param {*} rightItem {"id":1,"enabled":1,"hidden":0}}
   */
  setNavigationBar (title, rightItem, cb, leftItem) {
    const config = {}
    if (title) {
      config.title = title
    }
    if (rightItem) {
      config.rightItem = rightItem
    }
    if (leftItem) {
      config.leftItem = leftItem
    }
    return YYApiCore.invokeClientMethod('ui', 'setNavigationBar', config, cb)
  },
  /**
   * setContextAppearRefresh
   * 重新进入webview时刷新页面
   * @param {*} refresh
   */
  setContextAppearRefresh (refresh = true) {
    return new Promise(resolve => YYApiCore.invokeClientMethod('ui', 'setContextAppearRefresh', { refresh }, resolve))
  },
  // 获取 webTicket
  webTicket () {
    return new Promise(resolve => YYApiCore.invokeClientMethod('data', 'webTicket', {}, resolve))
  },
  // 获取uid
  getUid () {
    return new Promise(resolve => YYApiCore.invokeClientMethod('data', 'myUid', {}, resolve))
  },
  // 监控是否上传完毕
  publishCallback (cb) {
    if (isApp() && isIphone()) {
      // console.log('new Promise addEventCallback')
      return YYApiCore.invokeClientMethod('ui', 'addEventCallback', { event: 'onPublishCompletion' }, cb)
    }
  },
  // 监控视频是否审核完
  publishReviewCallback (cb) {
    if (isApp() && isIphone()) {
      // console.log('new Promise onPublishReviewCompletion')
      return YYApiCore.invokeClientMethod('ui', 'addEventCallback', { event: 'onPublishReviewCompletion' }, cb)
    }
  },
  isApp,
  goto,
  member,
  media,
  async checkLogin () {
    const appVersion = await this.appVersion()
    if (VersionCompare(appVersion, '1.5.0')) {
      this.showSMSLoginView()
    } else {
      this.showLoginView()
    }
  }
}
