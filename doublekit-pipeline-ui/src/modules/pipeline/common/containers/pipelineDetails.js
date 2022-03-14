import React,{useEffect} from "react";
import { Layout } from 'antd';
import PipelineDetailsBreadcrumb from "../components/pipelineDetailsBreadcrumb";
import PipelineDetailsAside from "../components/pipelineDetailsAside";
import {renderRoutes} from "react-router-config";

const { Content, Sider } = Layout;

const PipelineDetails= props=>{

    const {route}=props

    useEffect(()=>{
        return ()=>{
            localStorage.removeItem('pipelineName')
            localStorage.removeItem('pipelineId')
        }
    },[])

    return(
        <Layout>
            <Sider>
                <PipelineDetailsAside/>
            </Sider>
            <Content className={'pipelineDetails'}>
                <PipelineDetailsBreadcrumb   {...props}/>
                {renderRoutes(route.routes)}
            </Content>
        </Layout>
    )
}

export default PipelineDetails