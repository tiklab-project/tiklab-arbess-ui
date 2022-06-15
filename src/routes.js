import React from "react";
import {Redirect} from "react-router-dom";
import AsyncComponent from "./common/lazy/SyncComponent";

const Login=AsyncComponent(()=>import('./modules/login/login'))
const Index=AsyncComponent(()=>import('./modules/home/portal'))

/* 首页 */
const HomePage=AsyncComponent(()=>import('./modules/homePage/container/homePage'))

/*  流水线 */
const Pipeline=AsyncComponent(()=>import('./modules/pipeline/pipeline/container/pipeline'))
const PipelineAdd=AsyncComponent(()=>import('./modules/pipeline/common/pipelineAdd'))
const PipelineConfig=AsyncComponent(()=>import('./modules/config/config/config'))
const PipelineDetails=AsyncComponent(()=>import('./modules/pipelineDetails/container/pipelineDetails'))
const SearchResult=AsyncComponent(()=>import('./modules/pipeline/common/searchResult'))

/*  流水线详情 */
const WorkSpace=AsyncComponent(()=>import('./modules/workSpace/container/workSpace'))
const Structure=AsyncComponent(()=>import('./modules/structure/container/structure'))
const ConfigDetails = AsyncComponent(()=>import('./modules/config/configDetails/configDetails'))
const PipelineSys=AsyncComponent(()=>import('./modules/pipelineSys/container/pipelineSys'))
/*  流水线详情 -- 设置 */
const PipelineSysReDel=AsyncComponent(()=>import('./modules/pipelineSys/components/pipelineSysReDel'))
const PipelineSysProof=AsyncComponent(()=>import('./modules/pipelineSys/components/pipelineSysProof'))
const PipelineSysMembro=AsyncComponent(()=>import('./modules/pipelineSys/components/pipelineSysMembro'))
const PipelineSysRole=AsyncComponent(()=>import('./modules/pipelineSys/components/pipelineSysRole'))
const PipelineSysDomain=AsyncComponent(()=>import('./modules/pipelineSys/components/pipelineSysDomain'))

/* 系统设置 */
const System=AsyncComponent(()=>import('./modules/system/container/system'))

/*  系统设置列表  */
const UserCenter=AsyncComponent(()=>import('./modules/userCenter/container/userCenter'))
const Plug=AsyncComponent(()=>import('./modules/plug/container/plug'))
const Secure=AsyncComponent(()=>import('./modules/secure/container/secure'))
const SystemMore=AsyncComponent(()=>import('./modules/systemMore/container/systemMore'))

/*  系统设置列表 -- 用户中心  */
const UserCenterBase=AsyncComponent(()=>import('./modules/userCenter/components/userCenterBase'))
const UserCenterList=AsyncComponent(()=>import('./modules/userCenter/components/userCenterList'))
const UserCenterView=AsyncComponent(()=>import('./modules/userCenter/components/userCenterView'))

/*  系统设置列表 -- 插件库  */
/*  系统设置列表 -- 安全设置  */
/*  系统设置列表 -- 其他  */

const routers=[
    {
        path:'/login',
        component:Login,
    },
    {
        path:'/index',
        component: Index,
        routes:[
            {
                path: '/index',
                exact:true,
                render:()=>  <Redirect to={"/index/home"}/>,
            },
            {
                path: '/index/home',
                component: HomePage,
                exact:true,
            },
            {
                path:'/index/pipeline',
                component:Pipeline,
                exact: true,
            },
            {
                path:'/index/new',
                component: PipelineAdd,
            },
            {
                path:'/index/config',
                component:PipelineConfig,
            },
            {
                path:'/index/searchresult/:searchresult',
                component:SearchResult,
            },
            {
                path:'/index/system',
                component:System,
                routes:[
                    {
                        path: '/index/system',
                        exact:true,
                        render:()=>  <Redirect to={"/index/system/user/base"}/>,
                    },
                    {
                        path:'/index/system/user',
                        component: UserCenter,
                        routes:[
                            {
                                path:'/index/system/user/base',
                                component: UserCenterBase
                            },
                            {
                                path:'/index/system/user/list',
                                component: UserCenterList
                            },
                            {
                                path:'/index/system/user/view',
                                component: UserCenterView
                            }
                        ]
                    },
                    {
                        path:"/index/system/plugin",
                        component: Plug
                    },
                    {
                        path:"/index/system/secure",
                        component: Secure
                    },
                    {
                        path:"/index/system/other",
                        component: SystemMore
                    }
                ]
            },
            {
                path:'/index/task',
                component: PipelineDetails,
                routes:[
                    {
                        path: '/index/task',
                        exact:true,
                        render:()=>  <Redirect to={"/index/task/work"}/>,
                    },
                    {
                        path:'/index/task/work',
                        component: WorkSpace
                    },
                    {
                        path:"/index/task/structure",
                        component: Structure
                    },
                    {
                        path:'/index/task/assembly',
                        component: PipelineSys,
                        routes:[
                            {
                                path: '/index/task/assembly',
                                exact:true,
                                render:()=>  <Redirect to={"/index/task/assembly/domain"}/>,
                            },
                            {
                                path:'/index/task/assembly/proof',
                                component:PipelineSysProof
                            },
                            {
                                path:'/index/task/assembly/role',
                                component: PipelineSysRole
                            },
                            {
                                path:'/index/task/assembly/domain',
                                component: PipelineSysDomain
                            },
                            {
                                path:'/index/task/assembly/other',
                                component: PipelineSysReDel
                            },
                            {
                                path:'/index/task/assembly/membro',
                                component: PipelineSysMembro
                            }
                        ]
                    },
                    {
                        path:'/index/task/config',
                        component: ConfigDetails
                    },
                ]
            },
        ]
    },
    {
        path:'/',
        component: Index,
        exact: true,
        render:()=>  <Redirect to='/index/home'/>,
    },
]

export default routers