import React, {useEffect, useState} from "react";
import {Badge} from "antd";
import {
    BellOutlined,
    ClockCircleOutlined,
    HomeOutlined,
    MenuFoldOutlined,
    ProjectOutlined,
    SettingOutlined
} from "@ant-design/icons";
import PortalMessage from "../../home/components/PortalMessage";
import {inject, observer} from "mobx-react";
import PortalFeature from "../../home/components/PortalFeature";
import PipelineAside from "./PipelineAside";
import {getUser, productWhiteImg} from "thoughtware-core-ui";
import {renderRoutes} from "react-router-config";
import './Portal.scss';

const firstRouters=[
    {
        to:"/home",
        title: "首页",
        icon:<HomeOutlined />
    },
    {
        to:"/pipeline",
        title: "流水线",
        icon:<ProjectOutlined />,
    },
    {
        to:"/history",
        title:"历史",
        icon: <ClockCircleOutlined />,
    }
]

const Portal = props =>{

    const {history,route,systemRoleStore,HelpLink,AppLink,AvatarLink} = props;

    const {getSystemPermissions} = systemRoleStore;

    const path = props.location.pathname;

    //消息抽屉状态
    const [notificationVisibility,setNotificationVisibility] = useState(false);
    //未读
    const [unread,setUnread] = useState(0);

    useEffect(()=>{
        getSystemPermissions(getUser().userId)
    },[])

    const asideHtml = () => {
        if(path.startsWith('/setting')){
            return props.children
        }
        if(path.startsWith('/pipeline/') && path !=='/pipeline/'){
            return <PipelineAside {...props}/>
        }
        return (
            <aside className="mf-normal-aside">
                <div className="normal-aside-up">
                    <div className='normal-aside-logo' onClick={()=>history.push('/home')}>
                        <img src={productWhiteImg.matflow} height={32} width={28} alt={''}/>
                    </div>
                    {
                        firstRouters.map(item=>(
                            <div key={item.to}
                                 className={`normal-aside-item ${path.indexOf(item.to) === 0 ? "normal-aside-select":""}`}
                                 onClick={()=>history.push(item.to)}
                            >
                                <div className="normal-aside-item-icon">{item.icon}</div>
                                <div className="normal-aside-item-title">{item.title}</div>
                            </div>
                        ))
                    }
                </div>
                <div className="normal-aside-bottom"
                     onClick={()=>history.push(`/setting/myLog`)}
                >
                    <div className="normal-aside-bottom-icon" data-title-right='设置'>
                        <SettingOutlined className='bottom-icon'/>
                    </div>
                </div>
            </aside>
        )
    }

    return (
        <main className="mf-layout">
            {asideHtml()}
            <section className='mf-layout-content'>
                <header className="mf-layout-header">
                    <div className="layout-header">
                        <MenuFoldOutlined style={{fontSize:20}}/>
                    </div>
                    <div className="layout-header">
                        <div className="layout-header-text">
                            <div className={`layout-header-text-icon ${notificationVisibility? "layout-header-text-icon-linked": ''}`}
                                 onClick={()=>setNotificationVisibility(true)}
                                 data-title-bottom={'消息'}
                            >
                                {
                                    unread>0?
                                        <Badge count={unread} size="small">
                                            <BellOutlined className="text-icon"/>
                                        </Badge>
                                        :
                                        <BellOutlined className="text-icon"/>
                                }
                            </div>
                            <PortalMessage
                                history={history}
                                unread={unread}
                                setUnread={setUnread}
                                visible={notificationVisibility}
                                setVisible={setNotificationVisibility}
                            />
                        </div>
                        <div className="layout-header-text">
                            {HelpLink}
                        </div>
                        <div className="layout-header-text">
                            <PortalFeature/>
                        </div>
                        <div className="layout-header-text">
                            {AppLink}
                        </div>
                        <div className="layout-header-text">
                            {AvatarLink}
                        </div>
                    </div>
                </header>
                <div className='mf-layout-home'>
                    {renderRoutes(route.routes)}
                </div>
            </section>
        </main>
    )
}

export default inject("systemRoleStore")(observer(Portal))



