function matchString (str, arr) {
  if (str === '' || arr.length === 0) {
    return false
  }
  for (let v = 0; v < arr.length; v++) {
    if (str && str.indexOf(arr[v]) > 0) {
      return true
    }
  }
  return false
}
const ua = navigator.userAgent.toLowerCase()

function isWeixin () { // 判断是否微信
  let arr = ['micromessenger']
  return matchString(ua, arr)
}

// 是否苹果客户端
function isIphone () {
  let arr = ['ipad', 'iphone', 'ipod']
  return matchString(ua, arr)
}

// 是否Android
function isAndroid () {
  let arr = ['android']
  return matchString(ua, arr)
}

function isQQ () {
  let arr = ['qq']
  return matchString(ua, arr)
}

function isWeibo () {
  let arr = ['weibo']
  return matchString(ua, arr)
}

function isSafari () {
  console.log(`isSafari`, ua)
  // const arr = ['safari']
  return /safari/.test(ua) && !/chrome/.test(ua)
}

function env () {
  return {
    isIphone: isIphone(),
    isAndroid: isAndroid(),
    isWeixin: isWeixin(),
    isQQ: isQQ(),
    isWeibo: isWeibo(),
    isSafari: isSafari()
  }
}

export default env()
