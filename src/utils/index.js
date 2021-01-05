import { getAllEnumOptions } from '@/cache'

/**
 * 判断缓存是否过期
 * @param key
 */
export const expireStorage = (key) => {
  let isExpire = true
  let value = localStorage.getItem(key)
  let time = new Date().getTime()
  if (value) {
    value = JSON.parse(value)
    isExpire = time > value._age
  } else {
    isExpire = true
  }
  return isExpire
}

/**
 * 获取缓存
 * @param key
 */
export const getLocalStorage = (key) => {
  let isExpire = expireStorage(key)
  let value = null
  if (!isExpire) {
    value = JSON.parse(localStorage.getItem(key))
    if (!value._isObject) {
      value = value._value
    }
  }
  return value
}

/**
 * 设置缓存
 * @param key
 * @param obj
 */
export const setLocalStorage = (key, value) => {
  window.localStorage.removeItem(key)
  let isObject = value instanceof Object
  let time = new Date().getTime()
  let age = 2 * 24 * 60 * 60 * 1000
  let info = {}
  if (!isObject) {
    info._value = value
  } else {
    info = JSON.parse(JSON.stringify(value))
  }
  info._time = time
  info._overtime = time + age
  info._isObject = isObject
  localStorage.setItem(key, JSON.stringify(info))
  return info
}

/**
 * 移除缓存
 * @param key
 */
export const removeLocalStorage = (key) => {
  window.localStorage.removeItem(key)
}

// 设置cookies
export const cookies = {
  set: (name, value, days) => {
    let d = new Date()
    d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days)
    window.document.cookie = name + '=' + value + ';path=/;expires=' + d.toGMTString()
  },

  get: (name) => {
    let v = window.document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)')
    return v ? v[2] : null
  },

  delete: (name) => {
    let d = new Date()
    d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * -1)
    window.document.cookie = name + '=' + '' + ';path=/;expires=' + d.toGMTString()
  }
}

// js获取32位的uid
export const getUid = () => {
  return 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    let r = Math.random() * 16 | 0
    let v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

/**
 * 行政区划格式化
 */
export const formatXzqh = (xzqhs) => {
  xzqhs.forEach(item => {
    if (item.childXzqhs && !item.childXzqhs.length) {
      delete item.childXzqhs
    }
    if (item.childXzqhs && item.childXzqhs.length) {
      formatXzqh(item.childXzqhs)
    }
  })
  return xzqhs
}

/**
 * 过滤行政区划
 */
export const filterXzqh = (xzqhs, type, xzqh) => {
  let options = []

  if (type === 1) {
    // 多省用户
    let duoshengXzqh = xzqh.split(',')
    duoshengXzqh.forEach(item => {
      let oneItem = item + '0000'
      let ds = xzqhs.filter(itemOne => itemOne.code === oneItem)[0]
      options.push(ds)
    })
  } else if (type === 2) {
    // 省级用户
    let s = xzqhs.filter(itemOne => itemOne.code === xzqh)[0]
    options.push(s)
  } else if (type === 3) {
    // 市级用户
    let sXzqh = xzqh.substr(0, 2) + '0000'
    let s = xzqhs.filter(itemOne => itemOne.code === sXzqh)[0]
    let shi = s.childXzqhs.filter(itemOne => itemOne.code === xzqh)[0]
    options.push(shi)
  } else if (type === 4) {
    // 县级用户
    let sXzqh = xzqh.substr(0, 2) + '0000'
    let s = xzqhs.filter(itemOne => itemOne.code === sXzqh)[0]
    let shiXzqh = xzqh.substr(0, 4) + '00'
    let shi = s.childXzqhs.filter(itemOne => itemOne.code === shiXzqh)[0]
    let xian = shi.childXzqhs.filter(itemOne => itemOne.code === xzqh)[0]
    options.push(xian)
  }

  return options
  
}

/**
 * 枚举映射
 */
export const shineName = async (...ids) => {
  const allEnumOptions = await getAllEnumOptions()
  let result = []
  ids.map((id, index) => {
    result[index] = ''
    let arr = allEnumOptions.filter(item => item.id === id)
    if (arr.length) {
      result[index] = arr[0].name
    }
  })
  return result
}

/**
 * all行政区划数据格式化
 */
export const formatXzqh2 = (arr) => {
  let arr1 = arr.filter(item => item.code.slice(4) === '00')
  arr1.forEach(item1 => {
    item1.children = arr.filter(item => item.cityname === item1.countyname)
  })
  return arr1
}

/**
 * 生成随机len位数字
 */
export const randomLenNum = (len, date) => {
  let random = ''
  random = Math.ceil(Math.random() * 100000000000000).toString().substr(0, len ? len : 4)
  if (date) random = random + Date.now()
  return random
}

export const mkTree = (data) => {

  data.map(item => {
    if (item.zj) {
      let com = () => import(`../views${item.zj}.vue`)
      item.component = com
    }
    if (item.moudles && item.moudles.length > 0) {
      item.moudles.map(subItem => {
        if (subItem.zj) {
          let com = () => import(`../views${subItem.zj}.vue`)
          subItem.component = com
        }

        if (subItem.moudles && subItem.moudles.length > 0) {
          subItem.moudles.map(subSubItem => {
            if (subSubItem.zj) {
              let com = () => import(`../views${subSubItem.zj}.vue`)
              subSubItem.component = com
            }
          })

          subItem.children = subItem.moudles
        }

      })
      item.children = item.moudles
    }
  })
  return data
}
