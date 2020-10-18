import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _03e2a81a = () => interopDefault(import('../pages/courses.vue' /* webpackChunkName: "pages/courses" */))
const _d773e4ac = () => interopDefault(import('../pages/forms.vue' /* webpackChunkName: "pages/forms" */))
const _5ef5e3d0 = () => interopDefault(import('../pages/sign_up.vue' /* webpackChunkName: "pages/sign_up" */))
const _3b2e55a6 = () => interopDefault(import('../pages/teachers.vue' /* webpackChunkName: "pages/teachers" */))
const _118abe66 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/courses",
    component: _03e2a81a,
    name: "courses"
  }, {
    path: "/forms",
    component: _d773e4ac,
    name: "forms"
  }, {
    path: "/sign_up",
    component: _5ef5e3d0,
    name: "sign_up"
  }, {
    path: "/teachers",
    component: _3b2e55a6,
    name: "teachers"
  }, {
    path: "/",
    component: _118abe66,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
