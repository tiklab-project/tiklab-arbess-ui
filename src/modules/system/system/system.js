import React,{Fragment} from "react";
import {renderRoutes} from "react-router-config";
import './system.scss';
import SystemAside from "./systemAside";
import {withRouter} from "react-router-dom";
import OrgaAside from "../../view/orgaAside";
import { Layout  } from 'antd';
import '../../view/orga.scss'

const { Sider,Content } = Layout;

const System = props =>{

    const {route}=props
    const router = [
        {
            key:'/index/system/base',
            label:'用户管理',
            icon:'#icon-gongzuotongji',
            enCode:'11',
        },
        {
            key:'/index/system/list',
            label:'用户列表',
            icon:'#icon-gongzuotongji',
            enCode:'12',
        },
        {
            key:'/index/system/directory',
            label:'用户目录',
            icon:'#icon-gongzuotongji',
            enCode:'12',
        },
        {
            key:'/index/system/organ',
            label:'组织管理',
            icon:'#icon-gongzuotongji',
            enCode:'12',
        },
        {
            key:1,
            label:'权限管理',
            icon:'#icon-gongzuotongji',
            enCode:'3',
            children:[
                {
                    key:'/index/system/power/feature',
                    label:'功能管理',
                    icon:'#icon-gongzuotongji',
                    enCode:'32',
                },
                {
                    key:'/index/system/power/role',
                    label:'角色管理',
                    icon:'#icon-gongzuotongji',
                    enCode:'31',
                }
            ]
        },
        {
            key:'/index/system/proof',
            label:'凭证设置',
            icon:'#icon-gongzuotongji',
            enCode:'4',
        },
        {
            key:2,
            label:'插件管理',
            icon:'#icon-gongzuotongji',
            enCode:'2',
            children:[
                {
                    key:'/index/system/plugin/all',
                    label:'全部',
                    icon:'#icon-gongzuotongji',
                    enCode:'21',
                },
                {
                    key:'/index/system/plugin/update',
                    label:'更新',
                    icon:'#icon-gongzuotongji',
                    enCode:'22',
                }
            ]
        },
        {
            key:'/index/system/info',
            label:'系统信息',
            icon:'#icon-gongzuotongji',
            enCode:'4',
        },
        {
            key:'/index/system/log',
            label:'系统日志',
            icon:'#icon-gongzuotongji',
            enCode:'4',
        },
    ]

    return(
        <div className='system'>
            <div  className='system-aside'>
                <SystemAside {...props} router={router}/>
            </div>
            <div className='system-content'>
                {renderRoutes(route.routes)}
            </div>
        </div>
        // <Fragment>
        //     <Layout className="orga">
        //         <Sider width={200} className="site-layout-background">
        //             <OrgaAside></OrgaAside>
        //         </Sider>
        //
        //         <Content className="orga-background">
        //             {renderRoutes(route.routes)}
        //         </Content>
        //     </Layout>
        // </Fragment>
    )
}

export default withRouter(System)