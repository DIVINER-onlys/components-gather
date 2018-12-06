import axios from 'axios'
import config from '@/config'
axios.defaults.baseURL = config.host || ''
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.withCredentials = true // 增加cookie功能
axios.interceptors.request.use(function (opt) {
  return opt
}, function (error) {
  return Promise.reject(error)
})

axios.interceptors.response.use(function (response) {
  return response.data
}, function (error) {
  return Promise.reject(error)
})

function httpMethod (method, url, data, headers) {
  let opt = { method, url }
  if (headers) opt.headers = headers
  switch (method) {
    case 'get':
      opt.params = data
      break
    default:
      opt.data = data
      break
  }
  return axios(opt)
}

export default {
  request: axios.request,
  get (...args) {
    return httpMethod('get', ...args)
  },
  delete (...args) {
    return httpMethod('delete', ...args)
  },
  head: axios.head,
  post (...args) {
    return httpMethod('post', ...args)
  },
  put (...args) {
    return httpMethod('put', ...args)
  },
  patch (...args) {
    return httpMethod('patch', ...args)
  }
}
