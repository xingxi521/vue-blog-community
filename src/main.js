import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './plugins/antd'
import './utils/public'
import stroage from './utils/stroage'
import './assets/font/iconfont.css'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'
import Pop from '@/components/Custom/Pop'
dayjs.extend(relativeTime)
dayjs.locale('zh-cn')
Vue.use(Pop)
Vue.prototype.dayjs = dayjs
Vue.config.productionTip = false
Vue.prototype.$stroage = stroage
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
