import Vue from 'vue'
import VueRouter from 'vue-router'

import Main from "../views/main"

Vue.use(VueRouter)

export const routesMap = [
{
  path: '/sys',
  name: 'sys',
  component: Main,
  meta: {
    id: "1",
    icon: 'ios-paper',
    title: '内容管理',
  },
  children:[{
    path: 'sys_article',
    name: 'article',
    meta: {
      icon: 'ios-paper',
      title: '文章管理',
    },
    component: () =>import("@/views/article")
  },{
    path: 'sys_discuss',
    name: 'discuss',
    meta: {
      icon: 'ios-paper',
      title: '评论管理',
    },
    component: () =>import("@/views/discuss")
  },{
    path: 'sys_info',
    name: 'info',
    meta: {
      icon: 'ios-paper',
      title: '举报管理',
    },
    component: () =>import("@/views/info")
  }]
}
]

export const rout=[
  {
    path: '/',
    redirect: '/home',
    component: Main,
    meta:{},
    children: [{
      path: '/home',
      name: 'home',
      meta: {
        // hideInMenu: true,
        title: '首页',
      },
      component: () =>
        import('@/views/Home.vue')
    }]
  }
]

// const router = new VueRouter({
//   mode: 'history',
//   routes,
//   routesMap
// })

// export default router