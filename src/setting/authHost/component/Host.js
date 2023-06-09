import React, {useEffect, useState} from "react";
import {Space,Table} from "antd";
import {inject,observer} from "mobx-react";
import BreadcrumbContent from "../../../common/breadcrumb/Breadcrumb";
import EmptyText from "../../../common/emptyText/EmptyText";
import ListIcon from "../../../common/list/ListIcon";
import Listaction from "../../../common/list/Listaction";
import Profile from "../../../common/profile/Profile";
import Tabs from "../../../common/tabs/Tabs";
import HostAddBtn from "./HostAddBtn";
import "../../authCommon/Auth.scss";

/**
 * 主机配置页面
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Host = props =>{

    const {hostStore} = props

    const {findAllAuthHostList,hostList,hostFresh,setModalVisible,setFormValue,deleteAuthHost} = hostStore

    const [activeTab,setActiveTab] = useState('all')

    useEffect(()=>{
        // 初始化主机配置
        findAllAuthHostList(activeTab)
    },[hostFresh,activeTab])

    /**
     * 切换主机配置
     * @param item
     */
    const clickTab = item =>{
        setActiveTab(item.id)
    }

    /**
     * 编辑主机配置
     * @param record
     */
    const editHost = record => {
        setModalVisible(true)
        setFormValue(record)
    }

    /**
     * 删除主机配置
     * @param record
     */
    const delHost = record =>{
        deleteAuthHost(record.hostId)
    }

    const lis = [
        {
            id:'all',
            title: "全部"
        },
        {
            id:'common',
            title:"普通"
        },
        {
            id:'aliyun',
            title:"aliyun"
        },
        {
            id:'tencent',
            title:"腾讯云主机"
        },
    ]

    const column = [
        {
            title:"名称",
            dataIndex:"name",
            key:"name",
            width:"20%",
            ellipsis:true,
            render:text => {
                return  <span>
                            <ListIcon text={text}/>
                            <span>{text}</span>
                        </span>
            }
        },
        {
            title:"ip地址",
            dataIndex: "ip",
            key: "ip",
            width:"10%",
            ellipsis:true,
        },
        {
            title:"端口",
            dataIndex: "port",
            key: "port",
            width:"8%",
            ellipsis:true,
        },
        {
            title:"认证类型",
            dataIndex:"authType",
            key:"authType",
            width:"10%",
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
            dataIndex:["user","nickname"],
            key:"user",
            width:"10%",
            ellipsis:true,
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
            width:"8%",
            ellipsis:true,
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
            width:"15%",
            ellipsis:true,
        },
        {
            title:"操作",
            dataIndex: "action",
            key: "action",
            width:"9%",
            ellipsis:true,
            render:(text,record) => {
                return  <Listaction
                            edit={()=>editHost(record)}
                            del={()=>delHost(record)}
                        />
            }
        }
    ]

    return(
        <div className="auth mf-home-limited mf">
            <div className="auth-upper">
                <BreadcrumbContent firstItem={"主机配置"} />
                <HostAddBtn/>
            </div>
            <Tabs
                tabLis={lis}
                type={activeTab}
                onClick={clickTab}
            />
            <div className="auth-content">
                <Table
                    columns={column}
                    dataSource={hostList}
                    rowKey={record=>record.hostId}
                    pagination={false}
                    locale={{emptyText: <EmptyText title={'暂无主机配置'}/>}}
                />
            </div>
        </div>
    )
}

export default inject("hostStore")(observer(Host))
