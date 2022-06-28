import React from "react";
import {renderRoutes} from "react-router-config";
import "./system.scss";
import SystemAside from "./systemAside";
import {withRouter} from "react-router-dom";
import { Layout  } from "antd";

const { Sider,Content } = Layout;

const System = props =>{
    const {route}=props
    return(
        <Layout className="orga">
            <Sider style={{position:"fixed",width:200,height:"100%",zIndex:99}}>
                <SystemAside {...props} />
            </Sider>
            <Content className="orga-background">
                {renderRoutes(route.routes)}
            </Content>
        </Layout>
    )
}

export default withRouter(System)