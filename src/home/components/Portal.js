import React,{useState,useEffect} from "react";
import {Badge} from "antd";
import {useTranslation} from "react-i18next";
import {getUser,productImg} from "thoughtware-core-ui";
import {renderRoutes} from "react-router-config";
import {
    BellOutlined,
    SettingOutlined,
} from "@ant-design/icons";
import {inject,observer} from "mobx-react";
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

    // 消息抽屉状态
    const [visible,setVisible] = useState(false);
    // 未读消息数量
    const [unread,setUnread] = useState(0);

    useEffect(()=>{
        // 获取系统权限
        getSystemPermissions(getUser().userId)
    },[])

    // 一级标题
    const routers=[
        {
            key:"home",
            to:"/home",
            title: "home",
        },
        {
            key:"pipeline",
            to:"/pipeline",
            title: "pipeline",
        },
        {
            key:"history",
            to:"/history",
            title:"history",
        }
    ]

    return(
        <div className="frame">
            <div className="frame-header">
                <div className="frame-header-right">
                    {AppLink}
                    <div className="frame-header-logo">
                        <img alt={'MatFlow'} src={productImg.matflow} height={24} width={24}/>
                        <div>MatFlow</div>
                    </div>
                    <div className="headers-link">
                        {
                            routers && routers.map(routers =>(
                                <div key={routers.key}
                                     onClick={() => props.history.push(routers.to)}
                                     className={path.indexOf(routers.to) === 0 ? "headers-active" : null}
                                >
                                    <span className='headers-link-text'>{t(routers.title)}</span>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="frame-header-right">
                    <div className="frame-header-right-text">
                        <div className="text_icon_block_item"
                             onClick={()=>props.history.push("/setting/home")}
                             data-title-bottom={'设置'}
                        >
                            <SettingOutlined className="frame-header-icon"/>
                        </div>
                    </div>
                    <div className="frame-header-right-text">
                        <div className={`text_icon_block_item ${visible? "text_icon_block_linked": ''}`}
                             onClick={()=>setVisible(true)}
                             data-title-bottom={'消息'}
                        >
                            {
                                unread>0?
                                    <Badge count={unread} size="small">
                                        <BellOutlined className="frame-header-icon"/>
                                    </Badge>
                                    :
                                    <BellOutlined className="frame-header-icon"/>
                            }
                        </div>
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
