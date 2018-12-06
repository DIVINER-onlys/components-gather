import store from '@/store'
import loadjs from 'loadjs'
const appId = 'hamo'
let HiidoEvent = window.hiidoEvent || undefined
loadjs('https://cdn.hiido.com/sdk/websdk.js', () => {
  HiidoEvent = window.hiidoEvent
})

export default function recordInWeb (eventId, actType, moreInfo = {}) {
  // console.log('===========海度上报=============')
  // console.log(store.state.userStore)
  console.log(moreInfo)
  if (!HiidoEvent) {
    loadjs('https://cdn.hiido.com/sdk/websdk.js', () => {
      HiidoEvent = window.hiidoEvent
      sendLog(eventId, actType, moreInfo)
    })
  } else {
    sendLog(eventId, actType, moreInfo)
  }

  function sendLog (eventId, actType, moreInfo = {}) {
    const hevent = new HiidoEvent(appId, eventId)
    const sys = checkSys()
    console.log(Object.keys(moreInfo).length)
    if (!actType) {
      return false
    }
    const uid = getUid()
    hevent.setUid(uid)
    hevent.setActtype(actType)
    Object.keys(moreInfo).length && hevent.setMoreinfo(JSON.stringify(moreInfo))
    hevent.setSys(sys)
    hevent.reportJudge()
  }
}

function getUid () {
  const userStore = store.state.userStore || {}
  const { userInfo = {} } = userStore
  return userInfo.uid || 0
}

function checkSys () {
  let sys = '4'
  const ua = window.navigator.userAgent
  if (/(ios)|(iphone)/i.test(ua)) {
    sys = '0'
  }
  if (/andriod/i.test(ua)) {
    sys = '2'
  }
  return sys
}
