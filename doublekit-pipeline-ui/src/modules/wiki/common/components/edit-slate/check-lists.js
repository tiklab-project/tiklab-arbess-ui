/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-08-23 10:41:30
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-10-22 10:32:33
 */
import React from 'react'
import {
    useSlateStatic,
    useReadOnly,
    ReactEditor,
} from 'slate-react'
import {
    Transforms,
} from 'slate'
import "./check-lists.scss"
const CheckListItemElement = ({ attributes, children, element }) => {
    const editor = useSlateStatic()
    const readOnly = useReadOnly()
    const { checked } = element
    return (
        <div
            {...attributes}
            className="check-lists"
        >
            <span
                contentEditable={false}
                className="check-input"
            >
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={event => {
                        const path = ReactEditor.findPath(editor, element)
                        const newProperties = {
                            checked: event.target.checked,
                        }
                        Transforms.setNodes(editor, newProperties, { at: path })
                    }}
                />
            </span>
            <span
                contentEditable={!readOnly}
                suppressContentEditableWarning
                className= "check-text"
            >
                {children}
            </span>
        </div>
    )
}

export default CheckListItemElement;