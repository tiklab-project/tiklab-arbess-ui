import React, {useEffect, useState} from "react";
import {DeleteOutlined,EditOutlined,PlusOutlined} from "@ant-design/icons";
import {Popconfirm,Space,Table,Tooltip} from "antd";
import {inject,observer} from "mobx-react";
import BreadcrumbContent from "../../../../common/breadcrumb/breadcrumb";
import Tabs from "../../../../common/tabs/tabs";
import CodeBtn from "../component/codeBtn";
import "../component/code.scss";
import EmptyText from "../../../../common/emptyText/emptyText";
import {Profile} from "tiklab-eam-ui";

const Code = props =>{

    const {codeStore} = props

    const {findAllAuthCodeList,authCodeList,fresh,setModalVisible,setFormValue,deleteAuthCode} = codeStore

    const [code,setCode] = useState(1) //授权类型

    useEffect(()=>{
        findAllAuthCodeList(code)
    },[code,fresh])

    const lis = [
        {
            id:1,
            title:"通用"
        },
        {
            id:2,
            title:"第三方授权"
        }
    ]

    const edit = (text,record) => {
        setModalVisible(true)
        setFormValue(record)
    }

    const del = (text,record) =>{
        deleteAuthCode(record.codeId)
    }

    const columns = code =>{
        switch (code) {
            case 1:
                return commonColumns
            case 2:
                return authorizeColumns
        }
    }


    const tabCLick = item =>{
        setCode(item.id)
    }

    // 普通认证
    const commonColumns = [
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
            title:"类型",
            dataIndex:"authType",
            key:"authType",
            render: text => {
                switch (text) {
                    case 2:
                        return "username&password"
                    case 3:
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

    // 第三方授权认证
    const authorizeColumns = [
        {
            title:"名称",
            dataIndex:"names",
            key:"names",
        },
        {
            title:"授权类型",
            dataIndex:"authType",
            key:"authType",
        },
        {
            title:"创建人",
            dataIndex:["user","name"],
            key:"user",
        },
        {
            title:"权限",
            dataIndex:"authPublic",
            key:"authPublic",
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
        }
    ]

    return(
        <div className="code home-limited">
            <div className="code-upper">
                <BreadcrumbContent firstItem={"源码配置"} />
                <CodeBtn/>
            </div>
            <div className="code-content">
                <Tabs
                    onClick={tabCLick}
                    tabLis={lis}
                    type={code}
                />
                <Table
                    columns={columns(code)}
                    dataSource={authCodeList}
                    rowKey={record=>record.codeId}
                    pagination={false}
                    locale={{emptyText: <EmptyText/>}}
                />
            </div>
        </div>
    )
}

export default inject("codeStore")(observer(Code))