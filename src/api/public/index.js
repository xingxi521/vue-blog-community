import axios from '@/utils/request'
// 获取文章列表分页数据
export function getArticleList (data) {
  return axios.request({
    url: '/public/list',
    method: 'post',
    data,
    // mock: true
  })
}