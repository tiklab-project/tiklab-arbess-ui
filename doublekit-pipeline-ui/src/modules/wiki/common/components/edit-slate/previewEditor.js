/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-09-08 13:24:59
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-09-28 13:31:22
 */
import React, { useMemo, useCallback  } from "react";
import renderElement from "./renderElement"
import Leaf from "./leaf"
import { Slate, Editable, withReact } from "slate-react";
import { createEditor } from "slate";
import { useEffect } from "react";

const PreviewEditor = (props) => {
    const {onChange,value } = props;
    const renderLeaf = useCallback((props) => {
		return <Leaf {...props} />;
	}, []);
    const editor = useMemo(() => withReact(createEditor()), [])
    return (
        <Slate
            editor={editor}
            value={value}
            onChange={(value) => {
                onChange(value);
            }}
        >
            <Editable renderElement={useCallback(renderElement, [])} renderLeaf={renderLeaf} readOnly className="preview-editor"/>
        </Slate>
    )
}
export default PreviewEditor;