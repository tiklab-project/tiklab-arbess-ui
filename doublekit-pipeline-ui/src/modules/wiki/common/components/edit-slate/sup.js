/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-08-16 14:47:06
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-08-18 13:57:58
 */
import React from "react";
import { Transforms, Editor, Text, Node } from "slate";
import { Popover  } from 'antd';
const SupEditor = (props) => {
    const {editor} = props;

    const selectSup = (event) => {
        event.preventDefault();
        CustomEditor.toggleSupMark(editor)
    }

    // 富文本方法
    const CustomEditor = {
        isSupMarkActive(editor) {
            const [match] = Editor.nodes(editor, {
                match: (n) => n.sup === true,
                universal: true,
            });
    
            return !!match;
        },
        toggleSupMark(editor) {
            const isActive = CustomEditor.isSupMarkActive(editor);
            Transforms.setNodes(
                editor,
                { sup: isActive ? null : true },
                { match: (n) => Text.isText(n), split: true }
            );
        }
    };

    return (   
        <span className="tool-item" onMouseDown = {(event)=> selectSup(event)} key="sup">
            <i className="iconfont iconsuperscript-2"></i>
        </span>
    )
}
export default SupEditor;