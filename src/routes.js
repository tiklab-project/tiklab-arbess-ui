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
const Overview=AsyncComponent(()=>import("./pipeline/overview/components/Overview"))
const Design=AsyncComponent(()=>import("./pipeline/design/navigator/Design"))
const DesignProcess=AsyncComponent(()=>import("./pipeline/design/processDesign/gui/component/Gui"))
const DesignTrigger=AsyncComponent(()=>import("./pipeline/design/trigger/components/Trigger"))
const DesignVariable=AsyncComponent(()=>import("./pipeline/design/variable/components/Variable"))
const DesignPostprocess=AsyncComponent(()=>import("./pipeline/design/postprocess/components/Postprocess"))
const Authorize=AsyncComponent(()=>import("./pipeline/authorize/Authorize"))
const Dynamic=AsyncComponent(()=>import("./pipeline/overview/components/Dynamic"))
const History=AsyncComponent(()=>import("./pipeline/history/components/History"))
const HistoryInstance=AsyncComponent(()=>import("./pipeline/history/components/HistoryInstance"))
const Test=AsyncComponent(()=>import("./pipeline/test/component/Test"))
const Scan=AsyncComponent(()=>import("./pipeline/scan/component/Scan"))
const PipelineSetting=AsyncComponent(()=>import("./pipeline/setting/navigator/PipelineSetting"))
const BasicInfo=AsyncComponent(()=>import("./pipeline/setting/basicInfo/BasicInfo"))

/**
 * 系统设置
 */
const Setting=AsyncComponent(()=>import("./setting/navigator/Setting"))
const Auth=AsyncComponent(()=>import("./setting/auth/components/Auth"))
const Host=AsyncComponent(()=>import("./setting/authHost/component/Host"))
const HostGroup=AsyncComponent(()=>import("./setting/authHost/component/HostGroup"))
const Server=AsyncComponent(()=>import("./setting/authServer/components/Server"))
const Tool=AsyncComponent(()=>import("./setting/tool/components/Tool"))
const Resources=AsyncComponent(()=>import("./setting/resources/component/Resources"))
const Grouping=AsyncComponent(()=>import("./setting/grouping/component/Grouping"))
const Env=AsyncComponent(()=>import("./setting/env/component/Env"))

// plugin
const Plugin=AsyncComponent(()=>import("./setting/plugins/Plugin"))

// message
const MessageSendType=AsyncComponent(()=>import("./setting/message/MessageSendType"))
const MessageNotice=AsyncComponent(()=>import("./setting/message/MessageNotice"))

// security
const MyLog=AsyncComponent(()=>import("./setting/security/MyLog"))
const BackupRestore=AsyncComponent(()=>import("./setting/security/BackupRestore"))

// user
const User=AsyncComponent(()=>import("./setting/user/User"))
const Directory=AsyncComponent(()=>import("./setting/user/Directory"))
const Orga=AsyncComponent(()=>import("./setting/user/Orga"))
const UserGroup=AsyncComponent(()=>import("./setting/user/Group"))
const DomainUser=AsyncComponent(()=>import("./setting/user/DomainUser"))

// privilege
const DomainRole=AsyncComponent(()=>import("./setting/privilege/DomainRole"))
const SystemRole=AsyncComponent(()=>import("./setting/privilege/SystemRole"))
const NotFound=AsyncComponent(()=>import("./setting/privilege/NotFound"))


// licence
const Version=AsyncComponent(()=>import("./setting/licence/Version"))
const ProductAuth=AsyncComponent(()=>import("./setting/licence/ProductAuth"))

