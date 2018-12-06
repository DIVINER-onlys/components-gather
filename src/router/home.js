const page = 'pages'
export default [
  { path: '/', meta: { title: 'Welcome to Efox！' }, component: () => import(/* webpackChunkName: "[request]" */`@/${page}/home/index.vue`) }
]
