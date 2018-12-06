import Vue from 'vue'
import Router from 'vue-router'
import home from '@/router/home'

Vue.use(Router)

export default new Router({
  // mode: 'abstract'
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    ...home
  ]
})
