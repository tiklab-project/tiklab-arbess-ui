import React, {useState,useEffect} from "react";
import {Row,Col,Avatar,Dropdown,Menu,Input,Space} from "antd";
import {withRouter} from "react-router-dom";
import logo from "../../assets/images/logo.png";
import portrait from "../../assets/images/portrait.jpg";
import {getUser} from "doublekit-core-ui";
import { GlobalOutlined,DownOutlined } from "@ant-design/icons";

const  {Search} = Input

const Head =props=>{

    const {routers} = props;

    let path = props.location.pathname
    const [currentLink, setCurrentLink] = useState(path)

    useEffect(()=>{
        if(path === "/index/dynamic"){
            path="/index/home"
        }
        if (path.indexOf("/index/task") === 0) {
            path="/index/pipeline"
        }
        if(path.indexOf("/index/system") === 0){
            path="/index/system"
        }
        if(path === "/index/collect" || path === "/index/new" ||
        path.indexOf("/index/config") ===0 || path.indexOf("/index/searchresult")===0 ) {
            path= "/index/pipeline"
        }
        setCurrentLink(path)
    },[path])


    const changeCurrentLink = item => {
        props.history.push(item.to)
    }

    const renderRouter = () => {
        if (routers) {
            return routers && routers.map(routers=>{
                return (
                    <div key={routers.key}
                         onClick={ () => changeCurrentLink(routers)}
                         className={currentLink === routers.to ? "headers-active" : null}
                    >
                        {routers.title}
                    </div>
                )
            })
        }
    }

    const logout = () => {
        props.history.push("/login")
    }

    const languageMenu = (
        <Menu
            items={[
                {key: "0", label: <div>中文</div>,},
                {key: "1", label: <div>英文</div>,}
            ]}
        />
    )

    const outMenu = (
        <Menu
            items={[
                {key:"0",label:<div onClick={logout}>退出</div>}
            ]}
        />
    )

    return(
        <Row className="frame-header">
            <Col span={12}>
                <div className="frame-header-right">
                    <div className="frame-header-logo">
                        <img src={logo} alt="logo" />
                    </div>
                    <div className="headers-link">{ renderRouter() }</div>
                </div>
            </Col>
            <Col span={12}>
                <div className="frame-header-right">
                    <div className="frame-header-right-search-wrap">
                        {/*<Search />*/}
                    </div>
                    <div className="frame-header-right-text">
                        <div className="frame-header-language">
                            <Dropdown overlay={languageMenu} placement="bottom">
                                <Space>
                                   <GlobalOutlined style={{fontSize:20,cursor:"pointer"}}/>
                                </Space>
                            </Dropdown>
                        </div>
                        <div className="frame-header-user">
                            <span className="user-name">
                                <Dropdown overlay={outMenu} placement="bottom">
                                    <Space>
                                        {getUser().name}<DownOutlined />
                                    </Space>
                                </Dropdown>
                            </span>
                            <span className="user-avatar">
                                 <Avatar src={portrait} />
                            </span>
                        </div>
                    </div>
                </div>
            </Col>
        </Row>
    )
}

export default withRouter(Head)