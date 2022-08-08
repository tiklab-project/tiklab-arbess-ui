import React from "react";
import {Redirect} from "react-router-dom";
import AsyncComponent from "./common/lazy/SyncComponent";

const Login=AsyncComponent(()=>import("./modules/login/login"))
const Index=AsyncComponent(()=>import("./modules/home/container/portal"))

/* 首页 */
const HomePage=AsyncComponent(()=>import("./modules/home/components/homePage"))

/* 动态详情 */
const DynamicDetails=AsyncComponent(()=>import("./modules/home/components/dynamicDetails"))

/*  流水线 */
const MatFlow=AsyncComponent(()=>import("./modules/matFlow/matFlow/container/matFlow"))
const MatFlowAdd=AsyncComponent(()=>import("./modules/matFlow/matFlowAdd/matFlowAdd"))
const MatFlowConfig=AsyncComponent(()=>import("./modules/config/config/config"))
const SearchResult=AsyncComponent(()=>import("./modules/matFlow/matFlowSearch/searchResult"))

/* 流水线 -- 收藏 */
const MatFlowCollect=AsyncComponent(()=>import("./modules/matFlow/matFlowCollect/container/matFlowCollect"))

const Project=AsyncComponent(()=>import("./modules/project/common/container/project"))

/*  流水线详情 */
const WorkSpace=AsyncComponent(()=>import("./modules/project/workSpace/container/workSpace"))
const Structure=AsyncComponent(()=>import("./modules/project/structure/container/structure"))
const ConfigDetails = AsyncComponent(()=>import("./modules/config/configDetails/configDetails"))
const ProjectSet=AsyncComponent(()=>import("./modules/projectSet/common/projectSet"))

/*  流水线详情 -- 设置 */
const ProjectSetReDel=AsyncComponent(()=>import("./modules/projectSet/reDel/projectSetReDel"))
const ProjectSetProof=AsyncComponent(()=>import("./modules/projectSet/proof/projectSetProof"))
const ProjectSetUser=AsyncComponent(()=>import("./modules/projectSet/members/projectSetUser"))

/* 系统设置 */
const System=AsyncComponent(()=>import("./modules/system/common/system"))

/* 系统设置 -- 列表 */
const UserInfo=AsyncComponent(()=>import("./modules/system/user/userInfo"))
const UserList=AsyncComponent(()=>import("./modules/system/user/list"))
const UserDirectory=AsyncComponent(()=>import("./modules/system/user/directory"))
const Org=AsyncComponent(()=>import("./modules/system/user/org"))
const Plug=AsyncComponent(()=>import("./modules/system/plug/plug"))
const SystemProof=AsyncComponent(()=>import("./modules/system/proof/systemProof"))
const Info=AsyncComponent(()=>import("./modules/system/message/info/info"))
const SystemFeature=AsyncComponent(()=>import("./modules/system/privilege/systemFeature"))
const SystemRole=AsyncComponent(()=>import("./modules/system/privilege/systemRole"))
const ProjectRole=AsyncComponent(()=>import("./modules/system/privilege/projectRole"))
const ProjectFeature=AsyncComponent(()=>import("./modules/system/privilege/projectFeature"))

const routers=[
    {
        path:"/logout",
        component:Login,
    },
    {
        path:"/index",
        component: Index,
        routes:[
            {
                path: "/index",
                exact:true,
                render:()=><Redirect to={"/index/home"}/>,
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
                path:"/index/matFlow",
                component:MatFlow,
                exact: true,
            },
            {
                path:"/index/new",
                component: MatFlowAdd,
                exact:true,
            },
            {
                path:"/index/collect",
                component:MatFlowCollect,
                exact:true,
            },
            {
                path:"/index/config/:matFlowName",
                component:MatFlowConfig,
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
                path:"/index/task/:matFlowName",
                component: Project,
                routes:[
                    {
                        path:"/index/task/:matFlowName/work",
                        component: WorkSpace
                    },
                    {
                        path:"/index/task/:matFlowName/config",
                        component: ConfigDetails
                    },
                    {
                        path:"/index/task/config",
                        component: ConfigDetails
                    },
                    {
                        path:"/index/task/:matFlowName/structure",
                        component: Structure
                    },
                    {
                        path:"/index/task/:matFlowName/assembly",
                        component: ProjectSet,
                        routes:[
                            {
                                path:"/index/task/:matFlowName/assembly/proof",
                                component:ProjectSetProof
                            },
                            {
                                path:"/index/task/:matFlowName/assembly/role",
                                component: ProjectRole
                            },
                            {
                                path:"/index/task/:matFlowName/assembly/redel",
                                component: ProjectSetReDel
                            },
                            {
                                path:"/index/task/:matFlowName/assembly/user",
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
                        path: "/index/system/base",
                        component: UserInfo,
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
                        path: "/index/system/project/role",
                        component: ProjectRole,
                    },
                    {
                        path: "/index/system/project/feature",
                        component: ProjectFeature,
                    },
                    {
                        path: "/index/system/proof",
                        component: SystemProof,
                    },
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
        render:()=><Redirect to="/index"/>,
    }
]

export default routers