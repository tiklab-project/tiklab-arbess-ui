/**
 * @Description: 组件
 * @Author: gaomengyuan
 * @Date:
 * @LastEditors: gaomengyuan
 * @LastEditTime: 2025/3/12
 */
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
import {getUser, productTitle,productImg,productWhiteImg} from "tiklab-core-ui";
import {renderRoutes} from "react-router-config";
import Profile from "../component/profile/Profile";
import menuBlack from '../../assets/images/menu-black.png';
import menuWhite from '../../assets/images/menu-white.png';
import './Portal.scss';

const firstRouters=[
    {
        key:"/index",
        to:"/index",
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
    }
]

const Portal = props =>{

    const {route,history,systemRoleStore,HelpLink,AppLink,AvatarLink,customLogo=null} = props;

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
     * default(默认 --> --tiklab-gray-600)，
     * blue(蓝色 --> #2f5eb1)，
     * black(黑色 --> #131d30)
     */
    const changeTheme = type => {
        setThemeType(type)
        localStorage.setItem('theme',type)
    }

    //设置图标
    const logoHtml = () => {
        const isDefaultTheme = themeType === 'default';
        const image = isDefaultTheme ? productImg.arbess : productWhiteImg.arbess;
        return {
            image: customLogo?.image ? customLogo.image : image,
            name: customLogo?.name ? customLogo.name :  productTitle.arbess
        };
    };

    //侧边导航
    const asideHtml = () => {
        if(path.startsWith('/setting')){
            return props.children
        }
        if(path !=='/pipeline/' && path.startsWith('/pipeline/')){
            return (
                <PipelineAside
                    {...props}
                    isExpand={isExpand}
                    setIsExpand={setIsExpand}
                    themeType={themeType}
                />
            )
        }
        const logoData = logoHtml();
        return (
            <div className={`arbess-aside ${isExpand ? 'arbess-aside-expand': 'arbess-aside-normal'} arbess-aside-${themeType}`}>
                <div className='aside-logo' onClick={()=>history.push('/index')}>
                    {
                        isExpand ?
                            <>
                                <img src={logoData.image} height={24} width={24} alt={''}/>
                                <div className='aside-logo-text'> {logoData.name} </div>
                            </>
                            :
                            <img src={logoData.image} height={32} width={32} alt={''}/>
                    }
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
                           <>
                               <div
                                   className={`aside-item`}
                                   onClick={()=>history.push(`/setting/home`)}
                               >
                                   <div className="aside-item-icon"><SettingOutlined/></div>
                                   <div className="aside-item-title">设置</div>
                               </div>
                               <div
                                   className={`aside-item`}
                                   onClick={()=>setNotificationVisibility(!notificationVisibility)}
                               >
                                   <div className="aside-item-icon"><BellOutlined/></div>
                                   <div className="aside-item-title">消息</div>
                               </div>
                           </>
                            :
                            <>
                                <div className="aside-bottom-text text-icon" data-title-right={'设置'}
                                     onClick={()=>history.push(`/setting/home`)}
                                >
                                    <SettingOutlined className='aside-bottom-text-icon'/>
                                </div>
                                <div className="aside-bottom-text text-icon" data-title-right={'消息'}
                                     onClick={()=>setNotificationVisibility(!notificationVisibility)}
                                >
                                    <BellOutlined className='aside-bottom-text-icon'/>
                                </div>
                            </>

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
                        bgroup={'arbess'}
                        iconComponent={
                            isExpand ?
                                <div className='aside-item'>
                                    <div className="aside-item-icon"><QuestionCircleOutlined/></div>
                                    <div className="aside-item-title">帮助与支持</div>
                                </div>
                                :
                                <div className="aside-bottom-text" data-title-right={'帮助与支持'}>
                                    <QuestionCircleOutlined className='aside-bottom-text-icon'/>
                                </div>
                        }
                    />
                    <AppLink
                        translateX={isExpand?200:75}
                        iconComponent={
                            isExpand?
                                <div className='aside-item'>
                                    <div className="aside-item-icon">
                                        <img src={themeType==='default'?menuBlack:menuWhite} alt="link" width="18" height="18">
                                        </img>
                                    </div>
                                    <div className="aside-item-title">应用</div>
                                </div>
                                :
                                <div className="aside-bottom-text" data-title-right={'应用'}>
                                    <img src={themeType==='default'?menuBlack:menuWhite} alt="link" width="18" height="18"
                                         className='aside-bottom-text-icon'
                                    >
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
        <main className="arbess-layout">
            {asideHtml()}
            <div className='arbess-layout-content'>
                {renderRoutes(route.routes)}
            </div>
        </main>
    )
}

export default inject("systemRoleStore")(observer(Portal))



