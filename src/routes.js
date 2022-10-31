import React from "react";
import {Redirect} from "react-router-dom";
import AsyncComponent from "./common/lazy/SyncComponent";

const Index=AsyncComponent(()=>import("./modules/portal/portal"))

const Login=AsyncComponent(()=>import("./modules/login/login"))
const Logout=AsyncComponent(()=>import("./modules/login/Logout"))

/* 首页 */
const HomePage=AsyncComponent(()=>import("./modules/home/container/homePage"))

/*  流水线 */
const Pipeline=AsyncComponent(()=>import("./modules/pipeline/container/pipeline"))

const Project=AsyncComponent(()=>import("./modules/project/common/project"))

/*  流水线详情 */
const WorkSpace=AsyncComponent(()=>import("./modules/project/workSpace/container/workSpace"))
const Structure=AsyncComponent(()=>import("./modules/project/structure/container/structure"))
const Config = AsyncComponent(()=>import("./modules/config/container/config"))

/* 授权 */
const Authorize=AsyncComponent(()=>import("./modules/authorize/authorize"))

/*  流水线详情 -- 设置 */
const ProjectSet=AsyncComponent(()=>import("./modules/projectSet/common/projectSet"))
const ProjectSetReDel=AsyncComponent(()=>import("./modules/projectSet/reDel/projectSetReDel"))
const ProjectSetProof=AsyncComponent(()=>import("./modules/projectSet/proof/projectSetProof"))
const ProjectSetUser=AsyncComponent(()=>import("./modules/projectSet/members/projectSetUser"))

/* 系统设置 */
const System=AsyncComponent(()=>import("./modules/system/common/system"))

/* 系统设置 -- 列表 */
const SystemProof=AsyncComponent(()=>import("./modules/system/proof/systemProof"))
const Envi=AsyncComponent(()=>import("./modules/system/setting/components/envi"))
const Info=AsyncComponent(()=>import("./modules/system/setting/components/info"))
const SysAuth=AsyncComponent(()=>import("./modules/system/auth/cotainer/sysAuth"))
const Identify=AsyncComponent(()=>import("./modules/system/identify/container/identify"))

const Plugin=AsyncComponent(()=>import("./modules/system/plug-in/plugin"))

const SystemFeature=AsyncComponent(()=>import("./modules/system/privilege/systemFeature"))
const SystemRole=AsyncComponent(()=>import("./modules/system/privilege/systemRole"))
const ProjectRole=AsyncComponent(()=>import("./modules/system/privilege/projectRole"))
const ProjectFeature=AsyncComponent(()=>import("./modules/system/privilege/projectFeature"))

const UserMessageContent=AsyncComponent(()=>import("./modules/system/message/userMessage"))
const MessageManagement=AsyncComponent(()=>import("./modules/system/message/messageManagement"))
const MessageTemplate=AsyncComponent(()=>import("./modules/system/message/messageTemplate"))
const MessageType=AsyncComponent(()=>import("./modules/system/message/messageType"))
const MessageSendType=AsyncComponent(()=>import("./modules/system/message/messageSendType"))

const MyLogList=AsyncComponent(()=>import("./modules/system/oplog/myLogList"))
const LogList=AsyncComponent(()=>import("./modules/system/oplog/logList"))
const LogTemplateList=AsyncComponent(()=>import("./modules/system/oplog/logTemplateList"))

const MyTodoTask=AsyncComponent(()=>import("./modules/system/todotask/myTodoTask"))
const TaskList=AsyncComponent(()=>import("./modules/system/todotask/taskList"))
const TodoTemp=AsyncComponent(()=>import("./modules/system/todotask/todoTemp"))

const UserList=AsyncComponent(()=>import("./modules/system/user/list"))
const UserDirectory=AsyncComponent(()=>import("./modules/system/user/directory"))
const Org=AsyncComponent(()=>import("./modules/system/user/org"))

const FullWorkTodo=AsyncComponent(()=>import("./modules/wiget/fullWorkTodo"))
const WidgetMangent=AsyncComponent(()=>import("./modules/wiget/widgetMangent"))
const OpLogWidget=AsyncComponent(()=>import("./modules/wiget/opLogWidget"))
const TodoWidget=AsyncComponent(()=>import("./modules/wiget/todoWidget"))

const routers=[
    {
        path:"/login",
        component:Login,
    },
    {
        path:"/logout",
        component:Logout,
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
                path: "/index/fullWorkTodo",
                component: FullWorkTodo,
                exact:true,
            },
            {
                path:"/index/pipeline",
                component:Pipeline,
                exact: true,
            },
            {
                path:"/index/userMessage",
                component: UserMessageContent,
            },
            {
                path:"/index/authorize",
                component: Authorize,
            },
            {
                path:"/index/task/:pipelineId",
                component: Project,
                routes:[
                    {
                        path:"/index/task/:pipelineId/work",
                        component: WorkSpace
                    },
                    {
                        path:"/index/task/:pipelineId/config",
                        component: Config
                    },
                    {
                        path:"/index/task/config",
                        component: Config
                    },
                    {
                        path:"/index/task/:pipelineId/structure",
                        component: Structure
                    },
                    {
                        path:"/index/task/:pipelineId/assembly",
                        component: ProjectSet,
                        routes:[
                            {
                                path:"/index/task/:pipelineId/assembly/proof",
                                component:ProjectSetProof
                            },
                            {
                                path:"/index/task/:pipelineId/assembly/role",
                                component: ProjectRole
                            },
                            {
                                path:"/index/task/:pipelineId/assembly/redel",
                                component: ProjectSetReDel
                            },
                            {
                                path:"/index/task/:pipelineId/assembly/user",
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
                        path: "/index/system/plugin",
                        component: Plugin,
                    },
                    {
                        path: "/index/system/role",
                        component: SystemRole,
                    },
                    {
                        path: "/index/system/syr/feature",
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
                    {
                        path:"/index/system/sysauth",
                        component: SysAuth,
                    },
                    {
                        path:"/index/system/identify",
                        component: Identify,
                    },
                    {
                        path:"/index/system/envi",
                        component: Envi,
                    },
                    {
                        path: "/index/system/task",
                        component: TaskList,
                    },
                    {
                        path: "/index/system/myTodoTask",
                        component: MyTodoTask,
                    },
                    {
                        path: "/index/system/todoTemp",
                        component: TodoTemp,
                    },
                    {
                        path:"/index/system/myLog",
                        component: MyLogList,
                    },
                    {
                        path:"/index/system/logTemplate",
                        component: LogTemplateList,
                    },
                    {
                        path: "/index/system/dashbord",
                        component: Org,
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
                        path:"/index/system/mes/management",
                        component: MessageManagement,
                    },
                    {
                        path:"/index/system/mes/template",
                        component: MessageTemplate,
                    },
                    {
                        path:"/index/system/mes/type",
                        component: MessageType,
                    },
                    {
                        path:"/index/system/mes",
                        component: MessageSendType,
                    },
                    {
                        render:()=><Redirect to="/index/system/role"/>,
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
    },
]

export default routers