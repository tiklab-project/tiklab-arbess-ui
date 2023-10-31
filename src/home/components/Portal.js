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
import logo from "../../assets/images/img/matflow.png";
import { PortalDropdown } from "../../common/component/dropdown/DropdownMenu";
import PortalMessage from "./PortalMessage";
import "./Portal.scss";

/**
 * header 头部
 */
const  Portal = props =>{

    const {route,systemRoleStore,AppLink,HelpLink,AvatarLink} = props

    const {getSystemPermissions} = systemRoleStore

    let path = props.location.pathname
    const {t} = useTranslation()
    // 当前路由
    const [currentLink,setCurrentLink] = useState(path)
    // 消息抽屉状态
    const [visible,setVisible] = useState(false)
    // 未读消息数量
    const [unread,setUnread] = useState(0)

    useEffect(()=>{
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

    return(
        <div className="frame">
            <div className="frame-header">
                <div className="frame-header-right">
                    <div className="frame-header-applink">
                        {AppLink}
                    </div>
                    <div className="frame-header-logo">
                        <img src={logo} alt="logo" />
                    </div>
                    <div className="headers-link">
                        {
                            routers && routers.map(routers =>(
                                <div key={routers.key}
                                     onClick={() => props.history.push(routers.to)}
                                     className={currentLink === routers.to ? "headers-active" : null}
                                >
                                    {t(routers.title)}
                                </div>
                            ))
                        }
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
                            unread={unread}
                            setUnread={setUnread}
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

export default inject("systemRoleStore")(observer(Portal))
