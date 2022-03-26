import { createEnum } from '@/utils/public'
// socket 事件枚举
export const SOCKET_EVENT = createEnum({
  JWT_AUTH: ['jwtAuth', '授权'],
  HEART_BEAT: ['heartBeat', '心跳检测'],
  NO_AUTH: ['noAuth', '未授权'],
  NO_READ_MESSAGE: ['noReadMessage', '未读消息'],
  GET_NO_READ_COUNT: ['getNoReadCount', '获取未读消息数']
})
