import Vue from 'vue'
import { Select, Option } from 'element-ui'
import App from './App.vue'
import router from './router'

import '@/styles/index.scss' // global css

Vue.use(Select)
Vue.use(Option)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
