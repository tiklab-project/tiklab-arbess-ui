/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-09-17 16:39:39
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-09-30 16:07:15
 */
import React, { useState, useEffect } from "react";
import { Button, Modal, Select, Table, Form } from 'antd';
import { Transforms, Editor } from "slate";
import { inject, observer } from "mobx-react";
import { useSlate, useReadOnly, useSelected } from 'slate-react';
import "./workModal.scss"
import {toJS} from "mobx";
import { insertTable } from "./commands/insertTableWork"
import {
    insertBelow
} from './commands/insertBelow';
import {
    removeRow
} from './commands/removeRow';
import {
    insertAbove
} from './commands/insertAbove';
const { Option } = Select;
const WorkModal = (props) => {
    const { select, editor, slatestore, wikiwork } = props;
    const { workModalVisible, setWorkModalVisible, operationType,selectPath,selectRange } = slatestore;
    const { findWorkItemPage, findAllProject, workTypeList, findAllWorkType, searchCondition,
        workStatusList, findAllWorkStatus, findAllUser, userList, project, workList } = wikiwork;
    const handleCancel = () => {
        setWorkModalVisible(false)
    }
    useEffect(() => {
        if (workModalVisible === true) {
            findAllWorkType()
            findAllWorkStatus()
            findAllProject()
            findAllUser()
        }
    }, [workModalVisible])
    const columns = [
        {
            title: '名称',
            dataIndex: 'title',
            key: 'title',
            render: text => <a>{text}</a>,
        },
        {
            title: '负责人',
            dataIndex: ['assigner', 'name'],
            key: 'assigner',
        },
        {
            title: '状态',
            dataIndex: ['workStatus', 'name'],
            key: 'workStatus',
        },
        {
            title: '类型',
            dataIndex: ['workType', 'name'],
            key: 'workStatus',
        }
    ];

    const [selectedRowKeysAll, setselectedRowKeys] = useState([]);
    const [selectedRowData, setselectedRowData] = useState([]);
    const selectRow = (record) => {
        const selectedRowKeys = [...selectedRowKeysAll];
        const data = [...selectedRowData]
        if (selectedRowKeys.indexOf(record.id) >= 0) {
            selectedRowKeys.splice(selectedRowKeys.indexOf(record.id), 1);
            data.splice(data.indexOf(record.id), 1);
        } else {
            selectedRowKeys.push(record.id);
            data.push(record)
        }
        setselectedRowKeys([...selectedRowKeys])
        setselectedRowData([...data])
    }
    useEffect(()=> {
        console.log("6666",selectedRowKeysAll)
    },[selectedRowKeysAll])
    const onSelectedRowKeysChange = (selectedRowKeys,selectedRows) => {
        setselectedRowKeys([...selectedRowKeys])
        setselectedRowData([...selectedRows])
        console.log("select",selectedRowKeysAll,selectedRowData,selectedRows)
    }

    const rowSelection = {
        selectedRowKeys: selectedRowKeysAll,
        onChange: onSelectedRowKeysChange,
    };
    const rowItem = {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    }

    const [selectionType, setSelectionType] = useState('checkbox');
    const selectEditor = useSlate();
    const [table] = Editor.nodes(selectEditor, {
        match: (n) => n.childrenType === 'table-work',
    });

    const wrapWorkTable = () => {
        switch (operationType) {
            case "insertAbove":
                Transforms.select(editor, toJS(selectRange));
                selectedRowData.map((rowData)=> {
                    // Transforms.setSelection(editor, selectRange);
                    insertAbove(table, selectEditor, rowData, selectPath);
                })
                
                break;
            case "insertBelow":
                Transforms.select(editor, toJS(selectRange));
                selectedRowData.map((rowData)=> {
                    // Transforms.setSelection(editor, selectRange);
                    insertBelow(table, selectEditor, rowData, toJS(selectPath));
                })
                break;
            case "removeRow":
                // removeRow(table, selectEditor,toJS(selectPath));
                Transforms.removeNodes(selectEditor,{at: path})
                break;
            default:
                Transforms.select(editor, select);
                insertTable(editor, columns, selectedRowData)
                break;
        }
        setWorkModalVisible(false)
    }
    const [form] = Form.useForm();
    const search = (values) => {
        console.log(values)
        findWorkItemPage(values)
    }
    return (
        <Modal title="选择事项" visible={workModalVisible} onOk={() => wrapWorkTable()} onCancel={handleCancel} className="workModal" width="50vw">
            <div className="workModal-select">
                <Form
                    form={form}
                    name="control-hooks"
                    onFinish={search}
                    layout="inline"
                    className="work-head"
                    initialValues={{
                        project: searchCondition.project,
                        workType: searchCondition.workType,
                        workStatus: searchCondition.workStatus,
                        // user: "",
                        title: searchCondition.title,
                    }}
                >
                    <Form.Item name="project" rules={[{ required: false }]} >
                        <Select placeholder="所有项目"
                            allowClear
                            className="work-select"
                            key="workType"
                        >
                            {
                                project && project.map((item) => {
                                    return <Select.Option value={item.id} key={item.id}>{item.projectName}</Select.Option>
                                })
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item name="workType" rules={[{ required: false }]} >
                        <Select placeholder="所有项目类型"
                            allowClear
                            className="work-select"
                            key="workType"
                        >
                            {
                                workTypeList && workTypeList.map((item) => {
                                    return <Select.Option value={item.id} key={item.id}>{item.name}</Select.Option>
                                })
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item name="workStatus" rules={[{ required: false }]} >
                        <Select
                            placeholder="所有状态"
                            allowClear
                            className="work-select"
                            key="workStatus"
                        >
                            {
                                workStatusList && workStatusList.map((item) => {
                                    return <Select.Option value={item.id} key={item.id}>{item.name}</Select.Option>
                                })
                            }

                        </Select>
                    </Form.Item>
                    <Form.Item name="user" rules={[{ required: false }]} >
                        <Select
                            placeholder="所有人"
                            allowClear
                            className="work-select"
                            key="user"
                        >
                            {
                                userList && userList.map((item) => {
                                    return <Select.Option value={item.id} key={item.id}>{item.name}</Select.Option>
                                })
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">搜索</Button>
                    </Form.Item>
                </Form>
            </div>
            <div className="workModal-table">
                <Table
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={workList}
                    rowKey={record => record.id}
                    onRow={(record) => ({
                        onClick: () => {selectRow(record);
                        },
                    })}
                />
            </div>

        </Modal>)
}
export default inject('slatestore', 'wikiwork')(observer(WorkModal));