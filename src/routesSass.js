import React from "react";
import {Redirect} from "react-router-dom";
import AsyncComponent from "./common/lazy/SyncComponent";

const Index=AsyncComponent(()=>import("./modules/home/container/home"))

const Login=AsyncComponent(()=>import("./modules/eam/login"))
const Logout=AsyncComponent(()=>import("./modules/eam/Logout"))
const Wechat=AsyncComponent(()=>import("./modules/eam/wechat"))
const NotFound=AsyncComponent(()=>import("./modules/eam/404"))

/* 首页 */
const HomePage=AsyncComponent(()=>import("./modules/home/components/homePage"))

/*  流水线 */
const Pipeline=AsyncComponent(()=>import("./modules/pipeline/container/pipeline"))

/* 授权 */
const Authorize=AsyncComponent(()=>import("./modules/config/authorize/authorize"))

const Structure=AsyncComponent(()=>import("./modules/structure/container/structure"))

/* 动态 */
const Dyna=AsyncComponent(()=>import("./modules/dyna/dyna/dyna"))

const Project=AsyncComponent(()=>import("./modules/project/common/project"))

/*  流水线详情 */
const PipelineDyan=AsyncComponent(()=>import("./modules/project/dyna/dyna"))
const Survey=AsyncComponent(()=>import("./modules/project/survey/container/survey"))
const StrPipeline=AsyncComponent(()=>import("./modules/structure/components/strPipeline"))
const Config=AsyncComponent(()=>import("./modules/config/common/container/config"))

/*  流水线详情 -- 设置 */
const ProjectSet=AsyncComponent(()=>import("./modules/projectSet/common/projectSet"))
const ProjectSetting=AsyncComponent(()=>import("./modules/projectSet/set/projectSet"))
const ProjectSetUser=AsyncComponent(()=>import("./modules/projectSet/domainUser/domainUser"))

/* 系统设置 */
const System=AsyncComponent(()=>import("./modules/system/common/system"))

/* 资源配置 */
const Auth=AsyncComponent(()=>import("./modules/resources/auth/container/auth"))
const Host=AsyncComponent(()=>import("./modules/resources/host/container/host"))
const Server=AsyncComponent(()=>import("./modules/resources/server/container/server"))
const Envi=AsyncComponent(()=>import("./modules/resources/envi/container/envi"))
const Info=AsyncComponent(()=>import("./modules/resources/envi/container/info"))

/* 插件 */
const Plugin=AsyncComponent(()=>import("./modules/system/plug-in/plugin"))

/* 权限 */
const SystemFeature=AsyncComponent(()=>import("./modules/system/privilege/systemFeature"))
const SystemRole=AsyncComponent(()=>import("./modules/system/privilege/systemRole"))
const SystemRoleTrue=AsyncComponent(()=>import("./modules/system/privilege/systemRoleTrue"))
const ProjectRole=AsyncComponent(()=>import("./modules/system/privilege/projectRole"))
const ProjectFeature=AsyncComponent(()=>import("./modules/system/privilege/projectFeature"))
const DomainRoleContent=AsyncComponent(()=>import("./modules/system/privilege/domainRole"))

/* 消息 */
const MessageManagement=AsyncComponent(()=>import("./modules/system/message/messageManagement"))
const MessageType=AsyncComponent(()=>import("./modules/system/message/messageType"))
const MessageSendType=AsyncComponent(()=>import("./modules/system/message/messageSendType"))
const MessageSendTypeTrue=AsyncComponent(()=>import("./modules/system/message/messageSendTypeTrue"))
const MessageNotice=AsyncComponent(()=>import("./modules/system/message/messageNotice"))
const MessageNoticeTrue=AsyncComponent(()=>import("./modules/system/message/messageNoticeTrue"))

/* 日志 */
const MyLogList=AsyncComponent(()=>import("./modules/system/oplog/myLogList"))
const LogTemplateList=AsyncComponent(()=>import("./modules/system/oplog/logTemplateList"))
const LogList=AsyncComponent(()=>import("./modules/system/oplog/logList"))
const LogType=AsyncComponent(()=>import("./modules/system/oplog/logType"))

/* 代办 */
const MyTodoTask=AsyncComponent(()=>import("./modules/system/todotask/myTodoTask"))
const TaskList=AsyncComponent(()=>import("./modules/system/todotask/taskList"))
const TodoTemp=AsyncComponent(()=>import("./modules/system/todotask/todoTemp"))
const TodoType=AsyncComponent(()=>import("./modules/system/todotask/todoType"))

