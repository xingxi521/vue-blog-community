import Vue from 'vue'
import Vuex from 'vuex'
import stroage from '@/utils/stroage'
import WebSocketClient from '@/utils/websocket'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    uid: '',
    isLogin: stroage.getItem('isLogin') || false,
    userInfo: stroage.getItem('userInfo') || {},
    token: stroage.getItem('token') || '',
    noReadNum: 1,
    wsc: null
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
    // 设置TOKEN
    SET_TOKEN(state, value) {
      state.token = value
      stroage.setItem('token', value)
    },
    // 设置未读消息数
    SET_NO_READ_MESSAGE(state, value) {
      state.noReadNum = value
    },
    // 初始化socket实例
    INIT_SOCKET(state, value) {
      state.wsc = new WebSocketClient(value)
      state.wsc.init()
    }
  },
  actions: {
  },
  modules: {
  }
})
