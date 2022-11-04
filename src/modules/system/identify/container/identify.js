import React,{useState,useEffect} from "react";
import {Profile} from "tiklab-eam-ui";
import {DeleteOutlined,EditOutlined} from "@ant-design/icons";
import {Popconfirm,Table,Tooltip,Space} from "antd";
import BreadcrumbContent from "../../../../common/breadcrumb/breadcrumb";
import EmptyText from "../../../../common/emptyText/emptyText";
import IdentifyAddBtn from "../componets/identifyAddBtn";
import "../componets/identify.scss";
import {inject,observer} from "mobx-react";

const Identify = props =>{

    const {identifyStore} = props

    const {findAllAuth,deleteAuth,setVisible,setFormValue,fresh,identifyList} = identifyStore

    const [activeTab,setActiveTab] = useState(1) // tab选项

    useEffect(()=>{
        findAllAuth(activeTab)
    },[fresh,activeTab])

    const setId = record =>{
        switch (record.type) {
            case 1:
                return record.basicId
            case 2:
                return record.otherId
            case 3:
                return record.hostId
            case 4:
                return record.thirdId
        }
    }


    const deletePart = (text,record) => {
        const params = {
            type:record.type,
            authId:setId(record)
        }
        deleteAuth(params)
    }

    const edit = (text,record) => {
        setFormValue(record)
        setVisible(true)
    }

    const names = text =>{
        return  <>
                    <span className="identify-content-icon">
                        {text && text.substring(0,1).toUpperCase()}
                    </span>
                    <span>
                        {text}
                    </span>
                </>
    }

    const authType = (text,label) =>{
        switch (text) {
            case 2:
                return "username&password"
            case 3:
                return label
        }
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
        return <span className="identify-content-action">
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
                    onConfirm={()=>deletePart(text,record)}
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

    const typeLis = [
        // {
        //     id:1,
        //     title:"普通认证",
        // },
        {
            id:2,
            title:"服务认证",
        },
        {
            id:3,
            title:"物理主机认证",
        },
        {
            id:4,
            title:"第三方授权",
        },
    ]

    // 服务认证
    const serveColumns = [
        {
            title:"名称",
            dataIndex:"names",
            key:"names",
            render:text => names(text)
        },
        {
            title:"服务地址",
            dataIndex:"address",
            key:"address",
        },
        {
            title:"类型",
            dataIndex:"authType",
            key:"authType",
            render: text => authType(text,"私钥")
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

    // 物理主机认证
    const hostColumns = [
        {
            title:"名称",
            dataIndex:"names",
            key:"names",
            render:text => names(text)
        },
        {
            title:"ip地址",
            dataIndex:"ip",
            key:"ip",
        },
        {
            title:"端口",
            dataIndex:"port",
            key:"port",
        },
        {
            title:"类型",
            dataIndex:"authType",
            key:"authType",
            render: text => authType(text,"token")
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

    // 第三方授权认证
    const authorizeColumns = [
        {
            title:"名称",
            dataIndex:"names",
            key:"names",
            render:text => names(text)
        },
        {
            title:"授权应用",
            dataIndex:"authType",
            key:"authType",
            render:text => {
                switch (text) {
                    case 2:
                        return "Gitee"
                    case 3:
                        return "Github"
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
            render:(text,record) =>action(text,record)
        }
    ]

    const columns = activeTab =>{
        switch (activeTab) {
            case 2 :
                return serveColumns
            case 3:
                return hostColumns
            case 4:
                return authorizeColumns
        }
    }

    return(
        <div className="identify home-limited">
            <div className="identify-upper">
                <BreadcrumbContent firstItem={"资源配置"} />
                <IdentifyAddBtn/>
            </div>
            <div className="identify-content">
                <div className="identify-tabs">
                    {
                        typeLis.map(item=>{
                            return <div
                                key={item.id}
                                className={`identify-tab ${activeTab===item.id?"active-tab":""}`}
                                onClick={()=>setActiveTab(item.id)}
                            >
                                {item.title}
                            </div>
                        })
                    }
                </div>
                <Table
                    columns={columns(activeTab)}
                    dataSource={identifyList}
                    rowKey={record=>setId(record)}
                    pagination={false}
                    locale={{emptyText: <EmptyText/>}}
                />
            </div>
        </div>
    )
}

export default inject("identifyStore")(observer(Identify))