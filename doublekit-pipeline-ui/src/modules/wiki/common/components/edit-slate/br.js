/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-08-16 14:47:06
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-10-29 10:58:32
 */
import React from "react";
import { Transforms, Editor, Text, Node } from "slate";
import { Popover  } from 'antd';

const withBr = editor => {
    const { isVoid } = editor
    editor.isVoid = element => {
        return element.type === 'br' ? true : isVoid(element)
    }
    
    // editor.insertText = text => {
    //     if (text) {
    //         wrapBr(editor, text)
    //     } else {
    //         insertText(text)
    //     }
    // }
    // editor.insertData = data => {
    //     const text = data.getData('text/plain')

    //     if (text) {
    //         wrapBr(editor, text)
    //     } else {
    //         insertData(data)
    //     }
    // }
    return editor
}
const BrEditor = (props) => {
    const {editor} = props;

    const selectBr = (event) => {
        event.preventDefault();
        CustomEditor.toggleBrMark(editor)
    }

    // 富文本方法
    const CustomEditor = {
        isBrMarkActive(editor) {
            const [match] = Editor.nodes(editor, {
                match: (n) => n.br === true,
                universal: true,
            });
    
            return !!match;
        },
        toggleBrMark(editor) {
            const isActive = CustomEditor.isBrMarkActive(editor);
            const br = {
                type: isActive ? null : 'br',
                children: [],
            }
            Transforms.insertNodes(editor, br)
            // Transforms.setNodes(
            //     editor,
            //     { br: isActive ? null : true },
            //     { match: (n) => Text.isText(n), split: true }
            // );
        }
    };

    return (   
        <span className="tool-item" onMouseDown = {(event)=> selectBr(event)} key="br">
            <i className="iconfont iconsubscript-2"></i>
        </span>
    )
}
export default BrEditor;
export {
    withBr
}