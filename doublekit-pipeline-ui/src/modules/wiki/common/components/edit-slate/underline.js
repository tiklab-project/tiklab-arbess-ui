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

const UnderlineEditor = (props) => {
    const {editor} = props;
    

    const selectUnderline = (event) => {
        event.preventDefault();
        CustomEditor.toggleUnderlineMark(editor)
    }

    // 富文本方法
    const CustomEditor = {
        isUnderlineMarkActive(editor) {
            const [match] = Editor.nodes(editor, {
                match: (n) => n.underline === true,
                universal: true,
            });
    
            return !!match;
        },
        toggleUnderlineMark(editor) {
            const isActive = CustomEditor.isUnderlineMarkActive(editor);
            Transforms.setNodes(
                editor,
                { underline: isActive ? null : true },
                { match: (n) => Text.isText(n), split: true }
            );
        }
    };

    return (   
        <span className="tool-item" onMouseDown = {(event)=> selectUnderline(event)} key="underline">
            <i className="iconfont iconunderline"></i>
        </span>
    )
}
export default UnderlineEditor;