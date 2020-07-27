import { getEnumInfoListByCode, getEnumInfoList, getCityareaInfoListBean } from '@/api'
import { getLocalStorage, setLocalStorage, removeLocalStorage, formatXzqh } from '@/utils'

const toccEnumKey = 'toccEnumOptions'
const toccXzqhKey = 'toccXzqhOptions'

const getAllEnumOptions = () => {
  let key =  toccEnumKey
  let options = getLocalStorage(key)
  return new Promise((resolve) => {
    if (options) {
      resolve(JSON.parse(options))
      return
    }
    getEnumInfoList().then(res => {
      if (res.status === 200 && res.data.code) {
        options = res.data.data
        setLocalStorage(key, JSON.stringify(options))
        resolve(options)
        return
      }
      removeLocalStorage(key)
      resolve([])
    }).catch(error => {
      console.log(error)
      removeLocalStorage(key)
      resolve([])
    })
  })
}

const getEnumOptions = (code) => {
  let key =  toccEnumKey + code
  let options = getLocalStorage(key)
  return new Promise((resolve) => {
    if (options) {
      resolve(JSON.parse(options))
      return
    }
    let params = { code }
    getEnumInfoListByCode(params).then(res => {
      if (res.status === 200 && res.data.code) {
        options = res.data.data
        setLocalStorage(key, JSON.stringify(options))
        resolve(options)
        return
      }
      removeLocalStorage(key)
      resolve([])
    }).catch(error => {
      console.log(error)
      removeLocalStorage(key)
      resolve([])
    })
  })
}

const getAllXzqhOptions = () => {
  let key =  toccXzqhKey
  let options = getLocalStorage(key)
  return new Promise((resolve) => {
    if (options) {
      resolve(JSON.parse(options))
      return
    }
    let params = {
      cityname: '',
      code: ''
    }
    getCityareaInfoListBean(params).then(res => {
      if (res.status === 200 && res.data.code) {
        let { list } = res.data.data
        options = formatXzqh(list)
        setLocalStorage(key, JSON.stringify(options))
        resolve(options)
        return
      }
      removeLocalStorage(key)
      resolve([])
    }).catch(error => {
      console.log(error)
      removeLocalStorage(key)
      resolve([])
    })
  })
}

export {
  getAllEnumOptions,
  getEnumOptions,
  getAllXzqhOptions
}
