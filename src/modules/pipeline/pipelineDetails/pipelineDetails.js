import React,{useEffect} from "react";
import { Layout } from 'antd';
import {renderRoutes} from "react-router-config";
import './pipelineDetails.scss'
import PipelineDetailsBreadcrumb from "./pipelineDetailsBreadcrumb";
import PipelineDetailsAside from "./pipelineDetailsAside";

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
            <Sider style={{backgroundColor:'#fff'}}>
                <PipelineDetailsAside/>
            </Sider>
            <Content className='pipelineDetails'>
                <PipelineDetailsBreadcrumb   {...props}/>
                {renderRoutes(route.routes)}
            </Content>
        </Layout>
    )
}

export default PipelineDetails