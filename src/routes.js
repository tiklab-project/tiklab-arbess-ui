import React from "react";
import {Redirect} from "react-router-dom";
import AsyncComponent from "./common/lazy/SyncComponent";

const Login=AsyncComponent(()=>import("./modules/login/login"))
const Index=AsyncComponent(()=>import("./modules/home/portal"))

/* 首页 */
const HomePage=AsyncComponent(()=>import("./modules/homePage/container/homePage"))

/* 动态详情 */
const DynamicDetails=AsyncComponent(()=>import("./modules/homePage/components/dynamicDetails"))

/*  流水线 */
const Pipeline=AsyncComponent(()=>import("./modules/pipeline/pipeline/container/pipeline"))
const PipelineAdd=AsyncComponent(()=>import("./modules/pipeline/pipelineAdd/pipelineAdd"))
const PipelineConfig=AsyncComponent(()=>import("./modules/config/config/config"))
const SearchResult=AsyncComponent(()=>import("./modules/pipeline/pipelineSearch/searchResult"))

/* 流水线 -- 收藏 */
const PipelineCollect=AsyncComponent(()=>import("./modules/pipeline/pipelineCollect/container/pipelineCollect"))

const Project=AsyncComponent(()=>import("./modules/project/project/container/project"))

/*  流水线详情 */
const WorkSpace=AsyncComponent(()=>import("./modules/project/workSpace/container/workSpace"))
const Structure=AsyncComponent(()=>import("./modules/project/structure/container/structure"))
const ConfigDetails = AsyncComponent(()=>import("./modules/config/configDetails/configDetails"))
const ProjectSet=AsyncComponent(()=>import("./modules/projectSet/projectSet/projectSet"))

/*  流水线详情 -- 设置 */
const ProjectSetReDel=AsyncComponent(()=>import("./modules/projectSet/reDel/projectSetReDel"))
const ProjectSetProof=AsyncComponent(()=>import("./modules/projectSet/proof/projectSetProof"))
const ProjectSetUser=AsyncComponent(()=>import("./modules/projectSet/projectSetUser/projectSetUser"))
const ProjectSetRole=AsyncComponent(()=>import("./modules/projectSet/privilege/projectSetRole"))
const ProjectSetFeature=AsyncComponent(()=>import("./modules/projectSet/privilege/projectSetFeature"))

/* 系统设置 */
const System=AsyncComponent(()=>import("./modules/system/system/system"))

/* 系统设置 -- 列表 */
const UserBase=AsyncComponent(()=>import("./modules/system/user/base"))
const UserList=AsyncComponent(()=>import("./modules/system/user/list"))
const UserDirectory=AsyncComponent(()=>import("./modules/system/user/directory"))
const Org=AsyncComponent(()=>import("./modules/system/user/org"))
const Plug=AsyncComponent(()=>import("./modules/system/plug/plug"))
const OverallProof=AsyncComponent(()=>import("./modules/system/proof/overallProof"))
const Info=AsyncComponent(()=>import("./modules/system/systemMassage/info/info"))
const Log=AsyncComponent(()=>import("./modules/system/systemMassage/log/log"))
const SystemFeature=AsyncComponent(()=>import("./modules/system/privilege/systemFeature"))
const SystemRole=AsyncComponent(()=>import("./modules/system/privilege/systemRole"))


const routers=[
    {
        path:"/login",
        component:Login,
    },
    {
        path:"/index",
        component: Index,
        routes:[
            {
                path: "/index",
                exact:true,
                render:()=>  <Redirect to={"/index/home"}/>,
            },
            {
                path: "/index/home",
                component: HomePage,
                exact:true,
            },
            {
                path: "/index/dynamic",
                component: DynamicDetails,
                exact:true,
            },
            {
                path:"/index/pipeline",
                component:Pipeline,
                exact: true,
            },
            {
                path:"/index/new",
                component: PipelineAdd,
                exact:true,
            },
            {
                path:"/index/collect",
                component: PipelineCollect,
                exact:true,
            },
            {
                path:"/index/config/:pipelineName",
                component:PipelineConfig,
                exact:true,
            },
            {
                path:"/index/searchresult/:searchresult",
                component:SearchResult,
                exact:true,
            },
            {
                path:"/index/searchresult",
                component:SearchResult,
                exact:true,
            },
            {
                path:"/index/task",
                component: Project,
                routes:[
                    {
                        path: "/index/task",
                        exact:true,
                        render:()=>  <Redirect to={"/index/task/work"}/>,
                    },
                    {
                        path:"/index/task/work",
                        component: WorkSpace
                    },
                    {
                        path:"/index/task/config",
                        component: ConfigDetails
                    },
                    {
                        path:"/index/task/structure",
                        component: Structure
                    },
                    {
                        path:"/index/task/assembly",
                        component: ProjectSet,
                        routes:[
                            {
                                path: "/index/task/assembly",
                                exact:true,
                                render:()=>  <Redirect to={"/index/task/assembly/user"}/>,
                            },
                            {
                                path:"/index/task/assembly/proof",
                                component:ProjectSetProof
                            },
                            {
                                path:"/index/task/assembly/role",
                                component: ProjectSetRole
                            },
                            {
                                path:"/index/task/assembly/feature",
                                component: ProjectSetFeature
                            },
                            {
                                path:"/index/task/assembly/redel",
                                component: ProjectSetReDel
                            },
                            {
                                path:"/index/task/assembly/user",
                                component: ProjectSetUser
                            }
                        ]
                    },
                ]
            },
            {
                path:"/index/system",
                component:System,
                routes:[
                    {
                        path: "/index/system",
                        exact:true,
                        render:()=> <Redirect to={"/index/system/base"}/>,
                    },
                    {
                        path: "/index/system/base",
                        component: UserBase,
                    },
                    {
                        path: "/index/system/directory",
                        component: UserDirectory,
                    },
                    {
                        path: "/index/system/list",
                        component: UserList,
                    },
                    {
                        path: "/index/system/org",
                        component: Org,
                    },
                    {
                        path: "/index/system/plug",
                        component: Plug,
                    },
                    {
                        path: "/index/system/power/role",
                        component: SystemRole,
                    },
                    {
                        path: "/index/system/power/feature",
                        component: SystemFeature,
                    },
                    {
                        path: "/index/system/proof",
                        component: OverallProof,
                    },
                    // {
                    //     path:"/index/system/log",
                    //     component: Log,
                    // },
                    {
                        path:"/index/system/info",
                        component: Info,
                    },
                ]
            },
        ]
    },
    {
        path:"/",
        component: Index,
        exact: true,
        render:()=>  <Redirect to="/index/home"/>,
    }
]

export default routers