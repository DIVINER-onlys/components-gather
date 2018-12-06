import 'babel-polyfill'
import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import '@/filter'
// import '@/registerServiceWorker'
import install from '@/componentInstall'
import { loadLanguageAsync, i18n } from '@/lang'// 多语言版本
import config from '@/config'
import app from '@/helper/app'
import { isQQ } from '@/helper/brower'
install(Vue)
Vue.config.productionTip = false

// 路由规范化管理
router.beforeEach(async (to, from, next) => {
  // 断网处理
  if (app.isApp()) {
    let networkStatus = await app.networkStatus()
    if (!Number(networkStatus)) {
      vue.$toast('Network error')
      return
    }
  }
  // 设置网页title
  if (to.meta.title) {
    window.document.title = to.meta.title
  }
  // 国际化引入
  if (to.meta.lang) {
    loadLanguageAsync(to).then(() => {
      next()
    }).catch((e) => {
      next()
    })
    return
  }

  if (window.location.host === 'ios.hamo.tv') {
    window.location.href = isQQ() ? app.goto.yyb : app.goto.AppStore
  }
  // 路由
  next()
})
console.log('测试callback脚本是否执行')
// 实例化vue 并且让外部组件 以及 vuex调用
const vue = new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
export default vue

config.env !== 'production' && import(/* webpackChunkName: "vconsole" */'vconsole').then((cls) => {
  const Cls = cls.default
  return new Cls()
})
