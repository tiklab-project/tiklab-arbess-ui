import React from "react";
import {Redirect} from "react-router-dom";
import AsyncComponent from "./common/lazy/SyncComponent";

const Login=AsyncComponent(()=>import('./modules/login/login'))
const Index=AsyncComponent(()=>import('./modules/home/portal'))

/* 首页 */
const HomePage=AsyncComponent(()=>import('./modules/homePage/container/homePage'))

/*  流水线 */
const Pipeline=AsyncComponent(()=>import('./modules/pipeline/pipeline/container/pipeline'))
const PipelineAdd=AsyncComponent(()=>import('./modules/pipeline/pipelineAdd/pipelineAdd'))
const PipelineConfig=AsyncComponent(()=>import('./modules/config/config/config'))
const PipelineDetails=AsyncComponent(()=>import('./modules/pipeline/pipelineDetails/container/pipelineDetails'))
const SearchResult=AsyncComponent(()=>import('./modules/pipeline/pipelineSearch/searchResult'))

/* 流水线 -- 收藏 */
const PipelineCollect=AsyncComponent(()=>import('./modules/pipeline/pipelineCollect/container/pipelineCollect'))

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
const System=AsyncComponent(()=>import('./modules/system/system'))

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
const PlugDeploy=AsyncComponent(()=>import('./modules/plug/components/plugDeploy'))
const PlugUpdate=AsyncComponent(()=>import('./modules/plug/components/plugUpdate'))
const PlugAll=AsyncComponent(()=>import('./modules/plug/components/plugAll'))

/*  系统设置列表 -- 安全设置  */
const SecurePowerRole=AsyncComponent(()=>import('./modules/secure/components/securePowerRole'))
const SecurePowerDomain=AsyncComponent(()=>import('./modules/secure/components/securePowerDomain'))
const SecureProof=AsyncComponent(()=>import('./modules/secure/components/secureProof'))

/*  系统设置列表 -- 其他  */
const SystemMoreInfo=AsyncComponent(()=>import('./modules/systemMore/components/systemMoreInfo'))
const SystemMoreLog=AsyncComponent(()=>import('./modules/systemMore/components/systemMoreLog'))

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
                path:'/index/collect',
                component: PipelineCollect,
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
                                path: '/index/system/user',
                                exact:true,
                                render:()=>  <Redirect to={"/index/system/user/base"}/>,
                            },
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
                        component: Plug,
                        routes:[
                            {
                                path: '/index/system/plugin',
                                exact:true,
                                render:()=> <Redirect to={"/index/system/plugin/depot"}/>,
                            },
                            {
                                path:'/index/system/plugin/depot',
                                component: PlugAll
                            },
                            {
                                path:'/index/system/plugin/update',
                                component: PlugUpdate
                            },
                            {
                                path:'/index/system/plugin/deploy',
                                component: PlugDeploy
                            }
                        ]
                    },
                    {
                        path:"/index/system/secure",
                        component: Secure,
                        routes:[
                            {
                                path: '/index/system/secure',
                                exact:true,
                                render:()=>  <Redirect to={"/index/system/secure/powerDomain"}/>,
                            },
                            {
                                path:'/index/system/secure/powerDomain',
                                component: SecurePowerDomain,
                            },
                            {
                                path:'/index/system/secure/powerRole',
                                component: SecurePowerRole,
                            },
                            {
                                path:'/index/system/secure/proof',
                                component: SecureProof,
                            }
                        ]
                    },
                    {
                        path:"/index/system/other",
                        component: SystemMore,
                        routes:[
                            {
                                path: '/index/system/other',
                                exact:true,
                                render:()=>  <Redirect to={"/index/system/other/info"}/>,
                            },
                            {
                                path:'/index/system/other/info',
                                component: SystemMoreInfo,
                            },
                            {
                                path:'/index/system/other/log',
                                component: SystemMoreLog,
                            }
                        ]
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
                                render:()=>  <Redirect to={"/index/task/assembly/role"}/>,
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