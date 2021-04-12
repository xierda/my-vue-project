import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'

import common from './modules/common'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    buttonPermission: {
      add: true,
      edit: false,
      delete: false,
    },
  },
  modules: {
    user,
    common
  },
  getters
})
