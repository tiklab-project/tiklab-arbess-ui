import React from "react";
import { Layout } from 'antd';
import PipelineDetailsHeader from "../components/pipelineDetailsHeader";
import PipelineDetailsAside from "../components/pipelineDetailsAside";
import {renderRoutes} from "react-router-config";

const { Content, Sider } = Layout;

const PipelineDetails= props=>{
    const {route}=props
    return(
        <Layout >
            <PipelineDetailsHeader {...props}/>
            <Layout>
                <Sider style={{backgroundColor:"#fff",marginTop:30}}>
                    <PipelineDetailsAside/>
                </Sider>
                <Content  style={{marginTop:30,marginLeft:30}}>
                    {renderRoutes(route.routes)}
                </Content>
            </Layout>
        </Layout>
    )
}

export default PipelineDetails