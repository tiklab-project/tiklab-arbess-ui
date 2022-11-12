import React,{useState,useEffect} from "react";
import {Popconfirm,Space,Table,Tooltip} from "antd";
import {EditOutlined,DeleteOutlined} from "@ant-design/icons";
import {inject,observer} from "mobx-react";
import BreadcrumbContent from "../../../common/breadcrumb/breadcrumb";
import EmptyText from "../../../common/emptyText/emptyText";
import AuthBtn from "../components/authBtn";
import "../components/auth.scss";
import {Profile} from "tiklab-eam-ui";
import ListName from "../../../common/list/listname";
import Listaction from "../../../common/list/listaction";

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
                return  <ListName
                            text={text}
                        />
            }
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
                            <Profile userInfo={record.user}/>
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
                return  <Listaction
                            edit={()=>edit(text,record)}
                            del={()=>del(text,record)}
                        />
            }
        }
    ]

    return(
        <div className="auth home-limited mf">
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