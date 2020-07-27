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
export const formatXzqh = (arr) => {
  let arr1 = arr.filter(item => item.code.slice(4) === '00')
  arr1.forEach(item1 => {
    item1.children = arr.filter(item => item.cityname === item1.countyname)
  })
  return arr1
}
