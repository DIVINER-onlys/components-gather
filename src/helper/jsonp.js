/*
 * options: Object,包含 url，data，callback
 * url 为请求地址
 * data 为请求参数
 * callback 为请求成功之后的回调函数
 */
function jsonp (options) {
  let id = 0
  const container = document.getElementsByTagName('head')[0]
  if (!options || !options.url) return

  const scriptNode = document.createElement('script')
  const data = options.data || {}
  let url = options.url
  const callback = options.callback
  const fnName = 'jsonp' + id++

  // 添加回调函数
  data['callback'] = fnName
  scriptNode.src = format(data, url)

  // 传递的是一个匿名的回调函数，要执行的话，暴露为一个全局方法
  window[fnName] = function (ret) {
    callback && callback(ret)
    container.removeChild(scriptNode)
    delete window[fnName]
  }

  // 出错处理
  scriptNode.onerror = function () {
    callback && callback({ //eslint-disable-line
      error: 'error'
    }) //eslint-disable-line
    container.removeChild(scriptNode)
    window[fnName] && delete window[fnName]
  }

  scriptNode.type = 'text/javascript'
  container.appendChild(scriptNode)
}

function format (data, url) {
  let params = []
  for (let key in data) {
    params.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
  }
  url = url.indexOf('?') > 0 ? (url + '&') : (url + '?')
  url += params.join('&')
  return url
}

export default jsonp
