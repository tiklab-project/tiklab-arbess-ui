/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-09-29 09:39:35
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-10-09 13:11:33
 */
import React, { useState, useEffect } from "react"
import { inject, observer } from "mobx-react";
import { Transforms, Editor } from "slate";
import { useFocused, ReactEditor, useSlate } from 'slate-react';
import WorkTableTools from "./workTableTool"
import "./workTableElement.scss"
import { Fragment } from "react/cjs/react.production.min";
import "./workTableElement.scss";
import { PlusCircleTwoTone } from '@ant-design/icons';
import { Menu, Dropdown, Button } from 'antd';


const RowElement = (props) => {
    const { element, attributes, children, wikiwork, slatestore } = props;
    const { findWorkItem } = wikiwork;
    const { setWorkModalVisible, setOperationType, setSelectPath, setSelectRange,selectPath } = slatestore;
    const [rowData, setRowData] = useState()
    const focused = useFocused()
    useEffect(() => {
        findWorkItem(element.id).then((data) => {
            setRowData({ ...data })
        })
    }, [element.id])
    const editor = useSlate()
    const insertRow = (key,type) => {
        const workRow = document.getElementById(key)
        // const node = ReactEditor.toSlateNode(editor, workRow)
        const path = ReactEditor.findPath(editor, element)
        console.log(event)
        const range = ReactEditor.findEventRange(editor, event)
        console.log(event)
        setSelectPath(path)
        setSelectRange(range)
        setWorkModalVisible(true)
        setOperationType(type)
    }
    const remove = () => {
        const path = ReactEditor.findPath(editor, element)
        Transforms.removeNodes(editor,{at: path})
    }
    const menu = (
        <Menu>
            <Menu.Item  key= "insertAbove"> 
                <div onClick={() => insertRow(element.key,"insertAbove")} {...attributes}>{children[0]}</div>
            </Menu.Item>
            <Menu.Item key= "insertBelow">
                <div onClick={() => insertRow(element.key,"insertBelow")} {...attributes}>{children[1]}</div>
            </Menu.Item>
            <Menu.Item key="removeRow">
                <div onClick={() =>remove()} {...attributes}>{children[2]}</div>
            </Menu.Item>
        </Menu>
    );
    return (
        <Fragment>
            {
                rowData &&
                <tr  className="workTale-tr" id={element.key} contentEditable={false}>
                    <td>{rowData.title}</td>
                    <td>{rowData.assigner.name}</td>
                    <td>{rowData.workStatus.name}</td>
                    <td>{rowData.workType.name}</td>
                    <td className="row-add" > 
                        {/* <div onClick={() => insertRow(element.key,"insertAbove")}>{children}</div> */}
                        
                        <Dropdown overlay={menu} placement="bottomCenter" arrow>
                            <PlusCircleTwoTone />
                        </Dropdown>
                        {/* <button onClick={() => insertRow(element.key,"insertAbove")}>{element.key}</button>
                        <button onClick={() => remove()}>删除</button> */}
                    </td>
                </tr>

            }
        </Fragment>

    )
}

export default inject('wikiwork', 'slatestore')(observer(RowElement))