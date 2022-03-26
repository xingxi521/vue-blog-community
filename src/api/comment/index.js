import axios from '@/utils/request'
// 获取文章评论列表
export function getCommentList (data) {
  return axios.request({
    url: '/public/commentList',
    method: 'post',
    data
  })
}

// 发表评论
export function addComment (data) {
  return axios.request({
    url: '/comment/addComment',
    method: 'post',
    data
  })
}

// 采纳为最佳答案
export function setBestComment (data) {
  return axios.request({
    url: '/comment/setBestComment',
    method: 'post',
    data
  })
}

// 点赞评论
export function setNice (data) {
  return axios.request({
    url: '/comment/setNice',
    method: 'post',
    data
  })
}
// 编辑评论
export function updateComment (data) {
  return axios.request({
    url: '/comment/updateComment',
    method: 'post',
    data
  })
}

// 删除评论
export function deleteComment (data) {
  return axios.request({
    url: '/comment/deleteComment',
    method: 'post',
    data
  })
}

// 获取未读消息
export function getNoReadComment (data) {
  return axios.request({
    url: '/comment/getNoReadComment',
    method: 'post',
    data
  })
}

// 标记为已读消息
export function markCommentRead (params) {
  return axios.request({
    url: '/comment/markCommentRead',
    method: 'get',
    params
  })
}

// 清空所有未读消息
export function markAllComment () {
  return axios.request({
    url: '/comment/markAllComment',
    method: 'get'
  })
}
