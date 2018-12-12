import http from '@/helper/http/axios'
// import config from '@/config'

class HttpCls {
  post (url, map, header, noWithCredentials) {
    return this.method('post', url, map, header, noWithCredentials)
  }
  /**
   *
   * @param {*} url
   * @param {*} map
   * @param {*} isNeedSign 用户ticket
   */
  get (url, map, header, noWithCredentials) {
    return this.method('get', url, map, header, noWithCredentials)
  }
  patch (url, map, header, noWithCredentials) {
    return this.method('patch', url, map, header, noWithCredentials)
  }
  put (url, map, header, noWithCredentials) {
    return this.method('put', url, map, header, noWithCredentials)
  }

  /**
   当 code = 0 ，请求处理成功
   当 code = -1，用户未登录
   当 code = 1 , 客户端错误
   当 code = 2 ，系统错误
   * @param {*} method
   * @param {*} url
   * @param {*} mapData
   * @param {*} isNeedSign
   */
  async method (method, url, data, header, noWithCredentials) {
    let map = data
    header = header || {}
    /* header['content-type'] = 'application/json;charset=utf-8' */
    // url = (url.indexOf('http') > -1) ? url : config.host + url
    const d = await http[method](url, map, header, noWithCredentials)
    return d
  }

  /*
   错误码统一处理

  当 code = -1，用户未登录
  当 code = 1 , 客户端错误
  当 code = 2 ，系统错误
  当 code = -2 ，含有敏感词
*/
  error (e) {
    switch (e.code) {
      case -1:
        // Vue.$toast('您还未登录', 3000)
        /* const appVersion = await app.appVersion()
        console.log(`appVersion`, appVersion)
        if (VersionCompare(appVersion, '1.5.0')) {
          app.showSMSLoginView()
        } else {
          app.showLoginView()
        } */
        break
      default:
        // e && e.message && Vue.$toast(e.message, 3000)
        break
    }
  }

  /**
   * 海度统计
   */
  /* hiido (id = 20023727, act_type = 101, sys = 'web') {
    const info = window.activityInfo
    const {roomName, season, roomId} = info.activityBasicInfo
    let matchNum = 0
    if (info.activity20) {
      matchNum = info.activity20.battleMatchView.matchNum
    } else if (info.activity30) {
      matchNum = info.activity30.battleMatchView.matchNum
    }
    const hevent = new hiidoEvent('suda', id)
    hevent.setActtype(act_type)
    hevent.setSys(sys)
    hevent.setMoreinfo({season, roomId, roomName, matchNum})
    hevent.reportJudge()
  } */
}

const cls = new HttpCls()
export default cls
