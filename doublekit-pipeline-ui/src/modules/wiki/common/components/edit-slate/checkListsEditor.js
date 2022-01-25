/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-08-16 14:47:06
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-10-28 16:29:56
 */
import React from "react";
import {
    Editor,
    Transforms,
    Range,
    Point,
    Element as SlateElement,
} from 'slate'

const withChecklists = editor => {
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

const CheckListsEditor = (props) => {
    const { editor } = props;


    const selectCheckLists = (event) => {
        event.preventDefault();
        CustomEditor.toggleCheckListsMark(editor)
    }

    // 富文本方法
    const CustomEditor = {
        isCheckListsMarkActive(editor) {
            const { selection } = editor
            const [match] = Editor.nodes(editor, {
                match: n =>
                    !Editor.isEditor(n) &&
                    SlateElement.isElement(n) &&
                    n.type === 'check-list-item',
            })
            console.log(match)
            return !!match;
        },
        toggleCheckListsMark(editor) {
            const isActive = CustomEditor.isCheckListsMarkActive(editor);
            const newProperties = {
                type: isActive ? null :'check-list-item',
            }
            Transforms.setNodes(editor, newProperties, {
                match: n => Editor.isBlock(editor, n)
            })
        }
    };

    return (
        <span className="tool-item" onMouseDown={(event) => selectCheckLists(event)}
            key="check-list"
        >
            <i className="iconfont iconxuanzhong"></i>
        </span>
    )
}
export default CheckListsEditor;
export {
    withChecklists
}