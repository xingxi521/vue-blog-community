/*
 * @Author: your name
 * @Date: 2021-10-31 11:54:51
 * @LastEditTime: 2022-01-27 10:22:56
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \dnf-gatewaye:\慕课网大前端\community\src\utils\public.js
 */
import Vue from 'vue'
import dayjs from 'dayjs'
import { notification } from 'ant-design-vue'
/**
 * 成功提示
 * @param {(string)} message
 * @param {(string)} title
 */
export const notifiySuccess = function (message, isHtml, title, duration) {
  notification.success({
    message: title || '成功',
    description: isHtml ? this.$createElement('p', {
      domProps: {
        innerHTML: message
      }
    }) : message || '操作成功',
    duration: duration || 3
  })
}

/**
 * 警告提示
 * @param {(string)} message
 * @param {(string)} title
 */
export const notifiyWarning = function (message, isHtml, title, duration) {
  notification.warning({
    message: title || '警告',
    description: isHtml ? this.$createElement('p', {
      domProps: {
        innerHTML: message
      }
    }) : message || 'warning',
    duration: duration || 5
  })
}
/**
 * 错误提示
 * @param {(string)} message
 * @param {(string)} title
 */
export const notifiyError = function (message, isHtml, title, duration) {
  notification.error({
    message: title || '错误',
    description: isHtml ? this.$createElement('p', {
      domProps: {
        innerHTML: message
      }
    }) : message || 'Error',
    duration: duration || 3
  })
}

/**
 * 枚举类创建
 *  示例：
  * const STATUS = createEnum({
  *     AUDIT_WAIT: [1, '审核中'],
  *     AUDIT_PASS: [2, '审核通过']
  * })
  * 获取枚举值：STATUS.AUDIT_WAIT
  * 获取枚举描述：STATUS.getDesc('AUDIT_WAIT')
  * 通过枚举值获取描述：STATUS.getDescFromValue(STATUS.WAIT)
 */

export function createEnum(definition) {
  const strToValueMap = {}
  const numToDescMap = {}
  for (const enumName of Object.keys(definition)) {
    const [value, desc] = definition[enumName]
    strToValueMap[enumName] = value
    numToDescMap[value] = desc
  }
  return {
    ...strToValueMap,
    getDesc(enumName) {
      return (definition[enumName] && definition[enumName][1]) || ''
    },
    getDescFromValue(value) {
      return numToDescMap[value] || ''
    },
    // 返回一个枚举映射表
    getMapping() {
      return numToDescMap
    },
    // 返回一个数组对象 key-value形式的
    getLabelData(label, value, isNum = true) {
      const tempArr = Object.entries(numToDescMap)
      const result = []
      tempArr.forEach(item => {
        result.push({
          [label || 'label']: item[1],
          [value || 'value']: isNum ? Number(item[0]) : item[0]
        })
      })
      return result || []
    }
  }
}
// 格式化时间
export function formatCreateTime(value) {
  const beforeSeven = dayjs().subtract(7, 'day').format('YYYY-MM-DD HH:mm:ss')
  const createTime = dayjs(value).format('YYYY-MM-DD HH:mm:ss')
  if (createTime < beforeSeven) {
    return dayjs(value).format('YYYY-MM-DD HH:mm:ss')
  } else {
    return dayjs(value).fromNow()
  }
}
Vue.prototype.notifiyError = notifiyError
Vue.prototype.notifiyWarning = notifiyWarning
Vue.prototype.notifiySuccess = notifiySuccess
