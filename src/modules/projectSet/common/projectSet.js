import React  from "react";
import "./projectSet.scss";
import ProjectSetLeftNav from "../../project/common/components/projectSetLeftNav";
import {renderRoutes} from "react-router-config";
import {withRouter} from "react-router-dom";
import {Layout} from "antd";

const { Sider,Content } = Layout

const ProjectSet= props=>{
    const {route}=props
    return (
        <Layout className="projectSet">
            <Sider width={180}>
                <ProjectSetLeftNav {...props} />
            </Sider>
            <Content className="projectSet-background">
                {renderRoutes(route.routes)}
            </Content>
        </Layout>
    )
}

export default withRouter(ProjectSet)