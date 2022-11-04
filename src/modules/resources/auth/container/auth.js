import React,{useState,useEffect} from "react";
import {Popconfirm,Space,Table,Tooltip} from "antd";
import {EditOutlined,DeleteOutlined} from "@ant-design/icons";
import {inject,observer} from "mobx-react";
import BreadcrumbContent from "../../../../common/breadcrumb/breadcrumb";
import EmptyText from "../../../../common/emptyText/emptyText";
import AuthBtn from "../components/authBtn";
import "../components/auth.scss";
import {Profile} from "tiklab-eam-ui";

const Auth = props =>{

    const {authStore} = props
    const {deleteAuth,findAllAuth,authList,fresh,setModalVisible,setFormValue} = authStore

    useEffect(()=>{
        findAllAuth()
    },[fresh])


    const edit = (text,record) => {
        setModalVisible(true)
        setFormValue(record)
    }

    const del = (text,record) => {
        deleteAuth(record.authId)
    }

    const commonColumns = [
        {
            title:"名称",
            dataIndex:"name",
            key:"name",
            render:text => {
                return  <>
                    <span className="auth-content-icon">
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
                return <span className="auth-content-action">
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
        <div className="auth home-limited">
            <div className="auth-upper">
                <BreadcrumbContent firstItem={"认证配置"}/>
                <AuthBtn/>
            </div>
            <div className="auth-content">
                <Table
                    columns={commonColumns}
                    dataSource={authList}
                    rowKey={record=>record.authId}
                    pagination={false}
                    locale={{emptyText: <EmptyText/>}}
                />
            </div>

        </div>
    )
}

export default inject("authStore")(observer(Auth))