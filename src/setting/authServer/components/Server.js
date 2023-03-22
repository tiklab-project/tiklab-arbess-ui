import React,{useState,useEffect} from "react";
import {Space,Table} from "antd"
import {inject,observer} from "mobx-react";
import BreadcrumbContent from "../../../common/breadcrumb/Breadcrumb";
import EmptyText from "../../../common/emptyText/EmptyText";
import ListIcon from "../../../common/list/ListIcon";
import Listaction from "../../../common/list/Listaction";
import Profile from "../../../common/Profile/Profile";
import Tabs from "../../../common/tabs/Tabs";
import ServerAddBtn from "./ServerAddBtn";
import "../../authCommon/Auth.scss";

/**
 * 服务配置页面
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Server = props =>{

    const {serverStore} = props

    const {findAllAuthServerList,authServerList,setModalVisible,setFormValue,serverFresh,deleteAuthServer} = serverStore

    const [activeTab,setActiveTab] = useState(0)

    useEffect(()=>{
        // 初始化服务配置
        findAllAuthServerList(activeTab)
    },[activeTab,serverFresh])

    /**
     * 切换服务配置类型
     * @param item
     */
    const clickServerType = item =>{
        setActiveTab(item.id)
    }

    /**
     * 编辑服务配置
     * @param text
     * @param record
     */
    const editServer = (text,record) => {
        setModalVisible(true)
        setFormValue(record)
    }

    /**
     * 删除服务配置
     * @param text
     * @param record
     */
    const delServer = (text,record) =>{
        deleteAuthServer(record.serverId)
    }

    const lis = [
        {
            id:0,
            title: "全部"
        },
        {
            id:2,
            title:"gitee"
        },
        {
            id:3,
            title:"github"
        },
        {
            id:41,
            title:"sonar"
        },
        {
            id:51,
            title:"nexus"
        },
    ]

    // 标题
    const name = text =>{
        return  <span>
                    <ListIcon text={text}/>
                    <span>{text}</span>
                </span>
    }

    // 创建人
    const user = (text,record) =>{
        return  <Space>
                    <Profile userInfo={record.user}/>
                    {text}
                </Space>
    }

    // 权限
    const authPublic = text =>{
        switch (text) {
            case 1:
                return "全局"
            case 2:
                return "私有"
        }
    }

    // 操作
    const action = (text,record) =>{
        return  <Listaction
                    edit={()=>editServer(text,record)}
                    del={()=>delServer(text,record)}
                />
    }

    // 全部
    const allColumn = [
        {
            title:"名称",
            dataIndex:"name",
            key:"name",
            width:"25%",
            ellipsis:true,
            render:text => name(text)
        },
        {
            title:"类型",
            dataIndex:"type",
            key:"type",
            width:"20%",
            ellipsis:true,
            render:text => {
                switch (text) {
                    case 2:
                        return "gitee"
                    case 3:
                        return "github"
                    case 41:
                        return "sonar"
                    case 51:
                        return "nexus"
                }
            }
        },
        {
            title:"创建人",
            dataIndex:["user","nickname"],
            key:"user",
            width:"20%",
            ellipsis:true,
            render:(text,record) => user(text,record)
        },
        {
            title:"权限",
            dataIndex:"authPublic",
            key:"authPublic",
            width:"10%",
            ellipsis:true,
            render:text => authPublic(text)
        },
        {
            title:"创建时间",
            dataIndex:"createTime",
            key:"createTime",
            width:"15%",
            ellipsis:true,
        },
        {
            title:"操作",
            dataIndex: "action",
            key: "action",
            width:"10%",
            ellipsis:true,
            render:(text,record) => action(text,record)
        }
    ]

    // 第三方授权认证 Gitee和Github
    const authorizeColumn = [
        {
            title:"名称",
            dataIndex:"name",
            key:"name",
            width:"25%",
            ellipsis:true,
            render:text => name(text)
        },
        {
            title:"授权信息",
            dataIndex:"message",
            key:"message",
            width:"20%",
            ellipsis:true,
        },
        {
            title:"创建人",
            dataIndex:["user","name"],
            key:"user",
            width:"20%",
            ellipsis:true,
            render:(text,record) => user(text,record)

        },
        {
            title:"权限",
            dataIndex:"authPublic",
            key:"authPublic",
            width:"10%",
            ellipsis:true,
            render:text => authPublic(text)
        },
        {
            title:"创建时间",
            dataIndex:"createTime",
            key:"createTime",
            width:"15%",
            ellipsis:true,
        },
        {
            title:"操作",
            dataIndex: "action",
            key: "action",
            width:"10%",
            ellipsis:true,
            render:(text,record) => action(text,record)
        }
    ]

    // sonar和nexus
    const authColumn = [
        {
            title:"名称",
            dataIndex:"name",
            key:"name",
            width:"25%",
            ellipsis:true,
            render:text => name(text)
        },
        {
            title: "服务地址",
            dataIndex: "serverAddress",
            key: "serverAddress",
            width:"15%",
            ellipsis:true,
        },
        {
            title:"认证类型",
            dataIndex:"authType",
            key:"authType",
            width:"15%",
            ellipsis:true,
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
            width:"15%",
            ellipsis:true,
            render:(text,record) => user(text,record)

        },
        {
            title:"权限",
            dataIndex:"authPublic",
            key:"authPublic",
            width:"10%",
            ellipsis:true,
            render:text => authPublic(text)
        },
        {
            title:"创建时间",
            dataIndex:"createTime",
            key:"createTime",
            width:"10%",
            ellipsis:true,
        },
        {
            title:"操作",
            dataIndex: "action",
            key: "action",
            width:"10%",
            ellipsis:true,
            render:(text,record) => action(text,record)
        }
    ]

    // 表格内容
    const columns = activeTab =>{
        switch (activeTab) {
            case 0:
                return allColumn
            case 51 :
            case 41 :
                return authColumn
            case 2:
            case 3:
                return authorizeColumn
        }
    }

    return(
        <div className="resources mf-home-limited mf">
            <div className="resources-upper">
                <BreadcrumbContent firstItem={"服务配置"} />
                <ServerAddBtn type={2}/>
            </div>
            <Tabs tabLis={lis} type={activeTab} onClick={clickServerType}/>
            <div className="resources-content">
                <Table
                    columns={columns(activeTab)}
                    dataSource={authServerList}
                    rowKey={record=>record.serverId}
                    pagination={false}
                    locale={{emptyText: <EmptyText title={'暂无服务配置'}/>}}
                />
            </div>
        </div>
    )
}

export default inject("serverStore")(observer(Server))
