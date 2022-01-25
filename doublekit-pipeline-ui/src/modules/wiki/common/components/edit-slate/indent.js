/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-08-16 14:47:06
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-10-28 17:31:28
 */
import React, { useState } from "react";
import { Fragment } from "react/cjs/react.production.min";
import { Transforms, Editor, Element as SlateElement, Text, Range } from "slate";
import { useSelected } from 'slate-react';
const withIndent = editor => {
    const selected = useSelected();
    const [indent] = Editor.nodes(editor, {
        match: (n) => n.type === 'indent',
    });
    console.log(selected,"222",indent)
    const { isBlock } = editor
    editor.isBlock = element => {
        return element.type === 'indent' ? true : isBlock(element)
    }
    
    // editor.insertText = text => {
    //     if (text) {
    //         wrapIndent(editor, text)
    //     } else {
    //         insertText(text)
    //     }
    // }
    // editor.insertData = data => {
    //     const text = data.getData('text/plain')

    //     if (text) {
    //         wrapIndent(editor, text)
    //     } else {
    //         insertData(data)
    //     }
    // }
    return editor
}
const IndentEditor = (props) => {
    const {editor} = props;
    const wrapIndent = (editor) => {
        event.preventDefault()
        CustomEditor.toggleIndentMark(editor)
    }
    const wrapUnIndent = (editor) => {
        event.preventDefault()
        CustomEditor.toggleUnIndentMark(editor)
    }
    const [indent,setIndent] = useState()
    const CustomEditor = {
        isIndentMarkActive(editor) {
            const [match] = Editor.nodes(editor, {
                match: n =>
                    !Editor.isEditor(n) && 
                    SlateElement.isElement(n) &&
                    n.type === "indent" ,
            })
            // console.log(match)
            // match && setIndent([...match])
            return match;
        },
        toggleIndentMark(editor) {
            const isActive = CustomEditor.isIndentMarkActive(editor)
            console.log(indent)
            Transforms.unwrapNodes(editor, {
                match: n => !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === "indent",
                split: true,
            })
            const block = isActive ? { type: "indent",indent: parseInt(isActive[0].indent) + 2,children: [] } : { type: "indent",indent: "2",children: [] }
            Transforms.wrapNodes(editor, block)
        },
        toggleUnIndentMark(editor) {
            const isActive = CustomEditor.isIndentMarkActive(editor)
            Transforms.unwrapNodes(editor, {
                match: n => !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === "indent",
                split: true,
            })
            const block = isActive ? { type: "indent",indent: parseInt(isActive[0].indent) - 2,children: [] } : { type: null }
            Transforms.wrapNodes(editor, block)
        }
    };
    return (   
        <Fragment>
            <div key="indent">
                <span className="tool-item" onMouseDown = {(event) => wrapIndent(editor)}>
                    <i className="iconfont iconindent"></i>
                </span>
            </div>
            <div key="unindent">
                <span className="tool-item" onMouseDown = {(event) => wrapUnIndent(editor)}>
                    <i className="iconfont iconindent-decrease"></i>
                </span>
            </div>
        </Fragment>
        
        
    )
}
export default IndentEditor;

export { withIndent }