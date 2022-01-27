/*
    整体布局
 */


import React,{Component} from 'react'
import { Layout } from 'antd';
import {homeRoutes} from "./routes/homeRoutes";
import {Switch,Route} from 'react-router-dom'
import Head from "./components/header";
const { Header, Content } = Layout;

class Home extends Component{
    render() {
        return(
            <Layout className='admin-layout'>
                <Header className='ant-layout-header'>
                    <Head/>
                </Header>
                <Content className='ant-layout-content' >
                    <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
                        <Content style={{ padding: '0 24px', minHeight: 280 }}>
                            <Switch >
                                {
                                    homeRoutes.map(item=>{
                                    return (
                                        <Route key={item.path} path={item.path}
                                               render={routeProps=>{
                                                   return <item.component {...routeProps}/>
                                               }}/>
                                    )})
                                }
                            </Switch>
                        </Content>
                    </Layout>
                </Content>
            </Layout>
        )
    }
}
export default Home