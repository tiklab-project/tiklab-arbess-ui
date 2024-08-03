import React, {useEffect, useState} from "react";
import {
    BellOutlined,
    ClockCircleOutlined,
    HomeOutlined,
    LeftCircleOutlined,
    ProjectOutlined,
    QuestionCircleOutlined,
    RightCircleOutlined,
    SettingOutlined
} from "@ant-design/icons";
import PortalMessage from "./PortalMessage";
import {inject, observer} from "mobx-react";
import PipelineAside from "./PipelineAside";
import {getUser, productWhitePureImg, productTitle, productWhiteImg} from "thoughtware-core-ui";
import {renderRoutes} from "react-router-config";
import Profile from "../component/profile/Profile";
import menuBlack from '../../assets/images/menu-black.png';
import menuWhite from '../../assets/images/menu-white.png';
import './Portal.scss';

const firstRouters=[
    {
        key:"/home",
        to:"/home",
        title: "首页",
        icon:<HomeOutlined />
    },
    {
        key:"/pipeline",
        to:"/pipeline",
        title: "流水线",
        icon:<ProjectOutlined />,
    },
    {
        key:"/history",
        to:"/history",
        title:"历史",
        icon: <ClockCircleOutlined />,
    },
    {
        key:"/setting",
        to:"/setting/myLog",
        title:"设置",
        icon: <SettingOutlined />,
    }
]

const Portal = props =>{

    const {route,history,systemRoleStore,HelpLink,AppLink,AvatarLink} = props;

    const {getSystemPermissions} = systemRoleStore;

    const path = props.location.pathname;

    //是否折叠
    const [isExpand,setIsExpand] = useState(false);
    //消息抽屉状态
    const [notificationVisibility,setNotificationVisibility] = useState(false);
    //未读
    const [unread,setUnread] = useState(0);
    //主题色
    const [themeType,setThemeType] = useState('default');

    useEffect(()=>{
        getSystemPermissions(getUser().userId);
        const type = localStorage.getItem('theme')
        if(type){
            setThemeType(type)
        }
    },[])

    /**
     * type三个参数为:
     * default(默认 --> --thoughtware-gray-600)，
     * blue(蓝色 --> #2f5eb1)，
     * black(黑色 --> #131d30)
     */
    const changeTheme = type => {
        setThemeType(type)
        localStorage.setItem('theme',type)
    }

    const asideHtml = () => {
        if(path.startsWith('/setting')){
            return props.children
        }
        if(path.startsWith('/pipeline/') && path !=='/pipeline/'){
            return (
                <PipelineAside
                    {...props}
                    isExpand={isExpand}
                    setIsExpand={setIsExpand}
                    themeType={themeType}
                />
            )
        }
        return (
            <div className={`mf-aside ${isExpand ? 'mf-aside-expand': 'mf-aside-normal'} mf-aside-${themeType}`}>
                <div className='aside-logo' onClick={()=>history.push('/home')}>
                    {
                        themeType === 'default' ?
                            <img src={productWhiteImg.matflow} height={32} width={32} alt={''}/>
                            :
                            <img src={productWhitePureImg.matflow} height={32} width={32} alt={''}/>
                    }
                    {isExpand&&<div className='aside-logo-text'>{productTitle.matflow}</div>}
                </div>
                <div className="aside-up">
                    {
                        firstRouters.map(item=>(
                            <div key={item.key}
                                 className={`aside-item ${path.indexOf(item.key)===0 ? "aside-select":""}`}
                                 onClick={()=>history.push(item.to)}
                            >
                                <div className="aside-item-icon">{item.icon}</div>
                                <div className="aside-item-title">{item.title}</div>
                            </div>
                        ))
                    }
                </div>
                <div className="aside-bottom">
                    {
                        isExpand ?
                            <div
                                className={`aside-item`}
                                onClick={()=>setNotificationVisibility(!notificationVisibility)}
                            >
                                <div className="aside-item-icon"><BellOutlined/></div>
                                <div className="aside-item-title">消息</div>
                            </div>
                            :
                            <div className="aside-bottom-text text-icon" data-title-right={'消息'}
                                 onClick={()=>setNotificationVisibility(!notificationVisibility)}
                            >
                                <BellOutlined/>
                            </div>

                    }
                    <PortalMessage
                        translateX={isExpand?200:75}
                        history={history}
                        unread={unread}
                        setUnread={setUnread}
                        visible={notificationVisibility}
                        setVisible={setNotificationVisibility}
                    />
                    <HelpLink
                        bgroup={'matflow'}
                        iconComponent={
                            isExpand ?
                                <div className='aside-item'>
                                    <div className="aside-item-icon"><QuestionCircleOutlined/></div>
                                    <div className="aside-item-title">帮助与支持</div>
                                </div>
                                :
                                <div className="aside-bottom-text" data-title-right={'帮助与支持'}>
                                    <QuestionCircleOutlined/>
                                </div>
                        }
                    />
                    <AppLink
                        translateX={isExpand?200:75}
                        iconComponent={
                            isExpand?
                                <div className='aside-item'>
                                    <div className="aside-item-icon">
                                        <img src={themeType==='default'?menuBlack:menuWhite} alt="link" width="16" height="16">
                                        </img>
                                    </div>
                                    <div className="aside-item-title">应用</div>
                                </div>
                                :
                                <div className="aside-bottom-text" data-title-right={'应用'}>
                                    <img src={themeType==='default'?menuBlack:menuWhite} alt="link" width="16" height="16">
                                    </img>
                                </div>
                        }
                    />
                    <AvatarLink
                        {...props}
                        changeTheme={changeTheme}
                        iconComponent={
                            isExpand ?
                                <div className='aside-item aside-item-user'>
                                    <div className="aside-item-icon"><Profile /></div>
                                    <div className="aside-item-title">{getUser().nickname || getUser().name}</div>
                                </div>
                                :
                                <div className="aside-bottom-text" data-title-right={'个人中心'}>
                                    <Profile />
                                </div>
                        }
                    />
                </div>
                <div className="aside-hover-expand"/>
                <div className="aside-expand" onClick={()=>setIsExpand(!isExpand)}>
                    {isExpand ? <LeftCircleOutlined />:<RightCircleOutlined />}
                </div>
            </div>
        )
    }

    return (
        <main className="mf-layout">
            {asideHtml()}
            <div className='mf-layout-content'>
                {renderRoutes(route.routes)}
            </div>
        </main>
    )
}

export default inject("systemRoleStore")(observer(Portal))



