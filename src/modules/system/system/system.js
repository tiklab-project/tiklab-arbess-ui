import React from "react";
import {renderRoutes} from "react-router-config";
import './system.scss';
import SystemAside from "./systemAside";
import {withRouter} from "react-router-dom";

const System = props =>{

    const {route}=props
    const router = [
        {
            key:1,
            label:'用户管理',
            icon:'#icon-gongzuotongji',
            enCode:'1',
            children:[
                {
                    key:'/index/system/user/base',
                    label:'基本信息',
                    icon:'#icon-gongzuotongji',
                    enCode:'11',
                },
                {
                    key:'/index/system/user/list',
                    label:'用户列表',
                    icon:'#icon-gongzuotongji',
                    enCode:'12',
                }
            ]
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
            key:3,
            label:'权限管理',
            icon:'#icon-gongzuotongji',
            enCode:'3',
            children:[
                {
                    key:'/index/system/power/role',
                    label:'角色管理',
                    icon:'#icon-gongzuotongji',
                    enCode:'31',
                },
                {
                    key:'/index/system/power/domain',
                    label:'功能管理',
                    icon:'#icon-gongzuotongji',
                    enCode:'32',
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
    )
}

export default withRouter(System)