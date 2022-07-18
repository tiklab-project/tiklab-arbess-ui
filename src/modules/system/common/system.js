import React from "react";
import "./system.scss";
import SystemAside from "./systemAside";
import {Layout} from "antd";
import {withRouter} from "react-router-dom";
import {renderRoutes} from "react-router-config";

const { Sider,Content } = Layout;

const System = props =>{
    const {route}=props
    return(
        <Layout className="system">
            <Sider style={{position:"fixed",height:"100%",zIndex:99}} width={180}>
                <SystemAside {...props} />
            </Sider>
            <Content className="system-background">
                {renderRoutes(route.routes)}
            </Content>
        </Layout>
    )
}

export default withRouter(System)