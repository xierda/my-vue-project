import config from '@/config'

import { getXzqhs } from '@/api/xzqh'

import {
  getEnumInfoListByCode,
  getEnumInfoList,
  getCityareaInfoListBean
} from '@/api'

import {
  getLocalStorage,
  setLocalStorage,
  removeLocalStorage,
  formatXzqh2,
  formatXzqh
} from '@/utils'

const cacheNameData = {
  token: `${config.systemName}-Token`,
  tokenTemporary: `${config.systemName}-Token-Temporary`,
  userName: `${config.systemName}-UserName`,
  password: `${config.systemName}-Password`,
  passwordRemember: `${config.systemName}-PasswordRemember`,
  userInfo: `${config.systemName}-UserInfo`,
  unitInfo: `${config.systemName}-UnitInfo`,
  roleInfo: `${config.systemName}-RoleInfo`,
  moudles: `${config.systemName}-Moudles`
}

export function cacheNameDataFun() {
  return {
    token: `${config.systemName}-Token`,
    tokenTemporary: `${config.systemName}-Token-Temporary`,
    userName: `${config.systemName}-UserName`,
    password: `${config.systemName}-Password`,
    passwordRemember: `${config.systemName}-PasswordRemember`,
    userInfo: `${config.systemName}-UserInfo`,
    unitInfo: `${config.systemName}-UnitInfo`,
    roleInfo: `${config.systemName}-RoleInfo`,
    moudles: `${config.systemName}-Moudles`
  }
}

const xzqhKeyUserQx = `${config.systemName}-XzqhOptionsUserQx`

const toccEnumKey = 'toccEnumOptions'
const toccXzqhKey = 'toccXzqhOptions'
const toccXzqhKey2 = 'toccXzqhOptions2'

const getXzqhOptionsUserQx = () => {
  let key = xzqhKeyUserQx
  let options = getLocalStorage(key)
  return new Promise((resolve) => {
    if (options) {
      resolve(JSON.parse(options))
      return
    }
    let params = {
      unittype: 0,
      xzqh: '00'
    }
    getXzqhs(params).then(res => {
      if (res.data.xzqhs.length) {
        let {
          xzqhs
        } = res.data
        options = formatXzqh(xzqhs)
        setLocalStorage(key, JSON.stringify(options))
        resolve(xzqhs)
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

const getAllEnumOptions = () => {
  let key = toccEnumKey
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
  let key = toccEnumKey + code
  let options = getLocalStorage(key)
  return new Promise((resolve) => {
    if (options) {
      resolve(JSON.parse(options))
      return
    }
    let params = {
      code
    }
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
  let key = toccXzqhKey
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
        let {
          list
        } = res.data.data
        options = formatXzqh2(list)
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

const getAllXzqhOptions2 = (filtetKey) => {
    let key = toccXzqhKey2 + filtetKey,
      options = getLocalStorage(key);

    return new Promise((resolve) => {
      if (options) {
        resolve(JSON.parse(options));
        return;
      }
      let params = {
        'cityname': '',
        'code': ''
      };

      getCityareaInfoListBean(params).then(res => {
        if (res.status === 200 && res.data.code) {
          let {
            list
          } = res.data.data;

          options = formatXzqh2(list, filtetKey);
          setLocalStorage(key, JSON.stringify(options));
          resolve(options);
          return;
        }
        removeLocalStorage(key);
        resolve([]);
      }).catch(error => {
        console.log(error);
        removeLocalStorage(key);
        resolve([]);
      });
    });
}

export {
  cacheNameData,
  getXzqhOptionsUserQx,
  getAllEnumOptions,
  getEnumOptions,
  getAllXzqhOptions,
  getAllXzqhOptions2
}
  