import Vue from 'vue'
import Vuex from 'vuex'
import config from '@/config'
Vue.use(Vuex)
const store = new Vuex.Store({
  strict: (config.env === 'production'), // 在非生产环境下，使用严格模式
  modules: {}
})

store.register = (name, storeModule) => {
  if (!store.state[name]) {
    store.registerModule(name, storeModule)
  }
}
export default store
