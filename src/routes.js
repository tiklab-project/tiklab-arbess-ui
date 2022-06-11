import React from "react";
import {Redirect} from "react-router-dom";
import AsyncComponent from "./common/lazy/SyncComponent";

const Login=AsyncComponent(()=>import('./modules/login/login'))
const Home=AsyncComponent(()=>import('./modules/home/home'))

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
        path:'/home',
        component: Home,
        routes:[
            {
                path: '/home',
                exact:true,
                render:()=>  <Redirect to={"/home/pipeline"}/>,
            },
            {
                path:'/home/pipeline',
                component:Pipeline,
                exact: true,
            },
            {
                path:'/home/new',
                component: PipelineAdd,
            },
            {
                path:'/home/config',
                component:PipelineConfig,
            },
            {
                path:'/home/searchresult/:searchresult',
                component:SearchResult,
            },
            {
                path:'/home/task',
                component: PipelineDetails,
                routes:[
                    {
                        path: '/home/task',
                        exact:true,
                        render:()=>  <Redirect to={"/home/task/work"}/>,
                    },
                    {
                        path:'/home/task/work',
                        component: WorkSpace
                    },
                    {
                        path:"/home/task/structure",
                        component: Structure
                    },
                    {
                        path:'/home/task/assembly',
                        component: PipelineSys
                    },
                    {
                        path:'/home/task/config',
                        component: ConfigDetails
                    },
                ]
            },
            {
                path:'/home/system',
                component:System,
                exact: true,
            },
        ]
    },
    {
        path:'/',
        component: Home,
        exact: true,
        render:()=>  <Redirect to={"/home/pipeline"}/>,
    },
]

export default routers