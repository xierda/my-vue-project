import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import lodash from 'lodash'

import 'normalize.css/normalize.css'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss'
import './icons'

// Globally register all `_base`-prefixed components
import '@/components/_globals'

Vue.config.productionTip = false

Vue.use(ElementUI)

Vue.prototype._ = lodash

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
