import React,{useState,useEffect} from "react";
import {Avatar,Dropdown,Menu,Badge} from "antd";
import {privilegeStores} from "tiklab-privilege-ui/es/store";
import {useTranslation} from "react-i18next";
import {getUser,getVersionInfo} from "tiklab-core-ui";
import {Profile,WorkAppConfig} from "tiklab-eam-ui";
import {GlobalOutlined,BellOutlined,SettingOutlined,LogoutOutlined,
    UserOutlined,
} from "@ant-design/icons";
import {withRouter} from "react-router";
import {inject,observer} from "mobx-react";
import logo from "../../assets/images/all/matflow.png"
import portrait from "../../assets/images/portrait.jpg";
import vipOne from "../../assets/images/vip-one.png";
import vipTwo from "../../assets/images/vip-two.png";
import MessageDrawer from "./messageDrawer";

const Head = props =>{

    const {homePageStore} = props

    const {findMessageDispatchItemPage,messageDispatchItemPage,page,setPagination,pagination} = homePageStore

    let path = props.location.pathname

    const [currentLink,setCurrentLink] = useState(path)
    const [visible,setVisible] = useState(false)
    const [isLoading,setIsLoading] = useState(false)

    const userId = getUser().userId
    const {i18n,t} = useTranslation()
    const isEE = getVersionInfo().release
    const eeText = isEE === 2 ? vipTwo : vipOne
    const authUrl = JSON.parse(localStorage.getItem("authConfig")).authUrl
    const authType = JSON.parse(localStorage.getItem("authConfig")).authType

    useEffect(()=>{
        const param = {
            receiver:userId,
        }
        findMessageDispatchItemPage(param).then(res=>{
            res.code===0 && pagination>1 && setIsLoading(false)
        })
    },[pagination])

    const moreMessage = () =>{
        setPagination(pagination+1)
        setIsLoading(true)
    }


    useEffect(()=>{
        setCurrentLink(path)
    },[path])

    useEffect(()=>{
        // 路由菜单控制
        privilegeStores.systemRoleStore.getSystemPermissions(userId,"matflow")
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
            {/*<Menu.Item key="1" onClick={()=>changeLan("en")}>英文</Menu.Item>*/}
        </Menu>
    )

    const goOut = () => {
        props.history.push({
            pathname: "/logout",
            state:{
                preRoute: props.location.pathname
            }
        })
    }

    // 退出登录页面
    const outMenu = (
        <div className="header-outMenu">
           <div className="header-outMenu-content">
               <div className="header-outMenu-top">
                   <Avatar src={portrait} style={{cursor:"pointer"}}/>
                   <span className="top-user">{getUser().name}</span>
               </div>
               <div
                   onClick={()=>goOut()}
                   className="header-outMenu-out"
               >
                   <LogoutOutlined />
                   <span className="bottom-out">
                       退出
                   </span>
               </div>
           </div>
        </div>
    )


    const setMenu = () => {
        let url
        if(authType){
            url="/index/orga"
        }else {
            url= authUrl+"#/orga/dashbord"
        }
        return(
            <Menu>
                    <Menu.Item>
                        {
                            authType?
                                <span onClick={()=>props.history.push(url)}>
                                    <UserOutlined />
                                    账号与成员
                                </span>
                                :
                                <a style={{"color":"black"}} href={url}>
                                    <UserOutlined />
                                    账号与成员
                                </a>
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
        setVisible(true)
    }

    const goSystem = () =>{
        props.history.push("/index/system")
    }

    return(
        <div className="frame-header">
            <div className="frame-header-right">
                <WorkAppConfig  isSSO={false}/>
                <div className="frame-header-logo">
                    <img src={logo} alt="logo" />
                </div>
                <div className="headers-link">
                    {renderRouter(routers)}
                </div>
            </div>
            <div className="frame-header-right">
                <div className="frame-header-right-text">
                    <div className="frame-header-language">
                        <Dropdown overlay={languageMenu}>
                            <GlobalOutlined className="frame-header-icon"/>
                        </Dropdown>
                    </div>
                    <div className="frame-header-message">
                        <Badge count={page && page.total}>
                            <BellOutlined
                                className="frame-header-icon"
                                onClick={()=>goUserMessageContent()}
                            />
                        </Badge>

                    </div>
                    <div className="frame-header-set">
                        <SettingOutlined
                            className="frame-header-icon"
                            onClick={()=>goSystem()}
                        />
                    </div>
                    <Dropdown overlay={outMenu}>
                        <div className="frame-header-user">
                            <Profile userInfo={getUser()}/>
                        </div>
                    </Dropdown>
                    <div className="frame-header-status">
                        <img src={eeText} alt="" width = "20px" height= "20px" />
                    </div>
                </div>
            </div>
            <MessageDrawer
                visible={visible}
                setVisible={setVisible}
                page={page}
                moreMessage={moreMessage}
                isLoading={isLoading}
                messageList={messageDispatchItemPage}
            />
        </div>
    )
}

export default withRouter(inject("homePageStore")(observer(Head)))
