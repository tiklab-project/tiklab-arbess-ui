/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-08-16 14:47:06
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-09-26 13:50:35
 */
import React, { Fragment, useState } from "react";
import { Transforms, Editor, Location, Point, Element as SlateElement, Range } from "slate";
import "./table.scss"
import {insertTable} from "./commands/insertTable"

const TableEditor = (props) => {
    const { editor } = props;
    const [showFrom, setShowFrom] = useState(false)
    const [select, setTableAnchor] = useState()
    const showModal = (editor) => {
        event.preventDefault()
        setTableAnchor(editor.selection)
        setShowFrom(!showFrom)

    }

    const submit = (editor) => {
        
        if (select) {
            wrapTable(editor)
        }
        setShowFrom(!showFrom)
    }

    const wrapTable = (editor) => {
        const row = document.getElementsByName("table-row")[0].value;
        const col = document.getElementsByName("table-col")[0].value;
        Transforms.select(editor, select);
        insertTable(editor,row,col)

    }
    return (
        <div className="table-tool" key="table">
            <span className="tool-item"
                onMouseDown={(event) => {

                    showModal(editor)
                }
                }
            >
                <i className="iconfont icontable-2"></i>
            </span>
            {
                showFrom && <div className="table-from">
                    <span>行数: </span><input type="number" name="table-row"/>
                    <span>列数: </span><input type="number" name="table-col" />
                    <div onClick={() => submit(editor)}>确定</div>
                </div>
            }
        </div>

    )
}
export default TableEditor;
