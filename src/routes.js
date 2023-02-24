import React from "react";
import {Redirect} from "react-router-dom";
import AsyncComponent from "./common/lazy/SyncComponent";

const Index=AsyncComponent(()=>import("./modules/home/container/home"))

const Login=AsyncComponent(()=>import("./modules/login/login"))
const Logout=AsyncComponent(()=>import("./modules/login/Logout"))
const Wechat=AsyncComponent(()=>import("./modules/login/wechat"))
const NotFound=AsyncComponent(()=>import("./modules/login/404"))

/* 首页 */
const HomePage=AsyncComponent(()=>import("./modules/home/components/homePage"))

/* 授权 */
const Authorize=AsyncComponent(()=>import("./modules/config/authorize/authorize"))
/* 历史 */
const Structure=AsyncComponent(()=>import("./modules/structure/container/structure"))

/* 动态 */
const Dyna=AsyncComponent(()=>import("./modules/dyna/container/dyna"))

/*  流水线 */
const Pipeline=AsyncComponent(()=>import("./modules/pipeline/pipeline/container/pipeline"))
const PipelineAdd=AsyncComponent(()=>import("./modules/pipeline/pipeline/components/pipelineAdd"))
const PipelineDetails=AsyncComponent(()=>import("./modules/pipeline/pipelineDetails/pipelineDetails"))
const PipelineDyan=AsyncComponent(()=>import("./modules/dyna/components/dynaPipeline"))
const Survey=AsyncComponent(()=>import("./modules/pipeline/survey/container/survey"))
const StrPipeline=AsyncComponent(()=>import("./modules/structure/components/strPipeline"))
const Config=AsyncComponent(()=>import("./modules/config/config/container/config"))
const PipelineSet=AsyncComponent(()=>import("./modules/pipeline/setting/pipelineSet"))
const PipelineBasic=AsyncComponent(()=>import("./modules/pipeline/basic/pipelineBasic"))

/* 系统设置 */
const System=AsyncComponent(()=>import("./modules/sysmgr/sysmgr/system"))

/* 资源配置 */
const Auth=AsyncComponent(()=>import("./modules/resources/auth/container/auth"))
const Host=AsyncComponent(()=>import("./modules/resources/host/container/host"))
const Server=AsyncComponent(()=>import("./modules/resources/server/container/server"))
const Envi=AsyncComponent(()=>import("./modules/resources/envi/container/envi"))
const Info=AsyncComponent(()=>import("./modules/resources/envi/container/info"))

/* 插件 */
const Plugin=AsyncComponent(()=>import("./modules/sysmgr/plug-in/plugin"))

/* 权限 */
const SystemFeature=AsyncComponent(()=>import("./modules/sysmgr/privilege/systemFeature"))
const SystemRole=AsyncComponent(()=>import("./modules/sysmgr/privilege/systemRole"))
const SystemRoleTrue=AsyncComponent(()=>import("./modules/sysmgr/privilege/systemRoleTrue"))
const ProjectRole=AsyncComponent(()=>import("./modules/sysmgr/privilege/projectRole"))
const ProjectFeature=AsyncComponent(()=>import("./modules/sysmgr/privilege/projectFeature"))
const DomainRoleContent=AsyncComponent(()=>import("./modules/sysmgr/privilege/domainRole"))
const ProductAuth=AsyncComponent(()=>import("./modules/sysmgr/privilege/productAuth"))

/* 消息 */
const MessageManagement=AsyncComponent(()=>import("./modules/sysmgr/message/messageManagement"))
const MessageType=AsyncComponent(()=>import("./modules/sysmgr/message/messageType"))
const MessageSendType=AsyncComponent(()=>import("./modules/sysmgr/message/messageSendType"))
const MessageSendTypeTrue=AsyncComponent(()=>import("./modules/sysmgr/message/messageSendTypeTrue"))
const MessageNotice=AsyncComponent(()=>import("./modules/sysmgr/message/messageNotice"))
const MessageNoticeTrue=AsyncComponent(()=>import("./modules/sysmgr/message/messageNoticeTrue"))

