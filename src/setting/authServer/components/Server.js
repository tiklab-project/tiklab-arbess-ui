import React,{useState,useEffect} from "react";
import {Space,Table} from "antd";
import serverStore from "../store/ServerStore";
import Breadcrumb from "../../../common/component/breadcrumb/Breadcrumb";
import ListEmpty from "../../../common/component/list/ListEmpty";
import ListIcon from "../../../common/component/list/ListIcon";
import ListAction from "../../../common/component/list/ListAction";
import Profile from "../../../common/component/profile/Profile";
import Tabs from "../../../common/component/tabs/Tabs";
import ServerAddBtn from "./ServerAddBtn";
import "../../authCommon/Auth.scss";

/**
 * 服务配置页面
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Server = props =>{

    const {findAllAuthServerList,deleteAuthServer} = serverStore

    // 弹出框状态
    const [visible,setVisible] = useState(false)

    // 弹出窗form表单value
    const [formValue,setFormValue] = useState(null)

    // 服务配置类型
    const [activeTab,setActiveTab] = useState('all')

    // 服务配置列表
    const [authServerList,setAuthServerList] = useState([])

    useEffect(()=>{
        // 初始化服务配置
        findAuth()
    },[activeTab])

    /**
     * 获取服务配置
     */
    const findAuth = () =>{
        findAllAuthServerList(activeTab).then(r=>{
            if(r.code===0){
                setAuthServerList(r.data || [])
            }
        })
    }

    /**
     * 切换服务配置类型
     * @param item
     */
    const clickServerType = item =>{
        setActiveTab(item.id)
    }

    /**
     * 编辑服务配置
     * @param record
     */
    const editServer = record => {
        setFormValue(record)
        setVisible(true)
    }

    /**
     * 删除服务配置
     * @param record
     */
    const delServer = record =>{
        deleteAuthServer(record.serverId).then(r=>{
            if(r.code===0){
                findAuth()
            }
        })
    }

    const lis = [
        {id:'all', title: "全部"},
        {id:'gitee', title:"Gitee"},
        {id:'github', title:"Github"},
        {id:'xcode', title:"XCode"},
        {id:'teston', title:"TestOn"},
        {id:'sonar', title:"Sonar"},
        {id:'nexus', title:"Nexus"},
        {id:'xpack', title:"XPack"},
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
            case 1: return "全局"
            case 2: return "私有"
        }
    }

    // 操作
    const action = record =>{
        const {type} = record
        if(type==='xcode' || type==='xpack' || type==='teston'){
            if(version !=='ce'){
                return (
                    <ListAction
                        edit={()=>editServer(record)}
                    />
                )
            }
        }
        return (
            <ListAction
                edit={()=>editServer(record)}
                del={()=>delServer(record)}
            />
        )
    }

    // 全部
    const allColumn = [
        {
            title:"名称",
            dataIndex:"name",
            key:"name",
            width:"20%",
            ellipsis:true,
            render:text => name(text)
        },
        {
            title:"类型",
            dataIndex:"type",
            key:"type",
            width:"20%",
            ellipsis:true,
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
            width:"20%",
            ellipsis:true,
        },
        {
            title:"操作",
            dataIndex: "action",
            key: "action",
            width:"10%",
            ellipsis:true,
            render:(text,record) => action(record)
        }
    ]

    // 第三方授权认证 Gitee和Github
    const authorizeColumn = [
        {
            title:"名称",
            dataIndex:"name",
            key:"name",
            width:"20%",
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
            dataIndex:["user","nickname"],
            key:["user","nickname"],
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
            width:"20%",
            ellipsis:true,
        },
        {
            title:"操作",
            dataIndex: "action",
            key: "action",
            width:"10%",
            ellipsis:true,
            render:(text,record) => action(record)
        }
    ]

    // sonar & nexus & teston & xcode
    const authColumn = [
        {
            title:"名称",
            dataIndex:"name",
            key:"name",
            width:"20%",
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
            render: text => text===1?"username&password":"私钥"
        },
        {
            title:"创建人",
            dataIndex:["user","nickname"],
            key:["user","nickname"],
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
            width:"20%",
            ellipsis:true,
        },
        {
            title:"操作",
            dataIndex: "action",
            key: "action",
            width:"10%",
            ellipsis:true,
            render:(_,record) => action(record)
        }
    ]

    // 表格内容
    const columns = activeTab =>{
        switch (activeTab) {
            case 'all':
                return allColumn
            case 'gitee':
            case 'github':
                return authorizeColumn
            case 'xcode':
            case 'teston':
            case 'sonar' :
            case 'nexus' :
            case 'xpack' :
                return authColumn
        }
    }

    return(
        <div className="auth mf-home-limited mf">
            <Breadcrumb firstItem={"服务配置"} >
                <ServerAddBtn
                    type={'gitee'}
                    visible={visible}
                    setVisible={setVisible}
                    formValue={formValue}
                    setFormValue={setFormValue}
                    findAuth={findAuth}
                />
            </Breadcrumb>
            <Tabs tabLis={lis} type={activeTab} onClick={clickServerType}/>
            <div className="auth-content">
                <Table
                    columns={columns(activeTab)}
                    dataSource={authServerList}
                    rowKey={record=>record.serverId}
                    pagination={false}
                    locale={{emptyText: <ListEmpty title={'暂无服务配置'}/>}}
                />
            </div>
        </div>
    )
}

export default Server
