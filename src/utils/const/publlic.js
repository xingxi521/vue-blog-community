import { createEnum } from '@/utils/public'
// 文章类型 枚举
export const ROLE_TYPE = createEnum({
  USER: ['user', '普通用户'],
  ADMIN: ['admin', '管理员'],
  SUPER_ADMIN: ['super_admin', '超级管理员']
})
