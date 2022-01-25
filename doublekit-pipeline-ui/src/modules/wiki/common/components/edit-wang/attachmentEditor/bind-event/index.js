/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-08-11 11:43:38
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-08-11 11:44:09
 */
/**
 * @description 绑定链接元素的事件，入口
 * @author wangfupeng
 */

import bindTooltipEvent from './tooltip-event'

/**
 * 绑定事件
 * @param editor 编辑器实例
 */
function bindEvent(editor) {
    // tooltip 事件
    bindTooltipEvent(editor)
}

export default bindEvent
