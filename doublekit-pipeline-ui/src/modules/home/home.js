import React from 'react'
import { Layout } from 'antd';
import {renderRoutes} from "react-router-config";
import Heads from "./components/header";

const { Header, Content } = Layout;

const Home=(props)=>{
    const route=props.route
    return(
        <Layout>
            <Header >
                <Heads/>
            </Header>
            <Content className='ant-layout-content' >
                {renderRoutes(route.routes)}
            </Content>
        </Layout>
    )
}
export default Home