import React from "react";
import { Layout } from 'antd';
import TaskHeader from "./components/taskHeader";
import LeftNav from "./components/taskLeftNav";
import {renderRoutes} from "react-router-config";

const { Content, Sider } = Layout;

const Task=(props)=>{
    const route=props.route
    return(
        <Layout >
            <TaskHeader />
            <Layout>
                <Sider style={{backgroundColor:"#fff",marginTop:30}}> <LeftNav/></Sider>
                <Content className='ant-layout-task-content' style={{marginTop:30,marginLeft:30}}>
                    {renderRoutes(route.routes)}
                </Content>
            </Layout>
        </Layout>
    )
}

export default Task