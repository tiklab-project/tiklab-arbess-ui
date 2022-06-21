import React  from 'react'
import './projectSet.scss';
import ProjectSetLeftNav from "./projectSetLeftNav";
import {renderRoutes} from "react-router-config";
import {withRouter} from "react-router-dom";
import {Layout} from "antd";

const { Sider,Content } = Layout

const ProjectSet= props=>{
    const {route}=props
    return (
        <Layout className="orga">
            <Sider width={180} className="site-layout-background">
                <ProjectSetLeftNav {...props} />
            </Sider>
            <Content className="orga-background">
                {renderRoutes(route.routes)}
            </Content>
        </Layout>
    )
}

export default withRouter(ProjectSet)