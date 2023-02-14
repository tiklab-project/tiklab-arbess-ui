import React, {useEffect, useState} from "react";
import {Space,Table} from "antd";
import {Profile} from "tiklab-eam-ui";
import {inject,observer} from "mobx-react";
import BreadcrumbContent from "../../../common/breadcrumb/breadcrumb";
import Tabs from "../../../common/tabs/tabs";
import HostBtn from "../component/hostBtn";
import "../../common/resources.scss";
import EmptyText from "../../../common/emptyText/emptyText";
import ListName from "../../../common/list/listname";
import Listaction from "../../../common/list/listaction";

/**
 * 资源配置--主机配置
 */
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
            id:31,
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
            width:"20%",
            ellipsis:true,
            render:text => {
                return  <ListName
                            text={text}
                        />
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
                            edit={()=>edit(text,record)}
                            del={()=>del(text,record)}
                        />
            }
        }
    ]

    return(
        <div className="resources mf-home-limited mf">
            <div className="resources-upper">
                <BreadcrumbContent firstItem={"主机配置"} />
                <HostBtn/>
            </div>
            <Tabs
                tabLis={lis}
                type={activeTab}
                onClick={clickTab}
            />
            <div className="resources-content">
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
