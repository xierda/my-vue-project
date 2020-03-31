import Vue from 'vue'

import 'normalize.css/normalize.css'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import '@/styles/index.scss'

import App from './App.vue'

Vue.config.productionTip = false

Vue.use(ElementUI);

new Vue({
  render: h => h(App),
}).$mount('#app')