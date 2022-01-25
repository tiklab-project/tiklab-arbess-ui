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

const StrikeEditor = (props) => {
    const {editor} = props;
    

    const selectStrike = (event) => {
        event.preventDefault();
        CustomEditor.toggleStrikeMark(editor)
    }

    // 富文本方法
    const CustomEditor = {
        isStrikeMarkActive(editor) {
            const [match] = Editor.nodes(editor, {
                match: (n) => n.strike === true,
                universal: true,
            });
    
            return !!match;
        },
        toggleStrikeMark(editor) {
            const isActive = CustomEditor.isStrikeMarkActive(editor);
            Transforms.setNodes(
                editor,
                { strike: isActive ? null : true },
                { match: (n) => Text.isText(n), split: true }
            );
        }
    };

    return (   
        <span className="tool-item" onMouseDown = {(event)=> selectStrike(event)} key="strike">
            <i className="iconfont iconstrikethrough"></i>
        </span>
    )
}
export default StrikeEditor;