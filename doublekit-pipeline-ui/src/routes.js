import React from "react";
import {Redirect} from "react-router-dom";
import AsyncComponent from "./common/lazy/SyncComponent";

const Login=AsyncComponent(()=>import('./modules/login/login'))
const Home=AsyncComponent(()=>import('./modules/home/home'))
const System=AsyncComponent(()=>import('./modules/system'))

const Pipeline=AsyncComponent(()=>import('./modules/pipeline/pipeline/containers/pipeline'))
const New=AsyncComponent(()=>import('./modules/pipeline/pipeline/components/pipelineAdd'))
const Config=AsyncComponent(()=>import('./modules/config/containers/config'))
const Task=AsyncComponent(()=>import('./modules/pipeline/common/containers/pipelineDetails'))
const SearchResult=AsyncComponent(()=>import('./modules/pipeline/pipeline/components/searchResult'))

//任务
// 工作空间
const WorkTask=AsyncComponent(()=>import('./modules/pipeline/common/components/workSpace'))
//开始构建
const StructureTask=AsyncComponent(()=>import('./modules/pipeline/common/components/structure'))
//配置
const ConfigDetailsTask=AsyncComponent(()=>import('./modules/pipeline/common/components/configDetails'))
//构建历史
const HistoryTask=AsyncComponent(()=>import('./modules/pipeline/common/components/structureHistory'))
//流水线设置
const AssemblyTask=AsyncComponent(()=>import('./modules/pipeline/common/components/assemblySetup'))

//配置的过往记录
const PastRecordsTask=AsyncComponent(()=>import('./modules/pipeline/common/components/config_pastRecords'))
//构建历史的构建
const BuildTask=AsyncComponent(()=>import('./modules/pipeline/common/components/structureHistoryDetails'))

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
                path:'/home/pipeline',
                component:Pipeline,
                exact: true,
            },
            {
                path:'/home/new',
                component: New,
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
                component: Task,
                routes:[
                    {
                        path: '/home/task',
                        exact:true,
                        render:()=>  <Redirect to={"/home/task/work"}/>,
                    },
                    {
                        path:'/home/task/work',
                        component: WorkTask
                    },
                    {
                        path:"/home/task/structure",
                        component: StructureTask
                    },
                    {
                        path:'/home/task/config',
                        component: ConfigDetailsTask,
                    },
                    {
                        path:'/home/task/build/:historyName',
                        component:BuildTask
                    },
                    {
                        path:'/home/task/history',
                        component: HistoryTask,
                    },
                    {
                        path:'/home/task/assembly',
                        component: AssemblyTask
                    },
                    {
                        path:'/home/task/post',
                        component:PastRecordsTask
                    },
                ]
            },
            {
                path:'/home/system',
                component:System,
                exact: true,
            }
        ]
    },
    {
        path:'/',
        component: Home,
        exact: true,
    }
]