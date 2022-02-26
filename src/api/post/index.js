import axios from '@/utils/request'
// 发表新帖
export function createPost (data) {
  return axios.request({
    url: '/content/createPost',
    method: 'post',
    data
  })
}
