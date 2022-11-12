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


/* 授权 */
const Authorize=AsyncComponent(()=>import("./modules/authorize/authorize"))

/* 代办 */
const Agency=AsyncComponent(()=>import("./modules/agency/agency"))

/* 动态 */
const Dyna=AsyncComponent(()=>import("./modules/dyna/dyna"))

const Project=AsyncComponent(()=>import("./modules/project/common/project"))

/*  流水线详情 */
const PipelineDyan=AsyncComponent(()=>import("./modules/project/dyna/dyna"))
const Survey=AsyncComponent(()=>import("./modules/project/survey/container/survey"))
const Structure=AsyncComponent(()=>import("./modules/project/structure/container/structure"))
const Config = AsyncComponent(()=>import("./modules/config/container/config"))

/*  流水线详情 -- 设置 */
const ProjectSet=AsyncComponent(()=>import("./modules/projectSet/common/projectSet"))
const ProjectSetReDel=AsyncComponent(()=>import("./modules/projectSet/reDel/projectSet"))
const ProjectSetUser=AsyncComponent(()=>import("./modules/projectSet/members/projectSetUser"))

/* 系统设置 */
const System=AsyncComponent(()=>import("./modules/system/common/system"))

/* 资源配置 */
const Auth=AsyncComponent(()=>import("./modules/resources/auth/container/auth"))
const Host=AsyncComponent(()=>import("./modules/resources/host/container/host"))
const Server=AsyncComponent(()=>import("./modules/resources/server/container/server"))

/* 系统设置 -- 列表 */

const Envi=AsyncComponent(()=>import("./modules/system/setting/container/envi"))
const Info=AsyncComponent(()=>import("./modules/system/setting/container/info"))
const ThirdAddress=AsyncComponent(()=>import("./modules/system/thirdAddress/cotainer/thirdAddress"))

const Plugin=AsyncComponent(()=>import("./modules/system/plug-in/plugin"))

const SystemFeature=AsyncComponent(()=>import("./modules/system/privilege/systemFeature"))
const SystemRole=AsyncComponent(()=>import("./modules/system/privilege/systemRole"))
const SystemRoleTrue=AsyncComponent(()=>import("./modules/system/privilege/systemRoleTrue"))
const ProjectRole=AsyncComponent(()=>import("./modules/system/privilege/projectRole"))
const ProjectFeature=AsyncComponent(()=>import("./modules/system/privilege/projectFeature"))
const DomainRoleContent=AsyncComponent(()=>import("./modules/system/privilege/domainRole"))

const MessageManagement=AsyncComponent(()=>import("./modules/system/message/messageManagement"))
const MessageTemplate=AsyncComponent(()=>import("./modules/system/message/messageTemplate"))
const MessageType=AsyncComponent(()=>import("./modules/system/message/messageType"))
const MessageSendType=AsyncComponent(()=>import("./modules/system/message/messageSendType"))
const MessageSendTypeTrue=AsyncComponent(()=>import("./modules/system/message/messageSendTypeTrue"))

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

const routerSass=[
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
                path:"/index/pipeline",
                component:Pipeline,
                exact: true,
            },
            {
                path:"/index/agency",
                component:Agency,
                exact: true,
            },
            {
                path:"/index/dyna",
                component:Dyna,
                exact: true,
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
                        path:"/index/task/:pipelineId/survey",
                        component: Survey
                    },
                    {
                        path:"/index/task/:pipelineId/dyna",
                        component: PipelineDyan
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
                                path:"/index/task/:pipelineId/assembly/role",
                                component: DomainRoleContent
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
                        path: "/index/system/roletrue",
                        component: SystemRoleTrue,
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
                        path: "/index/system/auth",
                        component: Auth,
                    },
                    {
                        path: "/index/system/resoure/server",
                        component: Server
                    },
                    {
                        path: "/index/system/resoure/host",
                        component: Host
                    },
                    {
                        path:"/index/system/info",
                        component: Info,
                    },
                    {
                        path:"/index/system/thirdAddress",
                        component: ThirdAddress,
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
                        path: "/index/system/user/dashbord",
                        component: Org,
                    },
                    {
                        path: "/index/system/user/directory",
                        component: UserDirectory,
                    },
                    {
                        path: "/index/system/user/list",
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
                        path:"/index/system/mes/send",
                        component: MessageSendType,
                    },
                    {
                        path:"/index/system/mes/sendtrue",
                        component: MessageSendTypeTrue,
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

export default routerSass