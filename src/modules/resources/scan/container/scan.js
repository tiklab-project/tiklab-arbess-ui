import React, {useEffect, useState} from "react";
import {DeleteOutlined,EditOutlined} from "@ant-design/icons";
import {Popconfirm,Space,Table,Tooltip} from "antd";
import {inject,observer} from "mobx-react";
import BreadcrumbContent from "../../../../common/breadcrumb/breadcrumb";
import ScanBtn from "../component/scanBtn";
import "../component/scan.scss";
import EmptyText from "../../../../common/emptyText/emptyText";
import {Profile} from "tiklab-eam-ui";

const Scan = props =>{

    const {scanStore} = props

    const {findAllAuthCodeScan,authScanList,fresh,setModalVisible,setFormValue,deleteAuthCodeScan} = scanStore

    useEffect(()=>{
        findAllAuthCodeScan()
    },[fresh])


    const edit = (text,record) => {
        setModalVisible(true)
        setFormValue(record)
    }

    const del = (text,record) =>{
        deleteAuthCodeScan(record.codeScanId)
    }

    const column = [
        {
            title:"名称",
            dataIndex:"name",
            key:"name",
            render:text => {
                return  <>
                    <span className="code-content-icon">
                        {text && text.substring(0,1).toUpperCase()}
                    </span>
                    <span>
                        {text}
                    </span>
                </>
            }
        },
        {
            title: "服务地址",
            dataIndex: "serverAddress",
            key: "serverAddress",
        },
        {
            title:"类型",
            dataIndex:"authType",
            key:"authType",
            render: text => {
                switch (text) {
                    case 1:
                        return "username&password"
                    case 2:
                        return "私钥"
                }
            }
        },
        {
            title:"创建人",
            dataIndex:["user","name"],
            key:"user",
            render:(text,record) => {
                return  <Space>
                    <Profile />
                    {text}
                </Space>
            }
        },
        {
            title:"权限",
            dataIndex:"authPublic",
            key:"authPublic",
            render:text => {
                switch (text) {
                    case 1:
                        return "全局"
                    case 2:
                        return "私有"
                }
            }
        },
        {
            title:"创建时间",
            dataIndex:"createTime",
            key:"createTime",
        },
        {
            title:"操作",
            dataIndex: "action",
            key: "action",
            render:(text,record) => {
                return <span className="code-content-action">
                    <Tooltip title="修改">
                        <span className="edit"
                              onClick={()=>edit(text,record)}
                        >
                            <EditOutlined />
                        </span>
                    </Tooltip>
                    <Tooltip title="删除">
                        <Popconfirm
                            style={{marginTop:100}}
                            title="你确定删除吗"
                            onConfirm={()=>del(text,record)}
                            kText="确定"
                            cancelText="取消"
                        >
                            <span className="del">
                                <DeleteOutlined />
                            </span>
                        </Popconfirm>
                    </Tooltip>
                </span>
            }
        }
    ]

    return(
        <div className="code home-limited">
            <div className="code-upper">
                <BreadcrumbContent firstItem={"代码扫描"} />
                <ScanBtn/>
            </div>
            <div className="code-content">
                <Table
                    columns={column}
                    dataSource={authScanList}
                    rowKey={record=>record.codeScanId}
                    pagination={false}
                    locale={{emptyText: <EmptyText/>}}
                />
            </div>
        </div>
    )
}

export default inject("scanStore")(observer(Scan))