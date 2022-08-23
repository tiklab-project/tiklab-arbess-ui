import React,{useState,useEffect} from "react";
import {Avatar,Dropdown,Menu} from "antd";
import {useTranslation} from "react-i18next";
import {getUser,getVersionInfo} from "tiklab-core-ui";
import {GlobalOutlined,MessageOutlined} from "@ant-design/icons";
import {withRouter} from "react-router-dom";
import logo from "../../../assets/images/logo.png";
import portrait from "../../../assets/images/portrait.jpg";
import vipOne from "../../../assets/images/vip-one.png";
import vipTwo from "../../../assets/images/vip-two.png";

const Head = props =>{

    const {AppConfigComponent} = props

    let path = props.location.pathname
    const [currentLink,setCurrentLink] = useState(path)
    const {i18n} = useTranslation()
    const isEE = getVersionInfo().release
    const eeText = isEE === 2 ? vipTwo : vipOne
    const isLocal = JSON.parse(localStorage.getItem("authConfig")).authType
    const isUrl = JSON.parse(localStorage.getItem("authConfig")).authUrl
    const local = isLocal === "local"

    useEffect(()=>{
        if(path.indexOf("/index/system")===0){
            path="/index/system"
        }
        if(path.indexOf("/index/task")===0) {
            path= "/index/matFlow"
        }
        setCurrentLink(path)
    },[path])

    const routers=[
        {
            key:"homePage",
            to:"/index/home",
            title: "首页",
        },
        {
            key:"matFlow",
            to:"/index/matFlow",
            title: "流水线",
        },
        {
            key:"system",
            to:"/index/system",
            title:"系统设置",
        }
    ]

    const changeCurrentLink = item => {
        props.history.push(item.to)
    }

    const renderRouter = routers => {
        return routers && routers.map(routers=>{
            return (
                <div key={routers.key}
                     onClick={()=>changeCurrentLink(routers)}
                     className={currentLink===routers.to ? "headers-active" : null}
                >
                    {routers.title}
                </div>
            )
        })
    }

    const languageMenu = (
        <Menu>
            <Menu.Item key="0">中文</Menu.Item>
            {/*<Menu.Item key="1">英文</Menu.Item>*/}
        </Menu>
    )
    
    const goOut = () => {
        props.history.push("/logout")
        // if(local){
        //     location.href = location.origin + "/eas#/logout"
        // }
        // else location.href = isUrl + `/#/logout?redirect=${location.href}`
    }

    const outMenu = (
        <Menu>
            <Menu.Item key="0">
                {getUser().name}
            </Menu.Item>
            <Menu.Item key="1" onClick={()=>goOut()}>
                退出
                <svg className="icon" aria-hidden="true" style={{width:20,height:20}}>
                    <use xlinkHref="#icon-tuichu1"/>
                </svg>
            </Menu.Item>
        </Menu>
    )

    const goUserMessageContent = () =>{
        props.history.push("/index/userMessageContent")
    }

    return(
        <div className="frame-header">
            <div className="frame-header-right">
                {AppConfigComponent}
                <div className="frame-header-logo">
                    <img src={logo} alt="logo" />
                </div>
                <div className="headers-link">{ renderRouter(routers) }</div>
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
                    <div className="frame-header-user">
                        <Dropdown overlay={outMenu} >
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