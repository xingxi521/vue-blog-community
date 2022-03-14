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
import { notification, Modal } from 'ant-design-vue'
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
 * 确认对话框
 * @param {(string)} message
 * @param {(Object)} opt
 */
export const confirmBox = function(content, okCallBack, cancelCallBack, opt = {}) {
  const option = Object.assign({
    title: '提示',
    content: content || '消息',
    showCancelButton: true,
    okText: '确定',
    cancelText: '取消',
    onOk() {
      okCallBack()
    },
    onCancel() {
      cancelCallBack()
    }
  }, opt)
  return Modal.confirm(option)
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

const getElememtY = (elem) => {
  // 这里取app是因为滚动条是出现在app上的，不能直接取window.pageXoffet
  return document.getElementById('app').scrollTop + document.querySelector(elem).getBoundingClientRect().top
}

/**
 * 滚动到指定的元素
 * @param {String} elem DOM元素
 * @param {Number} duration 滚动动画执行的时间
 * @param {Number} offset 滚动偏移量
 */
export function scrollToElem (elem, duration, offset) {
  // 获取滚动条当前位置
  const startingY = document.getElementById('app').scrollTop
  // 获取目标Dom元素的位置
  const elementY = getElememtY(elem)
  // 计算出需要滚动的距离
  const diff = elementY - startingY + offset
  // 如果 diff 0
  if (!diff) return
  const easing = t => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
  let start
  window.requestAnimationFrame(function step (timestamp) {
    if (!start) start = timestamp
    // 计算时间的差值，根据差值计算偏移量
    const time = timestamp - start
    let percent = Math.min(time / duration, 1)
    percent = easing(percent)
    document.getElementById('app').scrollTo(0, startingY + diff * percent)

    if (time < duration) {
      window.requestAnimationFrame(step)
    }
  })
}

// 从数组对象里根据key取出匹配的对象
export function getObjByAttr (lst, originKey, originVal, isString) {
  if (!Array.isArray(lst)) {
    return null
  }
  var result = null
  for (const value of lst) {
    if (value[originKey] === originVal) {
      result = value
      break
    }
  }
  return result
}
// 数组对象里根据key和value匹配取出指定key值
export function getAttrByAttr(lst, originKey, originVal, targetKey, defaultValue) {
  if (!Array.isArray(lst)) {
    return ''
  }
  var result = '未知' + originKey + ':' + originVal
  if (defaultValue !== undefined) {
    result = defaultValue
  }
  for (const value of lst) {
    if (value[originKey] === originVal) {
      result = value[targetKey]
      break
    }
  }
  return result
}
Vue.prototype.notifiyError = notifiyError
Vue.prototype.notifiyWarning = notifiyWarning
Vue.prototype.notifiySuccess = notifiySuccess
Vue.prototype.confirmBox = confirmBox
