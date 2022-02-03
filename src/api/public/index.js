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

// 获取温馨通道、友情链接数据
export function getLinkList (params) {
  return axios.request({
    url: '/public/linkList',
    method: 'get',
    params,
    // mock: true
  })
}