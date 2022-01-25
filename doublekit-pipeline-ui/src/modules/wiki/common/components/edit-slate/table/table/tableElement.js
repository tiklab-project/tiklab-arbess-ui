/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-09-23 10:45:50
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-10-22 13:26:23
 */
import React, { useState } from "react"
import { inject, observer } from "mobx-react";
import TableTools from "./tableTool"
import { RenderElementProps, useEditor, useSelected } from "slate-react";
import { Fragment } from "react/cjs/react.production.min";
import "./tableElement.scss"
const TableElement = (props) => {
    const { element, attributes, children, slatestore } = props;
    const { workModalVisible, setWorkModalVisible } = slatestore;

    const render = () => {
        switch (element.childrenType) {
            case 'table':
                return (<div className = {`table-box`}>
                    <table {...attributes}  
                        style = {{borderSpacing: 0,tableLayout: 'fixed',wordBreak: 'break-word',userSelect: 'none'}}>
                        {children}
                    </table>
                    <TableTools></TableTools>
                </div>
                )
            case 'table-thead':
                return <thead >{children}</thead>
            case 'table-tbody':
                return <tbody>{children}</tbody>
            case 'table-th':
                return <th >{children}</th>
            case 'table-row':
                return <tr {...attributes} >{children}</tr>
            case 'table-cell':
                return <td {...attributes}
                    style={{ width: "100px", height: "40px" }}
                    
                >
                    {children}
                </td>
            case 'table-delete':
                return <div {...attributes} style={{ width: "100px" }} onClick={() => { console.log(element.itemId) }}>{children}</div>
            case 'table-cell-add':
                return <td {...attributes}
                    colspan={element.colspan || 1}
                    onClick={() => { setWorkModalVisible(true) }}
                    style={{ width: "100px", height: "40px", background: element.background || "white", color: element.color || "#000" }}
                >
                    {children}
                </td>
            case 'table-content':
                return <div
                    {...attributes}
                    slate-table-element="content"
                    className="table-content"
                >
                    {children}
                </div>
            case "paragraph":
                return <p className="p" {...attributes}>
                    {children}
                </p>
            default:
                return <div>{children}</div>;
        }
    }
    return (
        render()
    );
}
export default inject('slatestore')(observer(TableElement))