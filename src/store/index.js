import Vue from 'vue'
import Vuex from 'vuex'
import stroage from '@/utils/stroage'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    uid: '',
    isLogin: stroage.getItem('isLogin') || false,
    userInfo: stroage.getItem('userInfo') || {},
    token: stroage.getItem('token') || ''
  },
  mutations: {
    // 设置UID
    SET_UID (state, value) {
      state.uid = value
    },
    // 设置用户信息
    SET_USERINFO(state, value) {
      state.userInfo = value
      stroage.setItem('userInfo', value)
    },
    // 设置登录状态
    SET_LOGIN(state, value) {
      state.isLogin = value
      stroage.setItem('isLogin', value)
    },
    SET_TOKEN(state, value) {
      state.token = value
      stroage.setItem('token', value)
    }
  },
  actions: {
  },
  modules: {
  }
})
