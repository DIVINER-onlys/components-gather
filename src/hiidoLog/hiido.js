import Vue from 'vue'
// import recordInWeb from '@/components/hiidoLog/recordInWeb.js'
import logsMapInit from './logsMapInit'
const Hiido = {}
Hiido.install = function (Vue, options) {
  Vue.prototype.$hiido = function (moduleNames) {
    return logsMapInit(moduleNames)
  }
}
Vue.use(Hiido)
export default {}
