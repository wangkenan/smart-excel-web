import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layout'

Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    name: '',
    redirect: '/',
    component: Layout,
    children: [
      {
        path: '/',
        name: 'Index',
        component: () => import(/* webpackChunkName: "Index" */ '@/views/Index.vue'),
        meta: { title: '首页' }
      }
    ]
  },
  {
    path: '/goods',
    name: '',
    redirect: '/goods/category/1',
    component: Layout,
    children: [
      {
        path: '/goods/category/:id',
        name: 'Category',
        component: () => import(/* webpackChunkName: "Category" */ '@/views/goods/List.vue'),
        meta: { title: '数据分析' }
      },
      {
        path: '/goods/info/:id',
        name: 'Category',
        component: () => import(/* webpackChunkName: "Category" */ '@/views/goods/Info.vue'),
        meta: { title: '数据详情' }
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/user/Login.vue'),
    meta: { active: '/', title: '登录页面' }
  }
]
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})

export default router
