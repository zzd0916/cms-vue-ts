import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../views/Layout/Index.vue';
// import Login from '@/views/Login.vue'
// import Password from '@/views/Password.vue'

Vue.use(VueRouter)

/**
 * @reference show  左侧菜单是否显示, ture显示
 * @reference router-name 路由名称，必须填写
 * @reference meta {
 *      title : '首页'  左侧菜单名称
 *      icon : 'fa fa-user-o'  左侧菜单图标
 * }
 * 
 */

export const asyncRouterMap = [
  {
    path: '/',
    name: 'dashboard',
    component: Layout,
    show: true,
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          title: '首页',
          icon: 'fa fa-home'
        },
        component: () => import('@/views/Home.vue')
      }
    ]
  },
  {
    path: '/dataManage',
    name: 'dataManage',
    component: Layout,
    show: true,
    meta: {
      title: '数据管理',
      icon: 'fa fa-database'
    },
    redirect: '/tableData',
    children: [
      {
        path: '/tableData',
        name: 'tableData',
        meta: {
          title: '表格管理',
          icon: 'fa fa-table'
        },
        component: () => import('@/views/DataManage/TableData.vue')
      },
      {
        path: '/chartsData',
        name: 'chartsData',
        meta: {
          title: '图表管理',
          icon: 'fa fa-bar-chart'
        },
        component: () => import('@/views/DataManage/ChartsData.vue')
      },
      {
        path: '/formData',
        name: 'formData',
        meta: {
          title: '表单管理',
          icon: 'fa fa-file-text-o'
        },
        component: () => import('@/views/DataManage/FormData.vue')
      }
    ]
  },
  {
    path: '/userManage',
    name: 'userManage',
    component: Layout,
    show: true,
    redirect: '/accountData',
    children: [
      {
        path: '/accountData',
        name: 'accountData',
        meta: {
          title: '账户管理',
          icon: 'fa fa-user-plus'
        },
        component: () => import('@/views/UserManage/AccountData.vue')
      }
    ]
  },
  {
    path: '/user',
    name: 'user',
    component: Layout,
    show: false,
    redirect: '/userInfo',
    children: [
      {
        path: '/userInfo',
        name: 'userInfo',
        meta: { title: '个人中心'},
        component: () => import('@/views/UserManage/UserInfo.vue')
      }
    ]
  },
  {
    path: '/404',
    name: '404',
    show: false,
    meta: { title: '404'},
    component: () => import('@/views/404.vue')
  },
  {
    path: '/login',
    name: 'login',
    meta: { title: '用户登陆'},
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/password',
    name: 'password',
    meta: { title: ''},
    component: () => import('@/views/Password.vue')
  },
  {
    path: '*',
    redirect: '/404'
  }
]

const router:any = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: asyncRouterMap
})

router.beforeEach( (to:any, from:any, next:any) => {
  const isLogin = !!localStorage.token;
  if(to.path == "/login" || to.path == '/password') {
    next();
  }else {
    isLogin ? next() : next('/login');
  }
})

export default router
