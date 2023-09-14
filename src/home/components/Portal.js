import React,{useState,useEffect} from "react";
import {Badge} from "antd";
import {useTranslation} from "react-i18next";
import {getUser} from "tiklab-core-ui";
import {renderRoutes} from "react-router-config";
import {
    BellOutlined,
    SettingOutlined,
} from "@ant-design/icons";
import {inject,observer} from "mobx-react";
import logo from "../../assets/images/img/matflow3.png";
import { PortalDropdown } from "../../common/component/dropdown/DropdownMenu";
import PortalMessage from "./PortalMessage";
import messageStore from "../store/MessageStore"
import "./Portal.scss";

/**
 * header 头部
 */
const  Portal = props =>{

    const {route,pipelineStore,systemRoleStore,AppLink,HelpLink,AvatarLink} = props

    const {findMessageItemPage} = messageStore
    const {findUserPipeline,pipelineList} = pipelineStore
    const {getSystemPermissions} = systemRoleStore

    let path = props.location.pathname
    const {t} = useTranslation()
    const [currentLink,setCurrentLink] = useState(path)
    const [visible,setVisible] = useState(false)
    const [unread,setUnread] = useState(0)

    useEffect(()=>{

        // 获取未读消息通知
        findMessageItemPage({
            status:0,
            pageParam: {
                pageSize: 12,
                currentPage: 1
            }
        }).then(res=>{
            if(res.code===0){
                setUnread(res.data.totalRecord || 0)
            }
        })

        // 获取所有流水线
        findUserPipeline()

        // 获取系统权限
        getSystemPermissions(getUser().userId)

    },[])

    useEffect(()=>{
        if(path.indexOf("/index/pipeline")===0) path = "/index/pipeline"
        setCurrentLink(path)
    },[path])

    // 一级标题
    const routers=[
        {
            key:"home",
            to:"/index/home",
            title: "home",
        },
        {
            key:"pipeline",
            to:"/index/pipeline",
            title: "pipeline",
        },
        {
            key:"history",
            to:"/index/history",
            title:"history",
        }
    ]

    /**
     * 路由跳转
     * @param item
     */
    const changeCurrentLink = item => {
        props.history.push(item.to)
    }

    // 渲染一级标题
    const renderRouter = routers => {
        return routers && routers.map(routers => {
            return <div key={routers.key}
                        onClick={() => changeCurrentLink(routers)}
                        className={currentLink === routers.to ? "headers-active" : null}
            >
                {t(routers.title)}
            </div>
        })
    }

    return(
        <div className="frame">
            <div className="frame-header">
                <div className="frame-header-right">
                    {AppLink}
                    <div className="frame-header-logo">
                        <img src={logo} alt="logo" />
                    </div>
                    <div className="headers-link">
                        {renderRouter(routers)}
                    </div>
                </div>
                <div className="frame-header-right">
                    <div className="frame-header-right-text">
                        <PortalDropdown
                            tooltip={'设置'}
                            Icon={<SettingOutlined className="frame-header-icon"/>}
                            onClick={()=>props.history.push("/index/system")}
                        />
                    </div>
                    <div className="frame-header-right-text">
                        <PortalDropdown
                            visibility={visible}
                            tooltip={'消息'}
                            Icon={ <Badge count={unread} size="small">
                                    <BellOutlined className="frame-header-icon"/>
                                </Badge>}
                            onClick={()=>setVisible(true)}
                        />
                        <PortalMessage
                            {...props}
                            visible={visible}
                            setVisible={setVisible}
                            pipelineList={pipelineList}
                            unread={unread}
                            setUnread={setUnread}
                            messageStore={messageStore}
                        />
                    </div>
                    <div className="frame-header-right-text">
                        {HelpLink}
                    </div>
                    <div className="frame-header-right-text">
                        {AvatarLink}
                    </div>
                </div>
            </div>
            <div className="frame-content">
                {renderRoutes(route.routes)}
            </div>
        </div>
    )
}

export default inject("systemRoleStore","pipelineStore")(observer(Portal))
