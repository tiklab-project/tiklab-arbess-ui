import React from "react";
import {Redirect} from "react-router-dom";
import AsyncComponent from "./common/lazy/SyncComponent";

const Login=AsyncComponent(()=>import('./modules/login/login'))
const Home=AsyncComponent(()=>import('./modules/home/home'))
const Index=AsyncComponent(()=>import('./modules/home'))
const System=AsyncComponent(()=>import('./modules/system'))

const Pipeline=AsyncComponent(()=>import('./modules/pipeline/pipeline/container/pipeline'))
const PipelineAdd=AsyncComponent(()=>import('./modules/pipeline/common/pipelineAdd'))
const PipelineConfig=AsyncComponent(()=>import('./modules/config/config/config'))
const PipelineDetails=AsyncComponent(()=>import('./modules/pipeline/pipelineDetails/pipelineDetails'))
const SearchResult=AsyncComponent(()=>import('./modules/pipeline/common/searchResult'))


const WorkSpace=AsyncComponent(()=>import('./modules/workSpace/container/workSpace'))
const Structure=AsyncComponent(()=>import('./modules/structure/structure/containers/structure'))
const StructureHistory=AsyncComponent(()=>import('./modules/structure/structureHistory/structureHistory'))
const PipelineDelRename=AsyncComponent(()=>import('./modules/pipeline/common/pipelineDel-Rename'))
const ConfigPastRecords=AsyncComponent(()=>import('./modules/config/configDetails_pastRecords/container/config_pastRecords'))
const StructureHistoryDetails=AsyncComponent(()=>import('./modules/structure/structureHistoryDetails/container/structureHistoryDetails'))
const ConfigDetails = AsyncComponent(()=>import('./modules/config/configDetails/configDetails'))

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
                        path:'/home/task/build/:historyName',
                        component:StructureHistoryDetails
                    },
                    {
                        path:'/home/task/history',
                        component: StructureHistory,
                    },
                    {
                        path:'/home/task/assembly',
                        component: PipelineDelRename
                    },
                    {
                        path:'/home/task/post',
                        component:ConfigPastRecords
                    },
                    {
                        path:'/home/task/config',
                        component: ConfigDetails
                    }
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