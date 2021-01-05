import Vue from 'vue'
import VueRouter from 'vue-router'
// import Layout from '../views/Layout.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    // component: () => import('@/views/map/map.vue'),
    component: () => import('@/views/Login.vue'),
    meta: {
      isAuth: false
    }
  },
  {
    path: '/user',
    name: 'User',
    component: () => import('@/views/User.vue'),
    meta: {
      isAuth: true
    },
    children: [
      {
        path: 'infor',
        name: 'UserInfor',
        component: () => import('@/views/UserInfor.vue'),
        meta: {
          isAuth: true
        }
      }, {
        path: 'password',
        name: 'UserPassword',
        component: () => import('@/views/UserPassword.vue'),
        meta: {
          isAuth: false
        }
      }, {
        path: 'forget',
        name: 'UserPasswordForget',
        component: () => import('@/views/UserPasswordForget.vue'),
        meta: {
          isAuth: false
        }
      }
    ]
  },
  // {
  //   path: '/',
  //   name: 'Layout',
  //   component: Layout,
  //   meta: {
  //     isAuth: true
  //   },
  //   children: [
  //     {
  //       path: 'map',
  //       name: 'Map',
  //       component: () => import('@/views/Map.vue')
  //     },
  //     {
  //       path: 'dzdtksh',
  //       name: 'dzdtksh',
  //       component: () => import('@/views/Map.vue')
  //     },
  //     {
  //       path: 'yhgl',
  //       name: 'yhgl',
  //       component: () => import('@/views/system/Yhgl.vue')
  //     },
  //     {
  //       path: 'yhqxgl',
  //       name: 'yhqxgl',
  //       component: () => import('@/views/system/Yhqxgl.vue')
  //     },
  //     {
  //       path: 'bmgl',
  //       name: 'bmgl',
  //       component: () => import('@/views/system/Bmgl.vue')
  //     },
  //     {
  //       path: 'system',
  //       name: 'System',
  //       component: () => import('@/views/System.vue')
  //     }
  //   ]
  // }
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
