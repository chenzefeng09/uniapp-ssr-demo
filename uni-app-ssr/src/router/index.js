import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Location = () => import("../pages/location/location.vue")
const Test = () => import('../pages/location/test.vue')
const Index = () => import('../pages/index/index.vue')

export function createRouter () {
  return new Router({
    mode: 'history',
    fallback: false,
    routes: [
      { path: '/pages/location/location', component: Location },
      { path: '/pages/location/test', component: Test },
      { path: '/', component:Index }
    ]
  })
}
