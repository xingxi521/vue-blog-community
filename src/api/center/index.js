import axios from '@/utils/request'
// 获取今天是否已签到
export function getIsSign () {
  return axios.request({
    url: '/user/getIsSign',
    method: 'get'
  })
}

// 用户签到
export function sign () {
  return axios.request({
    url: '/user/sign',
    method: 'get'
  })
}

// 更新用户信息
export function updateUserInfo (data) {
  return axios.request({
    url: '/user/updateInfo',
    method: 'post',
    data
  })
}

// 获取用户信息
export function getUserInfo () {
  return axios.request({
    url: '/user/getUserInfo',
    method: 'get'
  })
}

// 修改密码
export function updatePassWord (data) {
  return axios.request({
    url: '/user/updatePassWord',
    method: 'post',
    data
  })
}
