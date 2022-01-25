/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-08-16 14:47:06
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-08-30 09:34:45
 */
import React from "react";
import { Transforms, Editor, Element as SlateElement, Range } from "slate";

const withDivider = editor => {
    const { isVoid } = editor
    editor.isVoid = element => {
        return element.type === 'divider' ? true : isVoid(element)
    }
    
    // editor.insertText = text => {
    //     if (text) {
    //         wrapDivider(editor, text)
    //     } else {
    //         insertText(text)
    //     }
    // }
    // editor.insertData = data => {
    //     const text = data.getData('text/plain')

    //     if (text) {
    //         wrapDivider(editor, text)
    //     } else {
    //         insertData(data)
    //     }
    // }
    return editor
}
const DividerEditor = (props) => {
    const {editor} = props;
    
    
    const wrapDivider = (editor) => {
        event.preventDefault()
        CustomEditor.toggleColorMark(editor)
    }

    const CustomEditor = {
        isColorMarkActive(editor) {
            const [match] = Editor.nodes(editor, {
                match: (n) => n.type === "divider",
                universal: true,
            });
    
            return !!match;
        },
        toggleColorMark(editor) {
            const isActive = CustomEditor.isColorMarkActive(editor);
            const divider = {
                type: isActive ?null : 'divider',
                children: [{text: ""}],
            }
            Transforms.insertNodes(editor, divider)
            Transforms.insertNodes(editor, {type: 'paragraph', children: [{ text: '' }]});
        }
    };
    return (   
        <span className="tool-item" onMouseDown = {(event) => wrapDivider(editor)}
            key="divider"
        >
            <i className="iconfont iconterminal-line"></i>
        </span>
    )
}
export default DividerEditor;

export {
    withDivider
}