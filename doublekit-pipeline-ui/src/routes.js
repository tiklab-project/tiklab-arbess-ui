import React from "react";
import {Redirect} from "react-router-dom";
import AsyncComponent from "./common/lazy/SyncComponent";

const Login=AsyncComponent(()=>import('./modules/login/login'))
const Home=AsyncComponent(()=>import('./modules/home/home'))
const System=AsyncComponent(()=>import('./modules/system'))

const Pipeline=AsyncComponent(()=>import('./modules/pipeline/pipeline/containers/pipeline'))
const PipelineAdd=AsyncComponent(()=>import('./modules/pipeline/pipeline/components/pipelineAdd'))
const Config=AsyncComponent(()=>import('./modules/config/containers/config'))
const PipelineDetails=AsyncComponent(()=>import('./modules/pipeline/common/containers/pipelineDetails'))
const SearchResult=AsyncComponent(()=>import('./modules/pipeline/pipeline/components/searchResult'))


const WorkSpace=AsyncComponent(()=>import('./modules/pipeline/common/components/workSpace'))
const Structure=AsyncComponent(()=>import('./modules/pipeline/common/components/structure'))
const ConfigDetails=AsyncComponent(()=>import('./modules/pipeline/common/components/configDetails'))
const StructureHistory=AsyncComponent(()=>import('./modules/pipeline/common/components/structureHistory'))
const AssemblySetup=AsyncComponent(()=>import('./modules/pipeline/common/components/assemblySetup'))
const ConfigPastRecords=AsyncComponent(()=>import('./modules/pipeline/common/components/config_pastRecords'))
const StructureHistoryDetails=AsyncComponent(()=>import('./modules/pipeline/common/components/structureHistoryDetails'))

export const routers=[
    {
        path:'/login',
        component:Login,
        exact: true,
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
                component:Config,
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
                        path:'/home/task/config',
                        component: ConfigDetails,
                    },
                    {
                        path:'/home/task/build/:historyName',
                        component:StructureHistoryDetails
                    },
                    {
                        path:'/home/task/history',
                        component: StructureHistory,
                    },
                    {
                        path:'/home/task/assembly',
                        component: AssemblySetup
                    },
                    {
                        path:'/home/task/post',
                        component:ConfigPastRecords
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
    },

]