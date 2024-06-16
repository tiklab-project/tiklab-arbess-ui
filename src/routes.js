import React from "react";
import {Redirect} from "react-router-dom";

import {
    Index,
    Login,
    Logout,
    Wechat,
    ExcludeProductUser,
    NotFound,
    NoAccess,

    HomePage,

    Pipeline,
    PipelineAdd,
    PipelineDetails,
    Overview,
    Dynamic,

    Design,
    DesignProcess,
    DesignTrigger,
    DesignVariable,
    DesignPostprocess,

    Authorize,

    History,
    HistoryInstance,

    Scan,
    Test,

    PipelineSetting,
    BasicInfo,
    DomainMessageNotice,
    DomainUser,
    DomainRole,

    Setting,

    SettingHome,

    Grouping,
    Env,
    Auth,
    Host,
    HostGroup,
    Server,
    Tool,
    Resources,
    Agent,

    MessageSendType,
    MessageNotice,
    MyLog,
    BackupRestore,

    User,
    UserGroup,
    Orga,
    Directory,
    SystemRole,
    Version,
    ProductAuth,

    UserGroupTrue,
    SystemFeature,
    SystemRoleTrue,
    ProjectRole,
    ProjectFeature,
    ProjectVirtualRole,
    MyTodoTask,
    Task,
    TodoTemp,
    TodoType,
    LogTemplate,
    LogType,
    MessageSendTypeTrue,
    MessageType,
    SystemMessageNotice,
    ProjectMessageNotice,

} from './ui';

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
                path:"/noaccess",
                component:NoAccess,
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
                        path:"/pipeline/:id/dyna",
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
                                path:"/pipeline/:id/set/message",
                                component: DomainMessageNotice,
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
                        path: "/setting/home",
                        component: SettingHome,
                        exact: true,
                    },
                    {
                        path: "/setting/orga",
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
                        path: "/setting/dir",
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
                        path:"/setting/agent",
                        component: Agent,
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
                        path: "/setting/project/vRole",
                        component: ProjectVirtualRole,
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
                        path:"/setting/systemNotice",
                        component: SystemMessageNotice,
                        exact: true,
                    },
                    {
                        path:"/setting/projectNotice",
                        component: ProjectMessageNotice,
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
        ]
    },
]

export default routers
