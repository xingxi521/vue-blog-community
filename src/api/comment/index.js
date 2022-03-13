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
