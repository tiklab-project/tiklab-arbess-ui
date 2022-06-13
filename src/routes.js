import React from "react";
import {Redirect} from "react-router-dom";
import AsyncComponent from "./common/lazy/SyncComponent";

const Login=AsyncComponent(()=>import('./modules/login/login'))
const Index=AsyncComponent(()=>import('./modules/home/portal'))

/*
    首页
 */
const HomePage=AsyncComponent(()=>import('./modules/homePage/container/homePage'))

const System=AsyncComponent(()=>import('./modules/system/container/system'))

const Pipeline=AsyncComponent(()=>import('./modules/pipeline/pipeline/container/pipeline'))
const PipelineAdd=AsyncComponent(()=>import('./modules/pipeline/common/pipelineAdd'))
const PipelineConfig=AsyncComponent(()=>import('./modules/config/config/config'))
const PipelineDetails=AsyncComponent(()=>import('./modules/pipelineDetails/container/pipelineDetails'))
const SearchResult=AsyncComponent(()=>import('./modules/pipeline/common/searchResult'))
/*
    流水线详情
 */
const WorkSpace=AsyncComponent(()=>import('./modules/workSpace/container/workSpace'))
const Structure=AsyncComponent(()=>import('./modules/structure/container/structure'))
const ConfigDetails = AsyncComponent(()=>import('./modules/config/configDetails/configDetails'))
const PipelineSys=AsyncComponent(()=>import('./modules/pipelineSys/container/pipelineSys'))

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
                        component: PipelineSys
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
                exact: true,
            },
        ]
    },
    {
        path:'/',
        component: Index,
        exact: true,
        render:()=>  <Redirect to={"/index/home"}/>,
    },
]

export default routers