import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _0e8e224a = () => interopDefault(import('../pages/courses.vue' /* webpackChunkName: "pages/courses" */))
const _fa182adc = () => interopDefault(import('../pages/forms.vue' /* webpackChunkName: "pages/forms" */))
const _a0dfbe68 = () => interopDefault(import('../pages/login.vue' /* webpackChunkName: "pages/login" */))
const _69a15e00 = () => interopDefault(import('../pages/sign_up.vue' /* webpackChunkName: "pages/sign_up" */))
const _d4672084 = () => interopDefault(import('../pages/teachers.vue' /* webpackChunkName: "pages/teachers" */))
const _342f0496 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

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
    component: _0e8e224a,
    name: "courses"
  }, {
    path: "/forms",
    component: _fa182adc,
    name: "forms"
  }, {
    path: "/login",
    component: _a0dfbe68,
    name: "login"
  }, {
    path: "/sign_up",
    component: _69a15e00,
    name: "sign_up"
  }, {
    path: "/teachers",
    component: _d4672084,
    name: "teachers"
  }, {
    path: "/",
    component: _342f0496,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
