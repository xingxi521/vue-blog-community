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
