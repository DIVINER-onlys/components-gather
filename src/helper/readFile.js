export default function readFile (url, cb) {
  let xmlhttp = new XMLHttpRequest()
  console.log(`xmlhttp readFile`, url, cb)
  xmlhttp.onreadystatechange = function () {
    // readyState
    // 存有 XMLHttpRequest 的状态。从 0 到 4 发生变化。
    // 0: 请求未初始化
    // 1: 服务器连接已建立
    // 2: 请求已接收
    // 3: 请求处理中
    // 4: 请求已完成，且响应已就绪
    // status
    // 200: "OK"
    // 404: 未找到页面
    console.log(`xmlhttp`, xmlhttp.readyState, xmlhttp.status)
    if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
      // document.getElementById('myDiv1').innerHTML = xmlhttp.responseText
      cb && cb(xmlhttp.responseText)
    } else {
      // cb && cb('onload error', JSON.parse(xmlhttp.responseText))
    }
  }
  xmlhttp.open('GET', url, true)
  xmlhttp.send()
}
