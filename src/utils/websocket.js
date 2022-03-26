import config from '@/config'
import store from '@/store'
import router from '@/router'
import { SOCKET_EVENT } from '@/utils/const/socket'
import { message } from 'ant-design-vue'
class WebSocketClient {
  constructor(customConfig = {}) {
    const defaultConfig = {
      // websocket连接地址
      url: process.env.NODE_ENV === 'development' ? config.socketUrl.dev : config.socketUrl.prod,
      // 心跳检测频率
      timeInterval: 30 * 1000
    }
    const resultConfig = {
      ...defaultConfig,
      ...customConfig
    }
    this.url = resultConfig.url
    this.wsc = {}
    this.handler = null
    this.timeInterval = resultConfig.timeInterval
  }
  // 初始化socket
  init() {
    this.wsc = new WebSocket(this.url)
    this.wsc.onopen = () => this.onOpen()
    this.wsc.onmessage = (msg) => this.onMessage(msg)
    this.wsc.onclose = () => this.onClose()
    this.wsc.onerror = () => this.onError()
  }
  // 客户连接成功
  onOpen() {
    this.wsc.send(JSON.stringify({
      event: SOCKET_EVENT.JWT_AUTH,
      message: store.state.token
    }))
  }
  // 数据到达
  onMessage(msg) {
    const mapObj = JSON.parse(msg.data)
    switch (mapObj.event) {
      // 鉴权失败
      case SOCKET_EVENT.NO_AUTH:
        router.push({ name: 'Login' })
        break
      case SOCKET_EVENT.HEART_BEAT: // 心跳检测
        this.heartBeat()
        this.wsc.send(JSON.stringify({
          event: SOCKET_EVENT.HEART_BEAT,
          message: 'pong'
        }))
        break
      case SOCKET_EVENT.NO_READ_MESSAGE: // 未读消息
        store.commit('SET_NO_READ_MESSAGE', mapObj.message)
        break
      case SOCKET_EVENT.GET_NO_READ_COUNT: // 设置未读消息数
        store.commit('SET_NO_READ_MESSAGE', mapObj.message)
        message.success({
          content: `您有${mapObj.message}条未读消息`,
          duration: 3
        })
        break
      default:
        break
    }
  }
  // 客户离开
  onClose() {
    this.wsc.close()
  }
  // 客户错误
  onError() {
    setTimeout(() => {
      // store.commit('INIT_SOCKET', {})
      this.init()
    }, 1000)
  }
  // 心跳事件
  heartBeat() {
    clearTimeout(this.handler)
    this.handler = setTimeout(() => {
      this.onClose()
      // 相当于执行重连
      this.onError()
    }, this.timeInterval + 1000) // 这里+1S的时延，就是网络延迟
  }
}
export default WebSocketClient
