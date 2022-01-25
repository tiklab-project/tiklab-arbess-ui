/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-08-13 13:37:12
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-08-13 17:38:45
 */
/**
 * @description panel class
 * @author wangfupeng
 */


import AttachmentModal from "./attachmentModal"
import E from 'wangeditor';
import React,{useEffect,useState} from 'react';
import ReactDOM from 'react-dom';
import EditorStore from './store/editorStore'
const { $} = E

class ReactPanel {
    // 记录已经创建过的 panelMenu
    static createdMenus

    static menu;
    static $container
    
    constructor(menu) {
        this.menu = menu
        this.$container = $('<div class="w-e-panel-container" id="testatt"></div>')

        // 隐藏 panel
        const editor = menu.editor
        editor.txt.eventHooks.clickEvents.push(ReactPanel.hideCurAllPanels)
        editor.txt.eventHooks.toolbarClickEvents.push(ReactPanel.hideCurAllPanels)
        editor.txt.eventHooks.dropListMenuHoverEvents.push(ReactPanel.hideCurAllPanels)
    }

    /**
     * 创建并展示 panel
     */
    create(){
        const menu = this.menu
        // if (ReactPanel.createdMenus.has(menu)) {
        //     // 创建过了
        //     return
        // }

        // panel 的容器
        const $container = this.$container
        


        // 添加到 DOM
        menu.$elem.append($container)
        ReactDOM.render(<AttachmentModal editor = {this.menu.editor}/>, document.getElementById("testatt"))

        menu.setPanel(this)
    }

    /**
     * 移除 penal
     */
    remove() {
        const menu = this.menu
        const $container = this.$container
        if ($container) {
            $container.remove()
        }

        // 将该 menu 记录中移除
        ReactPanel.createdMenus.delete(menu)
    }

    /**
     * 隐藏当前所有的 panel
     */
    static hideCurAllPanels(){
        // if (ReactPanel.createdMenus.size === 0) {
        //     return
        // }
        // ReactPanel.createdMenus.forEach(menu => {
        //     const panel = menu.panel
        //     panel && panel.remove()
        // })
    }
}

export default ReactPanel
