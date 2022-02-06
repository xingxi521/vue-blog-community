import Vue from 'vue'
import Vuex from 'vuex'
import stroage from '@/utils/stroage'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    uid: '',
    isLogin: stroage.getItem('isLogin') || false,
    userInfo: stroage.getItem('userInfo') || {}
  },
  mutations: {
    // 设置UID
    SET_UID (state, value) {
      state.uid = value
    },
    // 设置用户信息
    SET_USERINFO(state, value) {
      state.userInfo = value
    },
    // 设置登录状态
    SET_LOGIN(state, value) {
      state.isLogin = value
    }
  },
  actions: {
  },
  modules: {
  }
})
