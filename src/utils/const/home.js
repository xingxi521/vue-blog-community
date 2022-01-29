import { createEnum } from '@/utils/public'
// 文章类型 枚举
export const ARTICLE_TYPE = createEnum({
  ASK: [1, '提问'],
  SHARE: [2, '分享'],
  DISSCUSS: [3, '讨论'],
  SUGGEST: [4, '建议'],
  NOTICE: [5, '公告'],
  DYNMATIC: [6, '动态']
})
