import router from '@/router'
import axios from 'axios'
import { MessageBox, Message, Notification } from 'element-ui'
import store from '@/store'
import { getToken, removeToken, getTokenTemporary } from '@/utils/auth'
import { getLocalStorage } from '@/utils'
import { cacheNameDataFun } from '@/cache'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

service.interceptors.request.use(
  config => {
    if (getLocalStorage(cacheNameDataFun().userInfo)) {
      config.headers['userName'] = getLocalStorage(cacheNameDataFun().userInfo).username || ''
      config.headers['token'] = getToken() || getTokenTemporary() || ''
    }
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    // console.log(response)
    const res = response.data
    const urlArr = response.config.url.split('/')

    if (res.code !== 1) {

      if (urlArr[urlArr.length - 1] !== 'getUnitChild') {
        Notification({
          message: res.message || 'Error',
          type: 'error'
        })
      }

      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }

      return Promise.reject(new Error(res.message || 'Error'))
    }

    return res
  },
  error => {
    if ( String(error).indexOf('401') !== -1) {
      removeToken()
      Notification({
        message: '登录失效，请重新登录',
        type: 'error'
      })
      router.push('/login')
      return
    }
    console.log('err' + error)
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
