import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    uid: '',
    isLogin: false
  },
  mutations: {
    // 设置UID
    SET_UID (state, value) {
      state.uid = value
    }
  },
  actions: {
  },
  modules: {
  }
})
