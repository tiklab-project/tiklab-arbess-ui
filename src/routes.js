import React from "react";
import {Redirect} from "react-router-dom";
import AsyncComponent from "./common/lazy/SyncComponent";

const Index=AsyncComponent(()=>import("./home/components/Home"))

const Login=AsyncComponent(()=>import("./login/Login"))
const Logout=AsyncComponent(()=>import("./login/Logout"))
const Wechat=AsyncComponent(()=>import("./login/Wechat"))
const NotFound=AsyncComponent(()=>import("./login/404"))
const ExcludeProductUser=AsyncComponent(()=>import("./login/ExcludeProductUser"))

/**
 * 首页
 */
const HomePage=AsyncComponent(()=>import("./home/components/HomePage"))

/**
 * 流水线
 */
const Pipeline=AsyncComponent(()=>import("./pipeline/pipeline/components/Pipeline"))
const PipelineAdd=AsyncComponent(()=>import("./pipeline/pipeline/components/pipelineAdd"))
const PipelineDetails=AsyncComponent(()=>import("./pipeline/navigator/PipelineAside"))
const PipelineDyan=AsyncComponent(()=>import("./pipeline/overview/components/Dynamic"))
const Overview=AsyncComponent(()=>import("./pipeline/overview/components/Overview"))
const HistoryPipeline=AsyncComponent(()=>import("./pipeline/history/components/HistoryPipeline"))
const Design=AsyncComponent(()=>import("./pipeline/design/navigator/Design"))
const PipelineSetting=AsyncComponent(()=>import("./pipeline/setting/navigator/PipelineSetting"))
const PipelineBasic=AsyncComponent(()=>import("./pipeline/setting/basicInfo/PipelineBasicInfo"))
const History=AsyncComponent(()=>import("./pipeline/history/components/History"))
const Authorize=AsyncComponent(()=>import("./pipeline/authorize/Authorize"))
const Dynamic=AsyncComponent(()=>import("./home/components/Dynamic"))

/**
 * 系统设置
 */
const Setting=AsyncComponent(()=>import("./setting/navigator/Setting"))
const Auth=AsyncComponent(()=>import("./setting/auth/components/Auth"))
const Host=AsyncComponent(()=>import("./setting/authHost/component/Host"))
const Server=AsyncComponent(()=>import("./setting/authServer/components/Server"))
const Envi=AsyncComponent(()=>import("./setting/envi/components/Envi"))
const Info=AsyncComponent(()=>import("./setting/envi/components/Info"))

// plugin
const Plugin=AsyncComponent(()=>import("./setting/plugins/Plugin"))

// privilege
const SystemFeature=AsyncComponent(()=>import("./setting/privilege/SystemFeature"))
const SystemRole=AsyncComponent(()=>import("./setting/privilege/SystemRole"))
const SystemRoleTrue=AsyncComponent(()=>import("./setting/privilege/SystemRoleTrue"))
const ProjectRole=AsyncComponent(()=>import("./setting/privilege/ProjectRole"))
const ProjectFeature=AsyncComponent(()=>import("./setting/privilege/ProjectFeature"))
const DomainRoleContent=AsyncComponent(()=>import("./setting/privilege/DomainRole"))
const ProductAuth=AsyncComponent(()=>import("./setting/privilege/productAuth"))

// message
const MessageManagement=AsyncComponent(()=>import("./setting/message/MessageManagement"))
const MessageType=AsyncComponent(()=>import("./setting/message/MessageType"))
const MessageSendType=AsyncComponent(()=>import("./setting/message/MessageSendType"))
const MessageSendTypeTrue=AsyncComponent(()=>import("./setting/message/MessageSendTypeTrue"))
const MessageNotice=AsyncComponent(()=>import("./setting/message/MessageNotice"))
const MessageNoticeTrue=AsyncComponent(()=>import("./setting/message/MessageNoticeTrue"))

// security
const MyLog=AsyncComponent(()=>import("./setting/security/MyLog"))
const LogTemplate=AsyncComponent(()=>import("./setting/security/LogTemplate"))
const LogType=AsyncComponent(()=>import("./setting/security/LogType"))

// todotask
const MyTodoTask=AsyncComponent(()=>import("./setting/todotask/MyTodoTask"))
const Task=AsyncComponent(()=>import("./setting/todotask/Task"))
const TodoTemp=AsyncComponent(()=>import("./setting/todotask/TodoTemp"))
const TodoType=AsyncComponent(()=>import("./setting/todotask/TodoType"))

// user
const User=AsyncComponent(()=>import("./setting/user/User"))
const Directory=AsyncComponent(()=>import("./setting/user/Directory"))
const Orga=AsyncComponent(()=>import("./setting/user/Orga"))
const UserGroup=AsyncComponent(()=>import("./setting/user/Group"))
const UserGroupTrue=AsyncComponent(()=>import("./setting/user/Groupture"))
const DomainUser=AsyncComponent(()=>import("./setting/user/DomainUser"))

// licence
const Version=AsyncComponent(()=>import("./setting/licence/Version"))

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
        component:ExcludeProductUser,
    },
    {
        path: "/wechat",
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
                component:Dynamic,
                exact: true,
            },
            {
                path:"/index/authorize",
                component: Authorize,
                exact: true
            },
            {
                path:"/index/history",
                component: History,
                exact: true
            },
            {
                path:"/index/pipeline/:id",
                component: PipelineDetails,
                routes:[
                    {
                        path:"/index/pipeline/:id/survey",
                        exact:true,
                        component: Overview
                    },
                    {
                        path:"/index/pipeline/:id/survey/dyna",
                        component: PipelineDyan,
                        exact:true,
                    },
                    {
                        path:"/index/pipeline/:id/config",
                        component: Design,
                        exact:true,
                    },
                    {
                        path:"/index/pipeline/:id/structure",
                        component: HistoryPipeline,
                        exact:true,
                    },
                    {
                        path:"/index/pipeline/:id/assembly",
                        component: PipelineSetting,
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
                                component: DomainUser
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
                component:Setting,
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
                        component: Task,
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
                        component: MyLog,
                    },
                    {
                        path:"/index/system/logTemplate",
                        component: LogTemplate,
                    },{

                        path:"/index/system/logType",
                        component: LogType,
                    },
                    {
                        path: "/index/system/user/org",
                        component: Orga,
                    },
                    {
                        path: "/index/system/user/userGroup",
                        component: UserGroup,
                    },
                    {
                        path: "/index/system/user/directory",
                        component: Directory,
                    },
                    {
                        path: "/index/system/user/list",
                        component: User,
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