const UserList=AsyncComponent(()=>import("./modules/system/user/list"))
const UserDirectory=AsyncComponent(()=>import("./modules/system/user/directory"))
const Org=AsyncComponent(()=>import("./modules/system/user/org"))
const UserGroup=AsyncComponent(()=>import("./modules/system/user/group"))
const UserGroupTrue=AsyncComponent(()=>import("./modules/system/user/groupture"))

const ProductUser=AsyncComponent(()=>import("./modules/system/licence/productUser"))
const NoProductAuthUser=AsyncComponent(()=>import("./modules/eam/noProductAuthUser"))


/* 版本与许可证 */
const Version=AsyncComponent(()=>import("./modules/system/licence/version"))

const FullWorkTodo=AsyncComponent(()=>import("./modules/wiget/fullWorkTodo"))
const WidgetMangent=AsyncComponent(()=>import("./modules/wiget/widgetMangent"))
const OpLogWidget=AsyncComponent(()=>import("./modules/wiget/opLogWidget"))
const TodoWidget=AsyncComponent(()=>import("./modules/wiget/todoWidget"))

const routesSass=[
    {
        path:"/login",
        component:Login,
    },
    {
        path:"/logout",
        component:Logout,
    },
    {
        path:"/no-auth",
        exact:true,
        component:NoProductAuthUser,
    },
    {
        path: "/project",
        exact:true,
        component:Wechat,
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
            },
            {
                path:"/index/dyna",
                component:Dyna,
                exact: true,
            },
            {
                path:"/index/authorize",
                component: Authorize,
                exact: true
            },
            {
                path:"/index/history",
                component: Structure,
                exact: true
            },
            {
                path:"/index/task/:id",
                component: Project,
                routes:[
                    {
                        path:"/index/task/:id/survey",
                        exact:true,
                        component: Survey
                    },
                    {
                        path:"/index/task/:id/survey/dyna",
                        component: PipelineDyan,
                        exact:true,
                    },
                    {
                        path:"/index/task/:id/config",
                        component: Config,
                        exact:true,
                    },
                    {
                        path:"/index/task/:id/structure",
                        component: StrPipeline,
                        exact:true,
                    },
                    {
                        path:"/index/task/:id/assembly",
                        component: ProjectSet,
                        routes:[

                            {
                                path:"/index/task/:id/assembly/role",
                                component: DomainRoleContent
                            },
                            {
                                path:"/index/task/:id/assembly/set",
                                component: ProjectSetting
                            },
                            {
                                path:"/index/task/:id/assembly/user",
                                component: ProjectSetUser
                            },
                            {
                                path:"/index/task/:id/*",
                                render:()=><Redirect to={"/index/404"}/>,
                            }
                        ]
                    },
                    {
                        path:"/index/task/*",
                        render:()=><Redirect to={"/index/404"}/>,
                    }
                ]
            },
            {
                path:"/index/system",
                component:System,
                routes:[
                    {
                        path: "/index/system/productUser",
                        component: ProductUser,
                    },
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
                        path:"/index/system/envi",
                        component: Envi,
                    },
                    {
                        path: "/index/system/task",
                        component: TaskList,
                    },
                    {
                        path: "/index/system/todoTask",
                        component: MyTodoTask,
                    },
                    {
                        path: "/index/system/todoTemp",
                        component: TodoTemp,
                    },
                    {
                        path: "/index/system/todoType",
                        component: TodoType,
                    },
                    {
                        path:"/index/system/myLog",
                        component: MyLogList,
                    },
                    {
                        path:"/index/system/logTemplate",
                        component: LogTemplateList,
                    },{

                        path:"/index/system/logType",
                        component: LogType,
                    },
                    {
                        path: "/index/system/user/org",
                        component: Org,
                    },
                    {
                        path: "/index/system/user/userGroup",
                        component: UserGroup,
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
                        path:"/index/system/mes/notice",
                        component: MessageNotice,
                    },
                    {
                        path:"/index/system/mes/noticetrue",
                        component: MessageNoticeTrue,
                    },
                    {
                        path: "/index/system/user/userGrouptrue",
                        component: UserGroupTrue,
                    },
                    {
                        path:"/index/system/version",
                        component: Version,
                    },
                    {
                        path:"/index/system/*",
                        render:()=><Redirect to={"/index/404"}/>,
                    }
                ]
            },
            {
                path:"/index/404",
                component:NotFound,
            },
            {
                path:"/index/*",
                render:()=><Redirect to={"/index/404"}/>,
            }
        ]
    },
    {
        path:"/",
        component: Index,
        exact: true,
        render:()=><Redirect to="/index"/>,
    },
    {
        path: "*",
        render:()=><Redirect to="/index/404"/>,
    },
]

export default routesSass
