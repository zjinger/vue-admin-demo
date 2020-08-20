import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layout'
Vue.use(VueRouter)
/* Router Modules 业务模块 */
import workspaceRouter from './modules/workspace'

export const routes = [{
  path: '/',
  name: 'Layout',
  component: Layout,
  meta: {
    hideInMenu: true,
  },
  redirect: {
    name: 'Dashboard'
  },
  children: [{
    path: '/dashboard',
    name: 'Dashboard',
    meta: {
      title: '主页',
      hideInMenu: false,
      icon: 'dashboard',
      closable: false
    },
    component: () => import('@/views/dashboard'),
  }],
},
//刷新
{
  path: '/redirect',
  component: Layout,
  name: 'Redirect',
  meta: {
    hideInMenu: true,
  },
  children: [{
    path: '/redirect/:path*',
    component: () => import('@/views/redirect'),
    meta: {
      hideInMenu: true,
      noCache: true
    }
  }]
},
...workspaceRouter,
{
  path: '*',
  meta: {
    hideInMenu: true,
  },
  component: () => import('@/views/error/NotFound')
}
]

export const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
