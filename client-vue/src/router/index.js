import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/home',
    // name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
    children: [
      {
        path: '',
        component: () => import('@/views/Container.vue')
      },
      {
        path: '/container',
        name: 'container',
        component: () => import('@/views/Container.vue')
      },
      {
        path: '/personalInfo',
        name: 'personalInfo',
        component: () => import('@/views/personalInfo/personalInfo.vue')
      },
      {
        path: '/moneyList',
        name: 'moneyList',
        component: () => import('@/views/moneyManage/moneyList.vue')
      },
      {
        path: '/moneyList2',
        name: 'moneyList2',
        component: () => import('@/views/moneyManage/moneyList2.vue')
      },
      {
        path: '/userList',
        name: 'userList',
        component: () => import('@/views/userManage/userList.vue')
      },
      {
        path: '/setting',
        name: 'setting',
        component: () => import('@/views/set/setting.vue')
      },
    ]
  },
  {
    path: '/error404',
    name: 'error404',
    component: () => import( /* webpackChunkName: "error404" */ '@/views/Error404.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import( /* webpackChunkName: "register" */ '@/views/Register.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import( /* webpackChunkName: "login" */ '@/views/Login.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
