import { Http } from '@efox/helper'
import config from '@/config'
import vue from '@/main'
const instance = new Http({ baseURL: config.host })
instance.$before_request = function (o) {
  let preHost = ''
  if (vue.$route.query.s_bucket) {
    preHost = vue.$route.query.s_bucket
  }
  if (preHost)o.baseURL = o.baseURL.replace('https://', `https://${preHost}-`)
}
instance.$after_response = function (o) {
  if (o.status === 200 && o.data.code === 0) {
    o.data = o.data.data
  }
}
export default instance
