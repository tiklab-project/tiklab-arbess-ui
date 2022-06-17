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
const PipelineSys=AsyncComponent(()=>import('./modules/pipeline/pipelineSys/container/pipelineSys'))

/*  流水线详情 -- 设置 */
const PipelineSysReDel=AsyncComponent(()=>import('./modules/pipeline/pipelineSys/components/pipelineSysReDel'))
const PipelineSysProof=AsyncComponent(()=>import('./modules/pipeline/pipelineSys/components/pipelineSysProof'))
const PipelineSysMembro=AsyncComponent(()=>import('./modules/pipeline/pipelineSys/components/pipelineSysMembro'))
const PipelineSysRole=AsyncComponent(()=>import('./modules/pipeline/pipelineSys/components/pipelineSysRole'))
const PipelineSysDomain=AsyncComponent(()=>import('./modules/pipeline/pipelineSys/components/pipelineSysDomain'))

/* 系统设置 */
const System=AsyncComponent(()=>import('./modules/system/system/system'))

/* 系统设置 -- 列表 */
const UserBase=AsyncComponent(()=>import('./modules/system/user/userBase'))
const UserList=AsyncComponent(()=>import('./modules/system/user/userList'))
const PlugAll=AsyncComponent(()=>import('./modules/system/plug/plugAll'))
const PlugUpdate=AsyncComponent(()=>import('./modules/system/plug/plugUpdate'))
const OverallProof=AsyncComponent(()=>import('./modules/system/proof/overallProof'))
const Info=AsyncComponent(()=>import('./modules/info/info'))
const Log=AsyncComponent(()=>import('./modules/log/log'))
const Domain=AsyncComponent(()=>import('./modules/system/power/domain'))
const Role=AsyncComponent(()=>import('./modules/system/power/role'))

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
                path:'/index/config/:pipelineName',
                component:PipelineConfig,
            },
            {
                path:'/index/searchresult/:searchresult',
                component:SearchResult,
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
                        path: '/index/system/user/base',
                        component: UserBase,
                    },
                    {
                        path: '/index/system/user/list',
                        component: UserList,
                    },
                    {
                        path: '/index/system/plugin/all',
                        component: PlugAll,
                    },
                    {
                        path: '/index/system/plugin/update',
                        component: PlugUpdate,
                    },
                    {
                        path: '/index/system/power/role',
                        component: Role,
                    },
                    {
                        path: '/index/system/power/domain',
                        component: Domain,
                    },
                    {
                        path: '/index/system/proof',
                        component: OverallProof,
                    },
                    {
                        path:'/index/system/log',
                        component: Log,
                    },
                    {
                        path:'/index/system/info',
                        component: Info,
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