/*
 * @Author: your name
 * @Date: 2021-10-31 11:54:51
 * @LastEditTime: 2022-01-27 10:22:56
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \dnf-gatewaye:\慕课网大前端\community\src\utils\public.js
 */
import Vue from 'vue'

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
Vue.prototype.notifiyError = notifiyError
Vue.prototype.notifiyWarning = notifiyWarning
Vue.prototype.notifiySuccess = notifiySuccess
