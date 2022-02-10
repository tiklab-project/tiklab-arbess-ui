import AsyncComponent from "./common/lazy/SyncComponent";

const Login=AsyncComponent(()=>import('./modules/login/login'))
const Home=AsyncComponent(()=>import('./modules/home/home'))
const System=AsyncComponent(()=>import('./modules/system'))

const Pipeline=AsyncComponent(()=>import('./modules/pipeline/pipeline'))
const New=AsyncComponent(()=>import('./modules/new/new'))
const NewDeployment=AsyncComponent(()=>import('./modules/deployment/deployment'))
const Task=AsyncComponent(()=>import('./modules/task/task'))

// 工作空间
const WorkTask=AsyncComponent(()=>import('./modules/task/pages/workSpace'))
//开始构建
const StructureTask=AsyncComponent(()=>import('./modules/task/pages/startBuild'))
//配置
const ConfigTask=AsyncComponent(()=>import('./modules/task/pages/config'))
//构建历史
const HistoryTask=AsyncComponent(()=>import('./modules/task/pages/buildHistory'))
//流水线设置
const AssemblyTask=AsyncComponent(()=>import('./modules/task/pages/assemblySetup'))

//配置的过往记录
const PastRecordsTask=AsyncComponent(()=>import('./modules/task/pages/config_pastRecords'))
//构建历史的构建
const BuildTask=AsyncComponent(()=>import('./modules/task/pages/buildHistory_build'))

export const routers=[
    {
        path:'/login',
        component:Login,
    },
    {
        path:'/home',
        component: Home,
        routes:[
            {
                path:'/home/pipeline',
                component:Pipeline,
            },
            {
                path:'/home/new',
                component: New
            },
            {
                path:'/home/deployment',
                component:NewDeployment,
            },
            {
                path:'/home/task',
                component: Task,
                routes:[
                    {
                        path:'/home/pipeline',
                        component:Pipeline
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
                        component: ConfigTask,
                    },
                    {
                        path:'/home/task/build',
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
                component:System
            }
        ]
    },
    {
        path:'/',
        component: Home
    }
]