import brower from '@/helper/brower'

function uploadLogo (cmd, centerPic, rightPic) {
  try {
    // console.log('上传 ', cmd, centerPic)
    // console.log('window ', window)
    if (brower.isIphone()) {
      // console.log('ios')
      let obj = { 'cmd': cmd, 'data': centerPic, 'data2': rightPic }
      window.webkit && window.webkit.messageHandlers.LogoAction.postMessage(JSON.stringify(obj))
    } else {
      console.log('安卓', centerPic, rightPic)
      window.LogoAction.invoke(cmd, centerPic, rightPic)
    }
  } catch (e) {
    console.log('上传错误 ', e)
  }
}

function uploadFile (cmd, fileType, data) {
  console.log(`uploadFile`, data)
  try {
    // console.log('上传 ', cmd, centerPic)
    // console.log('window ', window)
    if (brower.isIphone()) {
      // console.log('ios')
      let obj = { 'cmd': cmd, fileType, 'data': data }
      window.webkit && window.webkit.messageHandlers.LogoAction.postMessage(JSON.stringify(obj))
    } else {
      window.LogoAction.invoke(cmd, fileType, data)
    }
  } catch (e) {
    console.log('上传错误 ', e)
  }
}
export default { uploadLogo, uploadFile }
