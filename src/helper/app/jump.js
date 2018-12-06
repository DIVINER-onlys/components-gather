import { isWeixin, isIphone } from '../brower'
import config from '@/config'

let appLink = {
  iosLink: 'https://ios.hamo.tv', // ios站外跳APP使用，站内使用scheme命令
  common: 'hamo://com.incubation.video', // 通用scheme命令，站内都用scheme，站外ios先用iOSLink
  extra: '' // 站外和站内跳转命令不同时，安卓使用extra
}
const AppStore = 'https://itunes.apple.com/us/app/noizz-swag-music-video-edito/id1401229817?mt=8' // App Store
const yyb = 'https://play.google.com/store/apps/details?id=com.gokoo.hamo' // Google Play测试地址，有正式地址时需要替换成正式地址

let clicked = false
let timeout = null

function setAppLink (map) {
  appLink = Object.assign(appLink, map)
  // console.log(`setAppLink`, appLink)
}

function isApp () {
  const ua = window.navigator.userAgent.toLowerCase()
  if (/hamo/i.test(ua)) {
    return true
  }
  return false
}

function download () {
  if (clicked || timeout || isIphone()) return
  const start = Date.now()
  clicked = true
  // 避免有APP时也进入应用宝，设置延迟执行
  timeout = setTimeout(() => {
    clicked = false
    timeout = null
    // 添加(Date.now() - start) < 2000 判断，避免下载完之后，回到页面又跳转应用宝
    console.log(Date.now() - start)
    if ((Date.now() - start) < 3050) {
      console.log(`timeline`, Date.now() - start)
      window.location.href = yyb
    }
  }, 3000)
}

function goto (map = {}) {
  appLink = Object.assign(appLink, map)
  const { iosLink, common, extra } = appLink
  if (isApp()) {
    window.YYApiCore.invokeClientMethod('ui', 'goto', {
      'uri': common
    })
    return
  }
  if (isWeixin()) {
    window.location.href = isIphone() ? AppStore : yyb
  } else {
    window.location.href = isIphone() ? iosLink : extra || common
    console.log('iosLink', iosLink)
  }
  download()
}

export default {
  /*
  * 去到直播间
  */
  liveRoom (uid, sid) {
    appLink = Object.assign(appLink, {
      iosLink: `https://ios.hamo.tv/liveroom/detail?sid=${sid}&uid=${uid}&from=h5`,
      common: `hamo://liveroom/detail?sid=${sid}&uid=${uid}&from=h5`
    })
    goto()
  },

  h5 (url, extra) { // 去到H5
    appLink = Object.assign(appLink, {
      iosLink: `https://ios.hamo.tv/web?feature=5&url=${encodeURIComponent(url)}`,
      common: `hamo://Web/Features/5/Url/${encodeURIComponent(url)}`,
      extra: extra || ''
    })
    goto()
  },

  /**
   * 跳新的webview
   */
  webview (url) {
    let split = (config.router && config.router.mod === 'hash') ? '/#' : ''
    // window.location.href = (url.indexOf('http') > -1) ? url : `${window.location.protocol}//${window.location.host}${window.location.pathname}${split}${url}`
    if (isApp()) {
      // let split = (config.router && config.router.mod === 'hash') ? '/#' : ''
      const href = (url.indexOf('http') > -1) ? url : `${window.location.protocol}//${window.location.host}${window.location.pathname}${split}${url}`
      // return console.log(`webview ${href}`)
      window.YYApiCore.invokeClientMethod('ui', 'goto', {
        'uri': `hamo://web/h5?url=${encodeURIComponent(href)}`
      })
    } else {
      window.location.href = (url.indexOf('http') > -1) ? url : `${window.location.protocol}//${window.location.host}${window.location.pathname}${split}${url}`
      // (url.indexOf('http') > -1) ? window.location.href = url : Vue.$router.push(url)
    }
  },
  app: goto,
  setAppLink,
  isApp: isApp(),
  download,
  AppStore,
  yyb
}
