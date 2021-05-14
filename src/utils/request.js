import router from '@/router'
import axios from 'axios'
import Qs from 'qs'
import { MessageBox, Message, Notification } from 'element-ui'
import store from '@/store'
import { getToken, removeToken, getTokenTemporary } from '@/utils/auth'
import { getLocalStorage } from '@/utils'
import { cacheNameDataFun } from '@/cache'

// 正在请求的
const pendingRequest = new Map();

// 生成请求 Key
function generateReqKey(config) {
  const { method, url, params, data } = config;
  return [method, url, Qs.stringify(params), Qs.stringify(data)].join(
    "&"
  );
}
// 把当前请求信息添加到pendingRequest对象中
function addPendingRequest(config) {
  const requestKey = generateReqKey(config);
  config.cancelToken =
    config.cancelToken ||
    new axios.CancelToken((cancel) => {
      if (!pendingRequest.has(requestKey)) {
        pendingRequest.set(requestKey, cancel);
      }
    });
}
// 检查是否存在重复请求，若存在则取消已发的请求
function removePendingRequest(config) {
  const requestKey = generateReqKey(config);
  if (pendingRequest.has(requestKey)) {
    const cancel = pendingRequest.get(requestKey);
    cancel(requestKey);
    pendingRequest.delete(requestKey);
  }
}

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

service.interceptors.request.use(
  config => {
    removePendingRequest(config); // 检查是否存在重复请求，若存在则取消已发的请求
    addPendingRequest(config); // 把当前请求添加到pendingRequest对象中
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
    removePendingRequest(response.config); // 从pendingRequest对象中移除请求
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
    removePendingRequest(error.config || {}); // 从pendingRequest对象中移除请求
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
