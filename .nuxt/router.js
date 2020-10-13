import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _2dabf920 = () => interopDefault(import('../pages/course_reviews.vue' /* webpackChunkName: "pages/course_reviews" */))
const _4dd1dd42 = () => interopDefault(import('../pages/courses.vue' /* webpackChunkName: "pages/courses" */))
const _a8e518f8 = () => interopDefault(import('../pages/sign_up.vue' /* webpackChunkName: "pages/sign_up" */))
const _12c5e065 = () => interopDefault(import('../pages/teacher_reviews.vue' /* webpackChunkName: "pages/teacher_reviews" */))
const _7d9ac48c = () => interopDefault(import('../pages/teachers.vue' /* webpackChunkName: "pages/teachers" */))
const _f4951d8e = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

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
    path: "/course_reviews",
    component: _2dabf920,
    name: "course_reviews"
  }, {
    path: "/courses",
    component: _4dd1dd42,
    name: "courses"
  }, {
    path: "/sign_up",
    component: _a8e518f8,
    name: "sign_up"
  }, {
    path: "/teacher_reviews",
    component: _12c5e065,
    name: "teacher_reviews"
  }, {
    path: "/teachers",
    component: _7d9ac48c,
    name: "teachers"
  }, {
    path: "/",
    component: _f4951d8e,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
