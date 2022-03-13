import axios from '@/utils/request'
// 发表新帖
export function createPost (data) {
  return axios.request({
    url: '/content/createPost',
    method: 'post',
    data
  })
}
// 编辑帖子
export function editPost (data) {
  return axios.request({
    url: '/content/editPost',
    method: 'post',
    data
  })
}

// 收藏帖子
export function collectPost (data) {
  return axios.request({
    url: '/collect/collectPost',
    method: 'post',
    data
  })
}

// 删除帖子
export function deletePost (data) {
  return axios.request({
    url: '/content/delPost',
    method: 'post',
    data
  })
}
