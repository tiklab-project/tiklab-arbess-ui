/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2020-12-18 16:05:16
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-09-16 11:28:29
 */
import React,{Fragment} from 'react';
import logo from "../../assets/images/logo.png";
import { renderRoutes } from "react-router-config";
import {Portal} from 'doublekit-frame-ui';
import Search from '../search/container/search';
import "./home.scss";
class Index extends React.Component {
    constructor(props){
        super(props);     
        this.state = {
            headerRouter:[
                {
                    to:'/index/home',
                    title: '首页',
                    key: 'home'
                },
                {
                    to:'/index/wiki',
                    title:'知识库',
                    key: 'wiki'
                },
                {
                    to:'/index/template',
                    title:'模板',
                    key: 'template'
                },
                {
                    to:'/index/sysmgr',
                    title:'系统',
                    key: 'sysmgr'
                }
            ]
        }
    }

    render() {
        const route = this.props.route;
        return (
            <Fragment>
                <div>
                    <Portal 
                        routers={this.state.headerRouter}
                        {...this.props}
                        fetchMethod={fetchMethod}
                        headerStyle={{background: "#FFF",borderBottom: "#F0F2F5 solid 1px", marginBottom: "3px",zIndex: 2}}
                        languageUrl={pluginAddressUrl}
                        redirect={'/login'}
                        logo={logo}
                        userMessageLink={"/index/userMessage"}
                        searchComponent = {<Search {...this.props}/>}
                    >
                        
                        {renderRoutes(route.routes)}
                    </Portal>
                </div>
            </Fragment>
        );
    }
}

export default Index;