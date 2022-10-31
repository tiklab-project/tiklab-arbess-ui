import React,{useState,useEffect} from "react";
import {Dropdown,Menu,Badge} from "antd";
import {privilegeStores} from "tiklab-privilege-ui/es/store";
import {useTranslation} from "react-i18next";
import {getUser} from "tiklab-core-ui";
import {Profile,WorkAppConfig} from "tiklab-eam-ui";
import {GlobalOutlined,BellOutlined,SettingOutlined,LogoutOutlined,
    QuestionCircleOutlined,ProfileOutlined,ExpandOutlined,ScheduleOutlined,
    WhatsAppOutlined
} from "@ant-design/icons";
import {withRouter} from "react-router";
import {inject,observer} from "mobx-react";
import logo from "../../assets/images/all/matflow.png"
import MessageDrawer from "./messageDrawer";

const Head = props =>{

    const {homePageStore} = props

    const {findMessageDispatchItemPage,page} = homePageStore

    let path = props.location.pathname

    const [currentLink,setCurrentLink] = useState(path)
    const [visible,setVisible] = useState(false)

    const userId = getUser().userId
    const {i18n,t} = useTranslation()

    useEffect(()=>{
        findMessageDispatchItemPage()
    },[])

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
                  <div className="outMenu-out">
                      <Profile userInfo={getUser()}/>
                      <div className="outMenu-out-info">
                          <div className="outMenu-out-name">{getUser().name}</div>
                          <div className="outMenu-out-eamil">{getUser().userId}@</div>
                      </div>
                  </div>
               </div>
               <div className="header-outMenu-lan">
                   <div className="outMenu-lan">
                       <GlobalOutlined/>
                       <span className="lan-zh lan" onClick={()=>changeLan("zh")}>
                           中文
                       </span>
                       {/*<span className="lan-en lan">*/}
                       {/*    英文*/}
                       {/*</span>*/}
                   </div>
               </div>
               <div className="header-outMenu-out">
                   <div  onClick={()=>goOut()} className="outMenu-out">
                       <LogoutOutlined />
                       <span className="bottom-out">
                            退出
                       </span>
                   </div>
               </div>
           </div>
        </div>
    )

    const helpMenu = (
        <Menu style={{minWidth:150}}>
            <Menu.Item key="1"><ProfileOutlined />文档</Menu.Item>
            <Menu.Item key="2"><ExpandOutlined />社区支持</Menu.Item>
            <Menu.Item key="3"><ScheduleOutlined />在线工单</Menu.Item>
            <Menu.Item key="4"><WhatsAppOutlined />在线客服</Menu.Item>
        </Menu>
    )

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
                    <div className="frame-header-set">
                        <SettingOutlined className="frame-header-icon"
                            onClick={()=>props.history.push("/index/system")}
                        />
                    </div>
                    <div className="frame-header-message">
                        <Badge count={page && page.total} size="small">
                            <BellOutlined
                                className="frame-header-icon"
                                onClick={()=>setVisible(true)}
                            />
                        </Badge>
                    </div>
                    <div className="frame-header-help">
                        <Dropdown overlay={helpMenu}>
                            <QuestionCircleOutlined className="frame-header-icon"/>
                        </Dropdown>
                    </div>
                    <Dropdown overlay={outMenu}>
                        <div className="frame-header-user">
                            <Profile userInfo={getUser()}/>
                        </div>
                    </Dropdown>
                </div>
            </div>

            <MessageDrawer
                visible={visible}
                setVisible={setVisible}
            />

        </div>
    )
}

export default withRouter(inject("homePageStore")(observer(Head)))
