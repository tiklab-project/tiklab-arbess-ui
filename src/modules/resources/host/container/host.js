import React, {useEffect, useState} from "react";
import {DeleteOutlined,EditOutlined} from "@ant-design/icons";
import {Popconfirm,Space,Table,Tooltip} from "antd";
import {inject,observer} from "mobx-react";
import BreadcrumbContent from "../../../../common/breadcrumb/breadcrumb";
import Tabs from "../../../../common/tabs/tabs";
import HostBtn from "../component/hostBtn";
import "../component/host.scss";
import EmptyText from "../../../../common/emptyText/emptyText";
import {Profile} from "tiklab-eam-ui";

const Host = props =>{

    const {hostStore} = props

    const {findAllAuthHostList,hostList,fresh,setModalVisible,setFormValue,deleteAuthHost} = hostStore

    const [activeTab,setActiveTab] = useState(0)

    useEffect(()=>{
        findAllAuthHostList(activeTab)
    },[fresh,activeTab])

    const clickTab = item =>{
        setActiveTab(item.id)
    }

    const edit = (text,record) => {
        setModalVisible(true)
        setFormValue(record)
    }

    const del = (text,record) =>{
        deleteAuthHost(record.hostId)
    }


    const lis = [
        {
            id:0,
            title: "全部"
        },
        {
            id:1,
            title:"普通"
        },
        {
            id:2,
            title:"aliyun"
        },
        {
            id:3,
            title:"腾讯云主机"
        },
    ]

    const column = [
        {
            title:"名称",
            dataIndex:"name",
            key:"name",
            width:"200px",
            ellipsis:true,
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
            title:"ip地址",
            dataIndex: "ip",
            key: "ip",
            width:"140px",
            ellipsis:true,
        },
        {
            title:"端口",
            dataIndex: "port",
            key: "port",
            width:"120px",
            ellipsis:true,
        },
        {
            title:"认证类型",
            dataIndex:"authType",
            key:"authType",
            width:"180px",
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
            width:"200px",
            ellipsis:true,
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
            width:"120px",
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
            width:"180px",
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
                <BreadcrumbContent firstItem={"主机配置"} />
                <HostBtn/>
            </div>
            <div className="code-content">
                <Tabs
                    tabLis={lis}
                    type={activeTab}
                    onClick={clickTab}
                />
                <Table
                    columns={column}
                    dataSource={hostList}
                    rowKey={record=>record.hostId}
                    pagination={false}
                    locale={{emptyText: <EmptyText/>}}
                />
            </div>
        </div>
    )
}

export default inject("hostStore")(observer(Host))