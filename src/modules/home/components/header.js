import React,{useState,useEffect} from "react";
import {Avatar,Dropdown,Menu} from "antd";
import {privilegeStores} from "tiklab-privilege-ui/es/store";
import {useTranslation} from "react-i18next";
import {getUser,getVersionInfo} from "tiklab-core-ui";
import {GlobalOutlined,MessageOutlined,SettingOutlined,LogoutOutlined,UserOutlined} from "@ant-design/icons";
import {withRouter} from "react-router";
import logo from "../../../assets/images/all/pipeline.png"
import portrait from "../../../assets/images/portrait.jpg";
import vipOne from "../../../assets/images/vip-one.png";
import vipTwo from "../../../assets/images/vip-two.png";

const Head = props =>{

    const {AppConfigComponent} = props

    let path = props.location.pathname
    const [currentLink,setCurrentLink] = useState(path)
    const userId = getUser().userId

    const {i18n,t} = useTranslation()
    const isEE = getVersionInfo().release
    const eeText = isEE === 2 ? vipTwo : vipOne
    const authUrl = JSON.parse(localStorage.getItem("authConfig")).authUrl
    const authType = JSON.parse(localStorage.getItem("authConfig")).authType

    useEffect(()=>{
        setCurrentLink(path)
    },[path])

    useEffect(()=>{
        // 路由菜单控制
        privilegeStores.systemRoleStore.getSystemPermissions(userId)
    },[])

    const routers=[
        {
            key:"homePage",
            to:"/index/home",
            title: "home",
        },
        {
            key:"pipeline",
            to:"/index/pipeline",
            title: "pipeline",
        },
        {
            key:"zz",
            to:'/index/widget',
            title: "widget"
        }
    ]

    const changeCurrentLink = item => {
        props.history.push(item.to)
    }

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

    const changeLan = type =>{
        i18n.changeLanguage(type)
    }
    
    const languageMenu = (
        <Menu>
            <Menu.Item key="0" onClick={()=>changeLan("zh")}>中文</Menu.Item>
            <Menu.Item key="1" onClick={()=>changeLan("en")}>英文</Menu.Item>
        </Menu>
    )

    const goOut = () => {
        props.history.push({
            pathname: "/logout",
        })
    }
    
    const outMenu = (
        <Menu>
            <Menu.Item key="1" onClick={()=>goOut()}>
                <LogoutOutlined />
                退出
            </Menu.Item>
        </Menu>
    )

    
    const setMenu = () => {
        let url
        if(authType){
            url= authUrl+"#/orga/dashbord"
        }else {
            url="/index/orga"
        }
        return(
            <Menu>
                    <Menu.Item>
                        {
                            authType?
                                <a style={{"color":"black"}} href={url}>
                                    <UserOutlined />
                                    账号与成员
                                </a>
                                :
                                <span onClick={()=>props.history.push(url)}>
                                    <UserOutlined />
                                    账号与成员
                                </span>
                        }

                    </Menu.Item>
                    <Menu.Item onClick={()=>props.history.push("/index/system")}>
                        <SettingOutlined/>
                        系统设置
                    </Menu.Item>
                </Menu>
        )
    }

    const goUserMessageContent = () =>{
        props.history.push("/index/userMessage")
    }

    return(
        <div className="frame-header">
            <div className="frame-header-right">
                {AppConfigComponent}
                <div className="frame-header-logo">
                    <img src={logo} alt="logo" />
                </div>
                <div className="headers-link">
                    {renderRouter(routers)}
                </div>
            </div>
            <div className="frame-header-right">
                <div className="frame-header-right-text">
                    <div className="frame-header-message">
                        <MessageOutlined
                            onClick={()=>goUserMessageContent()}
                            className="frame-header-icon"
                        />
                    </div>
                    <div className="frame-header-language">
                        <Dropdown overlay={languageMenu}>
                            <GlobalOutlined className="frame-header-icon"/>
                        </Dropdown>
                    </div>
                    <div className="frame-header-set">
                        <Dropdown overlay={setMenu}>
                            <SettingOutlined className="frame-header-icon"/>
                        </Dropdown>
                    </div>
                    <div className="frame-header-user">
                        <Dropdown overlay={outMenu}>
                            <Avatar src={portrait} style={{cursor:"pointer"}}/>
                        </Dropdown>
                    </div>
                    <div className="frame-header-status">
                        <img src={eeText} alt="" width = "20px" height= "20px" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Head)