/* 日志 */
const MyLogList=AsyncComponent(()=>import("./modules/sysmgr/oplog/myLogList"))
const LogTemplateList=AsyncComponent(()=>import("./modules/sysmgr/oplog/logTemplateList"))
const LogType=AsyncComponent(()=>import("./modules/sysmgr/oplog/logType"))

/* 代办 */
const MyTodoTask=AsyncComponent(()=>import("./modules/sysmgr/todotask/myTodoTask"))
const TaskList=AsyncComponent(()=>import("./modules/sysmgr/todotask/taskList"))
const TodoTemp=AsyncComponent(()=>import("./modules/sysmgr/todotask/todoTemp"))
const TodoType=AsyncComponent(()=>import("./modules/sysmgr/todotask/todoType"))

const UserList=AsyncComponent(()=>import("./modules/sysmgr/user/list"))
const UserDirectory=AsyncComponent(()=>import("./modules/sysmgr/user/directory"))
const Org=AsyncComponent(()=>import("./modules/sysmgr/user/org"))
const UserGroup=AsyncComponent(()=>import("./modules/sysmgr/user/group"))
const UserGroupTrue=AsyncComponent(()=>import("./modules/sysmgr/user/groupture"))
const ProjectSetUser=AsyncComponent(()=>import("./modules/sysmgr/user/domainUser"))

const NoProductAuthUser=AsyncComponent(()=>import("./modules/login/noProductAuthUser"))

/* 版本与许可证 */
const Version=AsyncComponent(()=>import("./modules/sysmgr/licence/version"))

const FullWorkTodo=AsyncComponent(()=>import("./modules/sysmgr/wiget/fullWorkTodo"))
const WidgetMangent=AsyncComponent(()=>import("./modules/sysmgr/wiget/widgetMangent"))
const OpLogWidget=AsyncComponent(()=>import("./modules/sysmgr/wiget/opLogWidget"))
const TodoWidget=AsyncComponent(()=>import("./modules/sysmgr/wiget/todoWidget"))

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
                exact: true,
            },
            {
                path:"/index/pipeline/new",
                component:PipelineAdd,
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
                exact: true
            },
            {
                path:"/index/history",
                component: Structure,
                exact: true
            },
            {
                path:"/index/pipeline/:id",
                component: PipelineDetails,
                routes:[
                    {
                        path:"/index/pipeline/:id/survey",
                        exact:true,
                        component: Survey
                    },
                    {
                        path:"/index/pipeline/:id/survey/dyna",
                        component: PipelineDyan,
                        exact:true,
                    },
                    {
                        path:"/index/pipeline/:id/config",
                        component: Config,
                        exact:true,
                    },
                    {
                        path:"/index/pipeline/:id/structure",
                        component: StrPipeline,
                        exact:true,
                    },
                    {
                        path:"/index/pipeline/:id/assembly",
                        component: PipelineSet,
                        routes:[
                            {
                                path:"/index/pipeline/:id/assembly/role",
                                component: DomainRoleContent
                            },
                            {
                                path:"/index/pipeline/:id/assembly/set",
                                component: PipelineBasic
                            },
                            {
                                path:"/index/pipeline/:id/assembly/user",
                                component: ProjectSetUser
                            },
                            {
                                path:"/index/pipeline/:id/*",
                                render:()=><Redirect to={"/index/404"}/>,
                            }
                        ]
                    },
                    {
                        path:"/index/pipeline/*",
                        render:()=><Redirect to={"/index/404"}/>,
                    }
                ]
            },
            {
                path:"/index/system",
                component:System,
                routes:[
                    {
                        path: "/index/system/productAuth",
                        component: ProductAuth,
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

export default routers
