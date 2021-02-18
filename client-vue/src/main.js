import Vue from 'vue'
import App from './App.vue'
import axios from './api/http';
import router from './router'
import store from './store'
import './plugins/element.js'
import SvgIcon from './components/SvgIcon/index.vue'

// axios.defaults.baseURL = '/api'

Vue.prototype.$axios = axios;

Vue.component('SvgIcon', SvgIcon)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
