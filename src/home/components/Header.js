import React,{useState,useEffect} from "react";
import {Dropdown,Badge} from "antd";
import {useTranslation} from "react-i18next";
import {getUser} from "tiklab-core-ui";
import {AppLink} from "tiklab-integration-ui";
import {USER_STORE} from "tiklab-user-ui/es/store";
import {
    GlobalOutlined,
    BellOutlined,
    SettingOutlined,
    LogoutOutlined,
    QuestionCircleOutlined,
    ProfileOutlined,
    ExpandOutlined,
    ScheduleOutlined,
    WhatsAppOutlined
} from "@ant-design/icons";
import {inject,observer} from "mobx-react";
import logo from "../../assets/images/img/matflow3.png";
import HeaderMessage from "./HeaderMessage";
import {Profile,UserName} from "../../common";

/**
 * header 头部
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const  Head = props =>{

    const {homePageStore,pipelineStore,userStore} = props

    const {findMessageItemPage,unread} = homePageStore
    const {findWeChatContactConfig,findWeChatApplyContactConfig} = userStore

    let path = props.location.pathname
    const {i18n,t} = useTranslation()
    const [currentLink,setCurrentLink] = useState(path)
    const [visible,setVisible] = useState(false)

    useEffect(()=>{
        // 获取未读消息通知
        findMessageItemPage(0)
    },[])

    useEffect(()=>{
        if(path.indexOf("/index/pipeline")===0){
            path = "/index/pipeline"
        }
        setCurrentLink(path)
    },[path])

    useEffect(()=>{
        if(getUser().tenant){
            const wechatConfigUrl = location.href.split('#')[0]
            // 获取企业微信config配置
            findWeChatContactConfig(wechatConfigUrl,getUser().tenant)
            // 获取企业微信agentConfig配置
            findWeChatApplyContactConfig(wechatConfigUrl,getUser().tenant)
        }
    },[])

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

    /**
     * 切换语言
     * @param type
     */
    const changeLan = type =>{
        i18n.changeLanguage(type)
    }

    /**
     * 退出登录
     */
    const goOut = () => {
        props.history.push({
            pathname: "/logout",
            state:{
                preRoute: props.location.pathname
            }
        })
    }

    // 渲染一级标题
    const renderRouter = routers => {
        return routers && routers.map(routers=>{
            return  <div key={routers.key}
                         onClick={()=>changeCurrentLink(routers)}
                         className={currentLink===routers.to ? "headers-active" : null}
                    >
                        {t(routers.title)}
                    </div>
        })
    }

    // 切换语言目录
    const languageMenu = (
        <div className="outMenu-lan-menu">
            <div className="lan-menu" >中文</div>
            {/*<div className="lan-menu">英文</div>*/}
        </div>
    )

    // 退出登录页面
    const outMenu = (
        <div className="header-outMenu">
            <div className="header-outMenu-top">
                <div className="outMenu-out">
                    <Profile user={getUser()} />
                    <div className="outMenu-out-info">
                        <div className="outMenu-out-name">
                            <UserName name={getUser().nickName} id={getUser().userId}/>
                        </div>
                        <div className="outMenu-out-eamil">{getUser().eamil || "--"}</div>
                    </div>
                </div>
            </div>
            <div className="header-outMenu-lan">
                <Dropdown overlay={languageMenu}>
                    <div className="outMenu-lan">
                        <GlobalOutlined className="header-dropdown-icon"/>
                        <span className="lan">切换语言</span>
                    </div>
                </Dropdown>
            </div>
            <div className="header-outMenu-out">
                <div onClick={()=>goOut()} className="outMenu-out">
                    <LogoutOutlined className="header-dropdown-icon"/>
                    <span className="bottom-out">退出</span>
                </div>
            </div>
        </div>
    )

    // 帮助目录
    const helpMenu = (
        <div className="header-helpMenu">
            <div className="header-helpMenu-item">
                <ProfileOutlined className="header-dropdown-icon"/>
                文档
            </div>
            <div className="header-helpMenu-item">
                <ExpandOutlined className="header-dropdown-icon"/>
                社区支持
            </div>
            <div className="header-helpMenu-item">
                <ScheduleOutlined className="header-dropdown-icon"/>
                在线工单
            </div>
            <div className="header-helpMenu-item">
                <WhatsAppOutlined className="header-dropdown-icon"/>
                在线客服
            </div>
        </div>
    )

    // 去系统设置
    const goSystem = () =>{
        props.history.push("/index/system")
    }

    return(
        <div className="frame-header">
            <div className="frame-header-right">
                <AppLink  isSSO={false}/>
                <div className="frame-header-logo">
                    <img src={logo} alt="logo" />
                </div>
                <div className="headers-link">
                    {renderRouter(routers)}
                </div>
            </div>
            <div className="frame-header-right">
                <div className="frame-header-right-text">
                    <div className="frame-header-set" onClick={()=>goSystem()}>
                        <SettingOutlined className="frame-header-icon"/>
                    </div>
                    <div className="frame-header-message" onClick={()=>setVisible(true)}>
                        <Badge count={unread} size="small">
                            <BellOutlined className="frame-header-icon"/>
                        </Badge>
                    </div>
                    <div className="frame-header-help">
                        <Dropdown overlay={helpMenu}>
                            <QuestionCircleOutlined className="frame-header-icon"/>
                        </Dropdown>
                    </div>
                    <Dropdown overlay={outMenu}>
                        <div className="frame-header-user">
                            <Profile user={getUser()} />
                        </div>
                    </Dropdown>
                </div>
            </div>

            <HeaderMessage
                {...props}
                visible={visible}
                setVisible={setVisible}
                homePageStore={homePageStore}
                pipelineStore={pipelineStore}
            />

        </div>
    )
}

export default inject("homePageStore","pipelineStore",USER_STORE)(observer(Head))
