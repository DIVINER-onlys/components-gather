import vueMeta from 'vue-meta'
import hiido from '@/hiidoLog/hiido'
import Toast from '@/components/mobile/toast'
import '@/components/mobile/toast/toast.css'

export default (Vue) => {
  Vue.use(hiido)
  Vue.use(vueMeta)
  Vue.use(Toast, {
    defaultType: 'center',
    duration: '2500',
    wordWrap: true
  })
}
