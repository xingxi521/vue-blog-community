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
