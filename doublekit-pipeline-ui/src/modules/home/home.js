import React from 'react'
import { Layout } from 'antd';
import {renderRoutes} from "react-router-config";
import Heads from "./components/header";

const { Header, Content } = Layout;

const Home=props=>{
    const headerRoutes=[
        {
            to:'/home/pipeline',
            title: "流水线",
            key:'pipeline'
        },
        {
            to:'/home/system',
            title:'系统设置',
            key:'system'
        }
    ]

    const {route}=props

    return(
        <Layout>
            <Header >
                <Heads
                    {...props}
                    routers={headerRoutes}
                />
            </Header>
            <Content  className={'home'}>
                {renderRoutes(route.routes)}
            </Content>
        </Layout>
    )
}
export default Home