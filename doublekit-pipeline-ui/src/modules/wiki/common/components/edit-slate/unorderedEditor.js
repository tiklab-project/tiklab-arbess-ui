/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-08-16 14:47:06
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-08-30 09:39:10
 */
import React,{Fragment} from "react";
import {
    Editor,
    Transforms,
    Range,
    Point,
    Element as SlateElement,
} from 'slate'

const withUnordered = editor => {
    const { deleteBackward } = editor

    editor.deleteBackward = (...args) => {
        const { selection } = editor

        if (selection && Range.isCollapsed(selection)) {
            const [match] = Editor.nodes(editor, {
                match: n =>
                    !Editor.isEditor(n) &&
                    SlateElement.isElement(n) &&
                    n.type === 'check-list-item',
            })

            if (match) {
                const [, path] = match
                const start = Editor.start(editor, path)

                if (Point.equals(selection.anchor, start)) {
                    const newProperties = {
                        type: 'paragraph',
                    }
                    Transforms.setNodes(editor, newProperties, {
                        match: n =>
                            !Editor.isEditor(n) &&
                            SlateElement.isElement(n) &&
                            n.type === 'check-list-item',
                    })
                    return
                }
            }
        }

        deleteBackward(...args)
    }

    return editor
}
const LIST_TYPES = ['numbered-list', 'bulleted-list']
const UnorderedEditor = (props) => {
    const { editor } = props;


    const selectUnordered = (format) => {
        event.preventDefault();
        CustomEditor.toggleUnorderedMark(editor,format)
    }

    // 富文本方法
    const CustomEditor = {
        isUnorderedMarkActive(editor,format) {
            const [match] = Editor.nodes(editor, {
                match: n =>
                    !Editor.isEditor(n) &&
                    SlateElement.isElement(n) &&
                    n.type === format,
            })
            return !!match;
        },
        toggleUnorderedMark(editor,format) {
            const isActive = CustomEditor.isUnorderedMarkActive(editor,format)
            const isList = LIST_TYPES.includes(format)
            Transforms.unwrapNodes(editor, {
                match: n => !Editor.isEditor(n) && SlateElement.isElement(n) && LIST_TYPES.includes(n.type),
                split: true,
            })
            const newProperties = {
                type: isActive ? 'paragraph' : isList ? 'list-item' : format,
            }
            Transforms.setNodes(editor, newProperties)

            if (!isActive && isList) {
                const block = { type: format, children: [] }
                Transforms.wrapNodes(editor, block)
            }
        }
    };

    return (
        <Fragment>
            <span className="tool-item" 
                format="bulleted-list" 
                onMouseDown={(event) => selectUnordered("bulleted-list")}
                key="bulleted"
            >
                <i className="iconfont iconlist-check"></i>
            </span>
            <span 
                className="tool-item" format="numbered-list" 
                onMouseDown={(event) => selectUnordered("numbered-list")}
                key="numbered"
            >
                <i className="iconfont iconlist-ordered"></i>
            </span>
            <span 
                className="tool-item" 
                format="block-quote" 
                onMouseDown={(event) => selectUnordered("block-quote")}
                key="block"
            >
                <i className="iconfont icondouble-quotes-l-copy"></i>
            </span>
        </Fragment>
        

    )
}
export default UnorderedEditor;
export {
    withUnordered
}