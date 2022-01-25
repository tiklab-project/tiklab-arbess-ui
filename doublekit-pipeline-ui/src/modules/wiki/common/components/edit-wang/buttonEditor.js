/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-08-12 17:28:01
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-08-13 11:02:05
 */
// 引入 wangEditor
import React,{useEffect,useState} from 'react';
import ReactDOM from 'react-dom';
import E from 'wangeditor'; // npm 安装
// const E = window.wangEditor // CDN 引入的方式
import { Button } from "antd"
// 获取必要的变量，这些在下文中都会用到
const { $, BtnMenu, DropListMenu, PanelMenu, DropList, Panel, Tooltip } = E
let i = 0;
// 第一，菜单 class ，Button 菜单继承 BtnMenu class
class AlertMenu extends BtnMenu {
    constructor(editor) {
      // data-title属性表示当鼠标悬停在该按钮上时提示该按钮的功能简述
        const $elem = E.$(
            `<div class="w-e-menu" data-title="Alert">
                <button>alert</button>
            </div>`
        )
        super($elem, editor)
    }
    // 菜单点击事件
    clickHandler() {
        // 做任何你想做的事情
        // 可参考【常用 API】文档，来操作编辑器
        const editor = this.editor
        const isSelectEmpty = editor.selection.isSelectionEmpty()

        if (isSelectEmpty) {
            // 选区范围是空的，插入并选中一个“空白”
            editor.selection.createEmptyRange()
        }

        editor.cmd.do('insertHTML', `<span id="test${i}"></span>`)
        ReactDOM.render(<Button type="primary">Primary Button</Button>, document.getElementById(`test${i}`))
        i++
        if (isSelectEmpty) {
            // 需要将选区范围折叠起来
            editor.selection.collapseRange()
            editor.selection.restoreSelection()
        }
        
    }
    // 菜单是否被激活（如果不需要，这个函数可以空着）
    // 1. 激活是什么？光标放在一段加粗、下划线的文本时，菜单栏里的 B 和 U 被激活，如下图
    // 2. 什么时候执行这个函数？每次编辑器区域的选区变化（如鼠标操作、键盘操作等），都会触发各个菜单的 tryChangeActive 函数，重新计算菜单的激活状态
    tryChangeActive() {
        // 激活菜单
        // 1. 菜单 DOM 节点会增加一个 .w-e-active 的 css class
        // 2. this.this.isActive === true
        this.active()

        // // 取消激活菜单
        // // 1. 菜单 DOM 节点会删掉 .w-e-active
        // // 2. this.this.isActive === false
        // this.unActive()
    }
}
export default AlertMenu