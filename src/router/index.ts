import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../views/Layout/Index.vue';
// import Login from '@/views/Login.vue'
// import Password from '@/views/Password.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'layout',
    component: Layout
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/password',
    name: 'password',
    component: () => import('@/views/Password.vue')
  }
  
]

const router:any = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
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
