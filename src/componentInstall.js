import vueMeta from 'vue-meta'
import hiido from '@/hiidoLog/hiido'
export default (Vue) => {
  Vue.use(hiido)
  Vue.use(vueMeta)
}
