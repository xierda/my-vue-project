import router from '@/router'
import { getLocalStorage, mkTree } from '@/utils'
import { cacheNameData } from '@/cache'
import { getToken, removeToken } from '@/utils/auth'
import Layout from '@/views/Layout'

router.beforeEach((to, form, next) => {
  const meta = to.meta || {}

  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/' })
      return
    }
    next()
    return
  }
  
  if (!getToken()) {
    if (meta.isAuth === false) {
      next()
      return
    }
    next('/login')
  }

  // if (meta.isAuth) {
  //   if (getToken()) {
  //     if (to.path === '/login') {
  //       next({ path: '/' })
  //     }
  //   }
  // }
  // let tokenCookit = cookies.get('cookieTokenSyd')
  // let roleinfo = window.localStorage.getItem('roleinfoSyd')
  // let userinfo = window.localStorage.getItem('userinfoSyd')
  // let unitinfo = window.localStorage.getItem('unitinfoSyd')
  // let menu = window.localStorage.getItem('menuSyd')
  // let mks = window.localStorage.getItem('mksSyd')
  // if (to.path === '/' && tokenCookit && userinfo && roleinfo && unitinfo && menu && mks) {
  //   return next({path: '/home'})
  // } else if ((to.path !== '/') && (to.path !== '/user/infor') && (to.path !== '/user/password') && (to.path !== '/user2/message') && (!tokenCookit || !roleinfo || !userinfo || !unitinfo || !menu || !mks)) {
  //   let a = cookies.delete('cookieTokenSyd')
  //   let b = cookies.delete('cookieUserNameSyd')
  //   let c = window.localStorage.clear()
  //   let d = window.sessionStorage.clear()
  //   Promise.all([a, b, c, d]).then(() => {
  //     // window.location.href = config.appUrl.waterSorceSystem
  //     return next({path: '/'})
  //   })
  // }
  // next()
})

if (getToken() && JSON.parse(getLocalStorage(cacheNameData.moudles))) {
  let menus = mkTree(JSON.parse(getLocalStorage(cacheNameData.moudles))),
      addRoutes = [{
        path: '/',
        name: 'Layout',
        component: Layout,
        redirect: '/map-basicInfo',
        meta: {
          isAuth: true
        },
        children: menus
      }];

  router.addRoutes(addRoutes)
} else {
  removeToken()
}
