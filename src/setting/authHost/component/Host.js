import React, {useEffect, useState} from "react";
import {Space,Table} from "antd";
import hostStore from "../store/HostStore";
import Breadcrumb from "../../../common/component/breadcrumb/Breadcrumb";
import EmptyText from "../../../common/component/emptyText/EmptyText";
import ListIcon from "../../../common/component/list/ListIcon";
import Listaction from "../../../common/component/list/Listaction";
import Profile from "../../../common/component/profile/Profile";
import Tabs from "../../../common/component/tabs/Tabs";
import HostAddBtn from "./HostAddBtn";
import "../../authCommon/Auth.scss";

/**
 * 主机配置页面
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Host = props =>{

    const {findAllAuthHostList,deleteAuthHost} = hostStore

    // 弹出框状态
    const [visible,setVisible] = useState(false)

    // 弹出框form表单value
    const [formValue,setFormValue] = useState(null)

    // 主机配置类型
    const [activeTab,setActiveTab] = useState('all')

    // 主机列表
    const [hostList,setHostList] = useState([])

    useEffect(()=>{
        // 初始化主机配置
        findAuth()
    },[activeTab])

    /**
     * 获取主机配置
     */
    const findAuth = () =>{
        findAllAuthHostList(activeTab).then(r=>{
            if(r.code===0){
                setHostList(r.data || [])
            }
        })
    }

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
        setVisible(true)
        setFormValue(record)
    }

    /**
     * 删除主机配置
     * @param record
     */
    const delHost = record =>{
        deleteAuthHost(record.hostId).then(r=>{
            if(r.code===0){
                findAuth()
            }
        })
    }

    const lis = [
        {id:'all', title: "全部"},
        {id:'common', title:"普通"},
        {id:'aliyun', title:"aliyun"},
        {id:'tencent', title:"腾讯云主机"}
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
            render: text => text===1?"username&password":"私钥"
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
            render:text => text===1?"全局":"私有"
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
            render:(_,record) => {
                return  <Listaction
                            edit={()=>editHost(record)}
                            del={()=>delHost(record)}
                        />
            }
        }
    ]

    return(
        <div className="auth mf-home-limited mf">
            <Breadcrumb firstItem={"主机配置"}>
                <HostAddBtn
                    visible={visible}
                    setVisible={setVisible}
                    formValue={formValue}
                    setFormValue={setFormValue}
                    findAuth={findAuth}
                />
            </Breadcrumb>
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

export default Host
