import md5 from 'js-md5'

import {
  cacheNameData
} from '@/cache'

import {
  login,
  logout
} from '@/api/user'

import {
  setToken,
  removeToken,
  setTokenTemporary,
  removeTokenTemporary
} from '@/utils/auth'

// import {
//   setStore,
//   getStore
// } from '@/util/store'

import {
  RefeshToken
} from '@/api/user'

import {
  Notification
} from 'element-ui'

import {
  setLocalStorage
} from '@/utils'

const user = {
  'state': {
    'userInfo': {},
    'permission': {},
    // 'token': getStore({
    //   'name': 'token'
    // }) || ''
  },
  'actions': {
    LoginByUsername({ commit }, userInfo) {
      let params = {
        mac: userInfo.uuid,
        verifyCode: userInfo.code,
        password: md5(userInfo.password),
        username: userInfo.username
      }

      return new Promise((resolve) => {
        login(params).then(res => {
          if (res.data) {
            // 清除上次登录的本地缓存
            window.localStorage.clear()

            const { userLoginData } = res.data,
                  { userinfo } = userLoginData,
                  { token } = userLoginData;

            setTokenTemporary(token)

            setLocalStorage(cacheNameData.userInfo, userinfo)

            if (userInfo.password === 'Syd@2019') {
              resolve('newUser')
              return
            }
            const { unitinfo } = userLoginData,
                  { roleinfo } = userLoginData,
                  { moudles } = userLoginData;

            if (!moudles.length) {
              Notification({
                'type': 'info',
                'title': '',
                'message': '该用户目前无该系统角色，请联系系统管理员分配角色权限!',
                'duration': 0
              })

              return
            }

            Notification({
              'type': 'success',
              'title': '',
              'message': res.message || '登录成功'
            })

            commit('SET_TOKEN', token)
            removeTokenTemporary(token)
            setToken(token)

            setLocalStorage(cacheNameData.unitInfo, unitinfo);
            setLocalStorage(cacheNameData.roleInfo, roleinfo);
            setLocalStorage(cacheNameData.moudles, JSON.stringify(moudles));

            resolve();
            return;
          }
          Notification({
            'type': 'info',
            'title': '',
            'message': res.message || '登录异常'
          });
        }).catch(e => {
          resolve('error')
          console.log(e)
        });
      });
    },

    // 登出
    LogOut({ commit }) {
      return new Promise((resolve, reject) => {
        logout().then(() => {
          commit('SET_TOKEN', '')
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    
    //刷新token
    RefeshToken({
      commit
    }) {
      return new Promise((resolve, reject) => {
        RefeshToken().then(res => {
          const data = res.data.data;

          commit('SET_TOKEN', data);
          setToken(data);
          resolve(data);
        }).catch(error => {
          reject(error);
        });
      });
    },
    //注销session
    FedLogOut({
      commit
    }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '');
        removeToken();
        resolve();
      });
    }
  },
  'mutations': {
    'SET_TOKEN': (state, token) => {
      state.token = token
      // setStore({
      //   name: 'token',
      //   content: state.token,
      //   type: 'session'
      // });
    },
    'SET_USERIFNO': (state, userInfo) => {
      state.userInfo = userInfo;
    },
    'SET_PERMISSION': (state, permission) => {
      state.permission = {};
      permission.forEach(ele => {
        state.permission[ele] = true;
      });
    }
  }
};

export default user
