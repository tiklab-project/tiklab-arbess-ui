import React,{useState,useEffect} from "react";
import {Row,Col,Avatar,Dropdown,Space,Menu} from "antd";
import { useTranslation } from "react-i18next";
import {getUser,getVersionInfo} from "tiklab-core-ui";
import {GlobalOutlined} from "@ant-design/icons";
import {withRouter} from "react-router-dom";
import logo from "../../../assets/images/logo.png";
import portrait from "../../../assets/images/portrait.jpg";
import vipOne from "../../../assets/images/vip-one.png";
import vipTwo from "../../../assets/images/vip-two.png";

const Head = props =>{

    const {AppConfigComponent} = props

    let path = props.location.pathname
    const {i18n} = useTranslation()
    const [currentLink,setCurrentLink] = useState(path)
    const isEE = getVersionInfo().release
    const eeText = isEE === 2 ? vipTwo : vipOne;

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
                     className={currentLink === routers.to ? "headers-active" : null}
                >
                    {routers.title}
                </div>
            )
        })
    }

    const languageMenu = (
        <Menu>
            <Menu.Item key="0">中文</Menu.Item>
            <Menu.Item key="1">英文</Menu.Item>
        </Menu>
    )

    const outMenu = (
        <Menu>
            <Menu.Item key="0" onClick={()=>props.history.push("/index/system/base")}>
                {getUser().name}
            </Menu.Item>
            <Menu.Item key="1" onClick={()=>props.history.push("/logout")}>
                退出
                <svg className="icon" aria-hidden="true" style={{width:20,height:20}}>
                    <use xlinkHref="#icon-tuichu1"/>
                </svg>
            </Menu.Item>
        </Menu>
    )

    return(
        <Row className="frame-header">
            <Col span={12}>
                <div className="frame-header-right">
                    {AppConfigComponent}
                    <div className="frame-header-logo">
                        <img src={logo} alt="logo" />
                    </div>
                    <div className="headers-link">{ renderRouter(routers) }</div>
                </div>
            </Col>
            <Col span={12}>
                <div className="frame-header-right">
                    <div className="frame-header-right-text">
                        <div className="frame-header-language">
                            <Dropdown overlay={languageMenu}>
                                <Space>
                                    <GlobalOutlined style={{fontSize:23,cursor:"pointer"}}/>
                                </Space>
                            </Dropdown>
                        </div>
                        <div className="frame-header-user">
                            <Dropdown overlay={outMenu}>
                                <Space>
                                    <Avatar src={portrait} style={{cursor:"pointer"}}/>
                                </Space>
                            </Dropdown>
                        </div>
                        <div className="frame-header-status">
                            <img src={eeText} alt="" width = "20px" height= "20px" />
                        </div>
                    </div>
                </div>
            </Col>
        </Row>
    )
}

export default withRouter(Head)