import React, {useEffect, useState} from "react";
import {Badge} from "antd";
import {BellOutlined, ClockCircleOutlined, HomeOutlined,ProjectOutlined,SettingOutlined} from "@ant-design/icons";
import PortalMessage from "./PortalMessage";
import {inject, observer} from "mobx-react";
import PortalFeature from "./PortalFeature";
import {getUser,productWhiteImg} from "thoughtware-core-ui";
import {renderRoutes} from "react-router-config";
import './Portal.scss';

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

    // 一级标题
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

    return (
        <main className="mf-layout">
            <header className="mf-layout-header">
                <div className="layout-header">
                    {AppLink}
                    <div className='layout-header-logo' onClick={()=>props.history.push('/home')}>
                        <img alt={'MatFlow'} src={productWhiteImg.matflow} height={24} width={22}/>
                        <div>MatFlow</div>
                    </div>
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
                        {AvatarLink}
                    </div>
                </div>
            </header>
            <section className='mf-layout-content'>
                <div className='mf-home'>
                    {
                        (path==='/pipeline/' || (!path.startsWith('/pipeline/') && !path.startsWith('/setting')) ) &&
                        <aside className="normal-aside">
                            <div className="normal-aside-up">
                                {
                                    firstRouters.map(item=>(
                                        <div key={item.to}
                                             className={`normal-aside-item ${path.indexOf(item.to) === 0 ? "normal-aside-select":""}`}
                                             onClick={()=>props.history.push(item.to)}
                                        >
                                            <div className="normal-aside-item-icon">{item.icon}</div>
                                            <div className="normal-aside-item-title">{item.title}</div>
                                        </div>
                                    ))
                                }
                            </div>
                            <div className="normal-aside-bottom"
                                 onClick={()=>props.history.push(`/setting/myLog`)}
                            >
                                <div className="normal-aside-bottom-icon" data-title-right='设置'>
                                    <SettingOutlined className='bottom-icon'/>
                                </div>
                            </div>
                        </aside>
                    }
                    <section className='mf-normal-content'>
                        {renderRoutes(route.routes)}
                    </section>
                </div>
            </section>
        </main>
    )
}

export default inject("systemRoleStore")(observer(Portal))



