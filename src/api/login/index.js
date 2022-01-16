import axios from '@/utils/request'
// 获取验证码
export function getCaptch (data) {
  return axios.request({
    url: '/public/getCaptcha',
    method: 'post',
    data
  })
}
// 忘记密码提交
export function forgetPassword (data) {
  return axios.request({
    url: '/login/forget',
    method: 'post',
    data
  })
}

// 登录接口
export function login (data) {
  return axios.request({
    url: '/login/login',
    method: 'post',
    data
  })
}

// 注册接口
export function register (data) {
  return axios.request({
    url: '/login/register',
    method: 'post',
    data
  })
}
