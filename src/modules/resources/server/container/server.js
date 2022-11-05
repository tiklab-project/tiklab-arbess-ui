import React,{useState,useEffect} from "react";
import {Profile} from "tiklab-eam-ui";
import {Popconfirm,Space,Table,Tooltip} from "antd"
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import {inject,observer} from "mobx-react";
import "../components/server.scss";
import EmptyText from "../../../../common/emptyText/emptyText";
import Tabs from "../../../../common/tabs/tabs";
import BreadcrumbContent from "../../../../common/breadcrumb/breadcrumb";
import ServerBtn from "../components/serverBtn";

const Server = props =>{

    const {serverStore} = props

    const {findAllAuthServerList,authServerList,setModalVisible,setFormValue,fresh,deleteAuthServer} = serverStore

    const [activeTab,setActiveTab] = useState(2)

    useEffect(()=>{
        findAllAuthServerList(activeTab)
    },[activeTab,fresh])

    const clickServerType = item =>{
        setActiveTab(item.id)
    }

    const edit = (text,record) => {
        setModalVisible(true)
        setFormValue(record)
    }

    const del = (text,record) =>{
        deleteAuthServer(record.serverId)
    }

    const lis = [
        {
            id:2,
            title:"gitee"
        },
        {
            id:3,
            title:"github"
        },
        {
            id:1,
            title:"sonar"
        },
        {
            id:4,
            title:"nexus"
        },
    ]

    const name = text =>{
        return  <>
                <span className="server-content-icon">
                    {text && text.substring(0,1).toUpperCase()}
                </span>
                <span>
                    {text}
                </span>
        </>
    }

    const user = (text,record) =>{
        return  <Space>
            <Profile />
            {text}
        </Space>
    }

    const authPublic = text =>{
        switch (text) {
            case 1:
                return "全局"
            case 2:
                return "私有"
        }
    }

    const action = (text,record) =>{
        return <span className="server-content-action">
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

    // 第三方授权认证
    const authorizeColumns = [
        {
            title:"名称",
            dataIndex:"name",
            key:"name",
            render:text => name(text)

        },
        {
            title:"创建人",
            dataIndex:["user","name"],
            key:"user",
            render:(text,record) => user(text,record)

        },
        {
            title:"权限",
            dataIndex:"authPublic",
            key:"authPublic",
            render:text => authPublic(text)

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
            render:(text,record) => action(text,record)

        }
    ]

    const authColumn = [
        {
            title:"名称",
            dataIndex:"name",
            key:"name",
            render:text => name(text)

        },
        {
            title: "服务地址",
            dataIndex: "serverAddress",
            key: "serverAddress",
        },
        {
            title:"认证类型",
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
            render:(text,record) => user(text,record)

        },
        {
            title:"权限",
            dataIndex:"authPublic",
            key:"authPublic",
            render:text => authPublic(text)

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
            render:(text,record) => action(text,record)

        }
    ]

    const columns = activeTab =>{
        switch (activeTab) {
            case 1 :
            case 4 :
                return authColumn
            case 2:
            case 3:
                return authorizeColumns
        }
    }

    return(
        <div className="server home-limited">
            <div className="server-upper">
                <BreadcrumbContent firstItem={"服务配置"} />
                <ServerBtn/>
            </div>
            <div className="server-content">
                <Tabs
                    tabLis={lis}
                    type={activeTab}
                    onClick={clickServerType}
                />
                <Table
                    columns={columns(activeTab)}
                    dataSource={authServerList}
                    rowKey={record=>record.serverId}
                    pagination={false}
                    locale={{emptyText: <EmptyText/>}}
                />
            </div>
        </div>
    )
}

export default inject("serverStore")(observer(Server))