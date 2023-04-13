import React from "react";
import {Redirect} from "react-router-dom";
import AsyncComponent from "./common/lazy/SyncComponent";

const Index=AsyncComponent(()=>import("./home/components/Home"))

const Login=AsyncComponent(()=>import("./login/Login"))
const Logout=AsyncComponent(()=>import("./login/Logout"))
const Wechat=AsyncComponent(()=>import("./login/Wechat"))
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

// message
const MessageSendType=AsyncComponent(()=>import("./setting/message/MessageSendType"))
const MessageNotice=AsyncComponent(()=>import("./setting/message/MessageNotice"))

// security
const MyLog=AsyncComponent(()=>import("./setting/security/MyLog"))

// user
const User=AsyncComponent(()=>import("./setting/user/User"))
const Directory=AsyncComponent(()=>import("./setting/user/Directory"))
const Orga=AsyncComponent(()=>import("./setting/user/Orga"))
const UserGroup=AsyncComponent(()=>import("./setting/user/Group"))
const DomainUser=AsyncComponent(()=>import("./setting/user/DomainUser"))
const SystemRole=AsyncComponent(()=>import("./setting/user/SystemRole"))
const DomainRole=AsyncComponent(()=>import("./setting/user/DomainRole"))
const NotFound=AsyncComponent(()=>import("./setting/user/NotFound"))

// licence
const Version=AsyncComponent(()=>import("./setting/licence/Version"))
const ProductAuth=AsyncComponent(()=>import("./setting/licence/ProductAuth"))

// base
const UserGroupTrue=AsyncComponent(()=>import("./setting/base/user/Groupture"))
const SystemFeature=AsyncComponent(()=>import("./setting/base/user/SystemFeature"))
const SystemRoleTrue=AsyncComponent(()=>import("./setting/base/user/SystemRoleTrue"))
const ProjectRole=AsyncComponent(()=>import("./setting/base/user/ProjectRole"))
const ProjectFeature=AsyncComponent(()=>import("./setting/base/user/ProjectFeature"))

const MyTodoTask=AsyncComponent(()=>import("./setting/base/todo/MyTodoTask"))
const Task=AsyncComponent(()=>import("./setting/base/todo/Task"))
const TodoTemp=AsyncComponent(()=>import("./setting/base/todo/TodoTemp"))
const TodoType=AsyncComponent(()=>import("./setting/base/todo/TodoType"))

const LogTemplate=AsyncComponent(()=>import("./setting/base/log/LogTemplate"))
const LogType=AsyncComponent(()=>import("./setting/base/log/LogType"))

const MessageManagement=AsyncComponent(()=>import("./setting/base/message/MessageManagement"))
const MessageNoticeTrue=AsyncComponent(()=>import("./setting/base/message/MessageNoticeTrue"))
const MessageSendTypeTrue=AsyncComponent(()=>import("./setting/base/message/MessageSendTypeTrue"))
const MessageType=AsyncComponent(()=>import("./setting/base/message/MessageType"))

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
                path:"/index/404",
                component:NotFound,
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
                                component: DomainRole,
                                exact: true,
                            },
                            {
                                path:"/index/pipeline/:id/assembly/set",
                                component: PipelineBasic,
                                exact: true,
                            },
                            {
                                path:"/index/pipeline/:id/assembly/user",
                                component: DomainUser,
                                exact: true,
                            },
                            {
                                path:"/index/pipeline/:id/assembly/*",
                                render:()=><Redirect to={"/index/404"}/>,
                            }
                        ]
                    },
                    {
                        path:"/index/pipeline/:id/*",
                        render:()=><Redirect to={"/index/404"}/>,
                    }
                ]
            },
            {
                path:"/index/system",
                component:Setting,
                routes:[
                    {
                        path: "/index/system/org",
                        component: Orga,
                        exact: true,
                    },
                    {
                        path: "/index/system/list",
                        component: User,
                        exact: true,
                    },
                    {
                        path: "/index/system/userGroup",
                        component: UserGroup,
                        exact: true,
                    },
                    {
                        path: "/index/system/directory",
                        component: Directory,
                        exact: true,
                    },
                    {
                        path: "/index/system/role",
                        component: SystemRole,
                        exact: true,
                    },
                    {
                        path:"/index/system/notice",
                        component: MessageNotice,
                        exact: true,
                    },
                    {
                        path:"/index/system/send",
                        component: MessageSendType,
                        exact: true,
                    },
                    {
                        path: "/index/system/auth",
                        component: Auth,
                        exact: true,
                    },
                    {
                        path: "/index/system/server",
                        component: Server,
                        exact: true,
                    },
                    {
                        path: "/index/system/host",
                        component: Host,
                        exact: true,
                    },
                    {
                        path:"/index/system/envi",
                        component: Envi,
                        exact: true,
                    },
                    {
                        path: "/index/system/plugin",
                        component: Plugin,
                        exact: true,
                    },
                    {
                        path:"/index/system/myLog",
                        component: MyLog,
                        exact: true,
                    },
                    {
                        path:"/index/system/version",
                        component: Version,
                        exact: true,
                    },
                    {
                        path: "/index/system/productAuth",
                        component: ProductAuth,
                        exact: true,
                    },
                    {
                        path:"/index/system/info",
                        component: Info,
                        exact: true,
                    },
                    {
                        path: "/index/system/roletrue",
                        component: SystemRoleTrue,
                        exact: true,
                    },
                    {
                        path: "/index/system/syr/feature",
                        component: SystemFeature,
                        exact: true,
                    },
                    {
                        path: "/index/system/project/role",
                        component: ProjectRole,
                        exact: true,
                    },
                    {
                        path: "/index/system/project/feature",
                        component: ProjectFeature,
                        exact: true,
                    },
                    {
                        path: "/index/system/task",
                        component: Task,
                        exact: true,
                    },
                    {
                        path: "/index/system/todoTask",
                        component: MyTodoTask,
                        exact: true,
                    },
                    {
                        path: "/index/system/todoTemp",
                        component: TodoTemp,
                        exact: true,
                    },
                    {
                        path: "/index/system/todoType",
                        component: TodoType,
                        exact: true,
                    },
                    {
                        path:"/index/system/logTemplate",
                        component: LogTemplate,
                        exact: true,
                    },
                    {

                        path:"/index/system/logType",
                        component: LogType,
                        exact: true,
                    },
                    {
                        path:"/index/system/management",
                        component: MessageManagement,
                        exact: true,
                    },
                    {
                        path:"/index/system/type",
                        component: MessageType,
                        exact: true,
                    },
                    {
                        path:"/index/system/sendtrue",
                        component: MessageSendTypeTrue,
                        exact: true,
                    },
                    {
                        path:"/index/system/noticetrue",
                        component: MessageNoticeTrue,
                        exact: true,
                    },
                    {
                        path: "/index/system/userGrouptrue",
                        component: UserGroupTrue,
                        exact: true,
                    },
                    {
                        path:"/index/system/*",
                        render:()=><Redirect to={"/index/404"}/>,
                    }
                ]
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
