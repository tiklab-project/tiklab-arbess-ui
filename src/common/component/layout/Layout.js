import React, {useEffect, useState} from "react";
import {Badge} from "antd";
import {BellOutlined, SettingOutlined} from "@ant-design/icons";
import PortalMessage from "../../../home/components/PortalMessage";
import {inject, observer} from "mobx-react";
import logo from 'thoughtware-core-ui/es/assests/matflow.png';
import {getUser} from "thoughtware-core-ui";
import {renderRoutes} from "react-router-config";
import './Layout.scss';

const Layout = props =>{

    const {history,route,systemRoleStore,HelpLink,AppLink,AvatarLink} = props;

    const {getSystemPermissions} = systemRoleStore;

    //消息抽屉状态
    const [notificationVisibility,setNotificationVisibility] = useState(false);
    //未读
    const [unread,setUnread] = useState(0);

    useEffect(()=>{
        getSystemPermissions(getUser().userId)
    },[])

    return (
        <main className="mf-layout">
            <header className="mf-layout-header">
                <div className="layout-header">
                    {AppLink}
                    <div className='layout-header-logo' onClick={()=>props.history.push('/home')}>
                        <img alt={'门户中心'} src={logo} height={24} width={24}/>
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
                        {AvatarLink}
                    </div>
                </div>
            </header>
            <section className='mf-layout-content'>
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
                    <div className='normal-aside-bottom'>
                        {HelpLink}
                    </div>
                    <div className="normal-aside-bottom"
                         onClick={()=>props.history.push(`/setting/home`)}
                    >
                        <div className="normal-aside-bottom-icon" data-title-right='设置'>
                            <SettingOutlined className='bottom-icon'/>
                        </div>
                    </div>
                </aside>
                <section className='mf-normal-content'>
                    {renderRoutes(route.routes)}
                </section>
            </section>
        </main>
    )
}

export default inject("systemRoleStore")(observer(Layout))