// base
const UserGroupTrue=AsyncComponent(()=>import("./setting/base/user/Groupture"))
const SystemFeature=AsyncComponent(()=>import("./setting/base/privilege/SystemFeature"))
const SystemRoleTrue=AsyncComponent(()=>import("./setting/base/privilege/SystemRoleTrue"))
const ProjectRole=AsyncComponent(()=>import("./setting/base/privilege/ProjectRole"))
const ProjectFeature=AsyncComponent(()=>import("./setting/base/privilege/ProjectFeature"))

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
        path:"/",
        component: Index,
        routes:[
            {
                path: "/home",
                component: HomePage,
                exact:true,
            },
            {
                path:"/pipeline",
                component:Pipeline,
                exact: true,
            },
            {
                path:"/pipeline/new",
                component:PipelineAdd,
                exact: true,
            },
            {
                path:"/dyna",
                component:Dynamic,
                exact: true,
            },
            {
                path:"/authorize",
                component: Authorize,
                exact: true
            },
            {
                path:"/history",
                component: History,
                exact: true
            },
            {
                path:"/404",
                component:NotFound,
            },
            {
                path:"/pipeline/:id",
                component: PipelineDetails,
                routes:[
                    {
                        path:"/pipeline/:id/survey",
                        exact:true,
                        component: Overview
                    },
                    {
                        path:"/pipeline/:id/survey/dyna",
                        component: Dynamic,
                        exact:true,
                    },
                    {
                        path:"/pipeline/:id/config",
                        component: Design,
                        routes:[
                            {
                                path:"/pipeline/:id/config",
                                component: DesignProcess,
                                exact:true,
                            },
                            {
                                path:"/pipeline/:id/config/tigger",
                                component: DesignTrigger,
                                exact:true,
                            },
                            {
                                path:"/pipeline/:id/config/vari",
                                component: DesignVariable,
                                exact:true,
                            },
                            {
                                path:"/pipeline/:id/config/postprocess",
                                component: DesignPostprocess,
                                exact:true,
                            },
                        ]
                    },
                    {
                        path:"/pipeline/:id/history",
                        component: History,
                        exact:true,
                    },
                    {
                        path:"/pipeline/:id/history/:instanceId",
                        component: HistoryInstance,
                        exact:true,
                    },
                    {
                        path:"/pipeline/:id/test",
                        component: Test,
                        exact:true,
                    },
                    {
                        path:"/pipeline/:id/scan",
                        component: Scan,
                        exact:true,
                    },
                    {
                        path:"/pipeline/:id/set",
                        component: PipelineSetting,
                        routes:[
                            {
                                path:"/pipeline/:id/set/role",
                                component: DomainRole,
                                exact: true,
                            },
                            {
                                path:"/pipeline/:id/set/info",
                                component: BasicInfo,
                                exact: true,
                            },
                            {
                                path:"/pipeline/:id/set/user",
                                component: DomainUser,
                                exact: true,
                            },
                            {
                                path:"/pipeline/:id/set/*",
                                render:()=><Redirect to={"/404"}/>,
                            }
                        ]
                    },
                    {
                        path:"/pipeline/:id/*",
                        render:()=><Redirect to={"/404"}/>,
                    }
                ]
            },
            {
                path:"/setting",
                component:Setting,
                routes:[
                    {
                        path: "/setting/org",
                        component: Orga,
                        exact: true,
                    },
                    {
                        path: "/setting/user",
                        component: User,
                        exact: true,
                    },
                    {
                        path: "/setting/userGroup",
                        component: UserGroup,
                        exact: true,
                    },
                    {
                        path: "/setting/directory",
                        component: Directory,
                        exact: true,
                    },
                    {
                        path: "/setting/role",
                        component: SystemRole,
                        exact: true,
                    },
                    {
                        path:"/setting/notice",
                        component: MessageNotice,
                        exact: true,
                    },
                    {
                        path:"/setting/send",
                        component: MessageSendType,
                        exact: true,
                    },
                    {
                        path:"/setting/grouping",
                        component: Grouping,
                        exact: true,
                    },
                    {
                        path:"/setting/env",
                        component: Env,
                        exact: true,
                    },
                    {
                        path: "/setting/auth",
                        component: Auth,
                        exact: true,
                    },
                    {
                        path: "/setting/server",
                        component: Server,
                        exact: true,
                    },
                    {
                        path: "/setting/host",
                        component: Host,
                        exact: true,
                    },
                    {
                        path: "/setting/hostGroup",
                        component: HostGroup,
                        exact: true,
                    },
                    {
                        path:"/setting/tool",
                        component: Tool,
                        exact: true,
                    },
                    {
                        path: "/setting/plugin",
                        component: Plugin,
                        exact: true,
                    },
                    {
                        path:"/setting/backups",
                        component: BackupRestore,
                        exact: true,
                    },
                    {
                        path:"/setting/myLog",
                        component: MyLog,
                        exact: true,
                    },
                    {
                        path:"/setting/version",
                        component: Version,
                        exact: true,
                    },
                    {
                        path:"/setting/productAuth",
                        component: ProductAuth,
                        exact: true,
                    },
                    {
                        path:"/setting/resources",
                        component: Resources,
                        exact: true,
                    },
                    {
                        path: "/setting/roletrue",
                        component: SystemRoleTrue,
                        exact: true,
                    },
                    {
                        path: "/setting/syr/feature",
                        component: SystemFeature,
                        exact: true,
                    },
                    {
                        path: "/setting/project/role",
                        component: ProjectRole,
                        exact: true,
                    },
                    {
                        path: "/setting/project/feature",
                        component: ProjectFeature,
                        exact: true,
                    },
                    {
                        path: "/setting/task",
                        component: Task,
                        exact: true,
                    },
                    {
                        path: "/setting/todoTask",
                        component: MyTodoTask,
                        exact: true,
                    },
                    {
                        path: "/setting/todoTemp",
                        component: TodoTemp,
                        exact: true,
                    },
                    {
                        path: "/setting/todoType",
                        component: TodoType,
                        exact: true,
                    },
                    {
                        path:"/setting/logTemplate",
                        component: LogTemplate,
                        exact: true,
                    },
                    {

                        path:"/setting/logType",
                        component: LogType,
                        exact: true,
                    },
                    {
                        path:"/setting/management",
                        component: MessageManagement,
                        exact: true,
                    },
                    {
                        path:"/setting/type",
                        component: MessageType,
                        exact: true,
                    },
                    {
                        path:"/setting/sendtrue",
                        component: MessageSendTypeTrue,
                        exact: true,
                    },
                    {
                        path:"/setting/noticetrue",
                        component: MessageNoticeTrue,
                        exact: true,
                    },
                    {
                        path: "/setting/userGrouptrue",
                        component: UserGroupTrue,
                        exact: true,
                    },
                    {
                        path:"/setting/*",
                        render:()=><Redirect to={"/404"}/>,
                    }
                ]
            },
            {
                path:"/",
                render:()=><Redirect to="/home"/>,
            },
            {
                path:"*",
                render:()=><Redirect to="/404"/>
            },
        ]
    },

]

export default routers
