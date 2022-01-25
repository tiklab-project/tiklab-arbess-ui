/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-08-11 11:44:20
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-08-13 17:25:17
 */
/**
 * @description 备注 菜单
 * @author wangfupeng
 */
import React,{useEffect,useState} from 'react';
import ReactDOM from 'react-dom';
import E from 'wangeditor';
import ReactPanel from "./bind-event/Panel"
import createPanelConf from './create-panel-conf'
import isActive from './is-active'
import bindEvent from './bind-event/index'
import { Button } from 'antd';


const { $, BtnMenu, DropListMenu, PanelMenu, DropList, Panel, Tooltip } = E
class AttachmentEditor extends PanelMenu {
    constructor(editor) {
        const $elem = $(
            '<div class="w-e-menu" data-title="备注"><i class="w-e-icon-link"></i></div>'
        )
        super($elem, editor)

        // 绑定事件，如点击备注时，可以查看备注
        bindEvent(editor)
    }

    /**
     * 菜单点击事件
     */
    clickHandler(){
        console.log("dsfsfs")
        const editor = this.editor
        let $abbrElem

        console.log(editor)
        const $selectionElem = editor.selection.getSelectionContainerElem()
        // 判断是否是多行 多行则退出 否则会出现问题
        if ($selectionElem && editor.$textElem.equal($selectionElem)) {
            return
        }
        if (this.isActive) {
            // 菜单被激活，说明选区在备注里
            $abbrElem = editor.selection.getSelectionContainerElem()
            if (!$abbrElem) {
                return
            }

            // 弹出 panel
            this.createPanel()
        } else {
            // 菜单未被激活，说明选区不在备注里
            if (editor.selection.isSelectionEmpty()) {
                // 选区是空的，未选中内容
                this.createPanel('', '')
            } else {
                // 选中内容了
                this.createPanel(editor.selection.getSelectionText(), '')
            }
        }

        
    }

    /**
     * 创建 panel
     * @param text 文本
     * @param abbr 备注
     */
    createPanel(){
        console.log(this)
        const reactPanel = new ReactPanel(this)
        reactPanel.create()
    }

    /**
     * 尝试修改菜单 active 状态
     */
    tryChangeActive() {
        const editor = this.editor
        if (isActive(editor)) {
            this.active()
        } else {
            this.unActive()
        }
    }
}

export default AttachmentEditor;
