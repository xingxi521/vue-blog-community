export default {
  // 请求地址设置
  baseUrl: {
    dev: 'http://localhost:3000/',
    prod: 'http://192.168.56.1:12005/',
    mock: 'https://www.fastmock.site/mock/2f572a6975b9cc96b054aba2fa94c30f/api/'
  },
  // 是否开启全局mock状态
  isMock: false,
  // 本地存储命名空间
  stroageSpace: 'community',
  // webSocket链接地址设置
  socketUrl: {
    dev: 'ws://127.0.0.1:3001',
    prod: 'ws://192.168.56.1:12006'
  }
}
