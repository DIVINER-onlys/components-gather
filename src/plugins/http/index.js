import axios from 'axios'
import jsonp from './jsonp'
import qs from 'qs'

class Http {
  constructor (defaults) {
    this.$http = axios.create({ baseURL: defaults.baseURL || '' })
    this.$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded' // application/x-www-form-urlencoded or application/json
    this.$http.defaults.withCredentials = true // 增加cookie功能
    this.$http.interceptors.request.use((opt) => {
      this.$before_request && this.$before_request(opt)
      return opt
    }, function (error) {
      return Promise.reject(error)
    })

    this.$http.interceptors.response.use((response) => {
      this.$after_response && this.$$after_response(response)
      return response.data
    }, function (error) {
      return Promise.reject(error)
    })
    defaults = defaults || {}
    this.$http.defaults = { ...this.$http.defaults, ...defaults }
    //
    this.request = this.$http.request
    this.head = this.$http.head
  }

  method (method, url, data, headers) {
    let opt = { method, url }
    if (headers) opt.headers = headers
    switch (method) {
      case 'get':
        opt.params = data
        break
      default:
        opt.data = data
        if (this.$http.defaults.headers.post['Content-Type'] === 'application/x-www-form-urlencoded') {
          opt.data = qs.stringify(opt.data)
        }
        break
    }
    return this.$http(opt)
  }
  get (...args) {
    return this.method('get', ...args)
  }
  delete (...args) {
    return this.method('delete', ...args)
  }

  post (...args) {
    return this.method('post', ...args)
  }
  put (...args) {
    return this.method('put', ...args)
  }
  patch (...args) {
    return this.method('patch', ...args)
  }
  jsonp (...args) {
    return jsonp(...args)
  }
}

// 兼容 vue 调用方法 nameSpace 支持多实例 方便域名传递
const $http = {}
$http.install = function (Vue, defaults, nameSpace) {
  if (nameSpace) {
    Vue.$http = {}
    Vue.$http[nameSpace] = new Http(defaults)
  } else {
    Vue.$http = new Http(defaults)
  }
}

export { Http as default, $http }
