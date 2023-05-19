import React,{useState,useEffect} from "react";
import {Dropdown,Badge,Tooltip} from "antd";
import {useTranslation} from "react-i18next";
import {getUser} from "tiklab-core-ui";
import {AppLink} from "tiklab-integration-ui";
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
import Profile from "../../common/profile/Profile";

/**
 * header 头部
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const  Head = props =>{

    const {homePageStore,pipelineStore} = props

    const {findMessageItemPage,unread} = homePageStore

    let path = props.location.pathname
    const {i18n,t} = useTranslation()
    const [currentLink,setCurrentLink] = useState(path)
    const [visible,setVisible] = useState(false)

    useEffect(()=>{
        // 获取未读消息通知
        findMessageItemPage(0)
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

    /**
     * 帮助文档
     */
    const goHelp = path => {
        window.open(`http://tiklab.net/${path}`)
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
                            <span>{getUser().nickname || getUser().name || "用户"}</span>
                        </div>
                        <div className="outMenu-out-eamil">{getUser().phone || getUser().eamil || "--"}</div>
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
            <div className="header-helpMenu-item" onClick={()=>goHelp("document/documentList")}>
                <ProfileOutlined className="header-dropdown-icon"/>
                文档
            </div>
            <div className="header-helpMenu-item" onClick={()=>goHelp("question/questionList")}>
                <ExpandOutlined className="header-dropdown-icon"/>
                社区支持
            </div>
            <div className="header-helpMenu-item" onClick={()=>goHelp("account/workOrder/workOrderList")}>
                <ScheduleOutlined className="header-dropdown-icon"/>
                在线工单
            </div>
            <div className="header-helpMenu-item" onClick={()=>goHelp("account/group/onlineservice")}>
                <WhatsAppOutlined className="header-dropdown-icon"/>
                在线客服
            </div>
        </div>
    )

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
                    <Tooltip title={"设置"}>
                        <div className="frame-header-set" onClick={()=>props.history.push("/index/system")}>
                            <SettingOutlined className="frame-header-icon"/>
                        </div>
                    </Tooltip>
                    <Tooltip title={"消息"}>
                        <div className="frame-header-message" onClick={()=>setVisible(true)}>
                            <Badge count={unread} size="small">
                                <BellOutlined className="frame-header-icon"/>
                            </Badge>
                        </div>
                    </Tooltip>
                    <Tooltip title={"帮助与文档"}>
                        <Dropdown overlay={helpMenu} trigger={["click"]}>
                            <div className="frame-header-help">
                                <QuestionCircleOutlined className="frame-header-icon"/>
                            </div>
                        </Dropdown>
                    </Tooltip>
                    <Tooltip title={"个人中心"}>
                        <Dropdown overlay={outMenu} trigger={["click"]}>
                            <div className="frame-header-user">
                                <Profile />
                            </div>
                        </Dropdown>
                    </Tooltip>
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

export default inject("homePageStore","pipelineStore")(observer(Head))
