import React from "react";
import {Redirect} from "react-router-dom";

import {
    Index,
    Login,
    LoginRpw,
    Logout,
    ExcludeProductUser,
    SysException,
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

    Test,
    TestSpotbugs,
    TestSonarQube,
    TestHubo,
    TestMaven,

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
    Tool,
    Resources,
    Agent,
    Server,
    K8s,

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

    OpenApi,
    OpenApiDoc,

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
        component: LoginRpw,
        exact:true,
        path: '/loginRpw'
    },
    {
        path:"/logout",
        component:Logout,
    },
    {
        path:"/noAuth",
        exact:true,
        component:ExcludeProductUser,
    },
    {
        path:"/500",
        exact:true,
        component:SysException,
    },
    {
        path:"/openApi",
        component: OpenApiDoc,
        exact: true,
    },
    {
        path:"/",
        component: Index,
        routes:[
            {
                path: "/index",
                component: HomePage,
                exact:true,
            },
            {
                path:"/pipeline",
                component:Pipeline,
                exact: true,
            },
            {
                path:"/pipelineAdd",
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
                        path:"/pipeline/:id/overview",
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
                        routes:[
                            {
                                path:"/pipeline/:id/test/spotbugs",
                                component: TestSpotbugs,
                                exact: true,
                            },
                            {
                                path:"/pipeline/:id/test/sonar",
                                component: TestSonarQube,
                                exact: true,
                            },
                            {
                                path:"/pipeline/:id/test/testHubo",
                                component: TestHubo,
                                exact: true,
                            },
                            {
                                path:"/pipeline/:id/test/maven",
                                component: TestMaven,
                                exact: true,
                            },
                        ]
                    },
                    {
                        path:"/pipeline/:id/setting",
                        component: PipelineSetting,
                        routes:[
                            {
                                path:"/pipeline/:id/setting/role",
                                component: DomainRole,
                                exact: true,
                            },
                            {
                                path:"/pipeline/:id/setting/info",
                                component: BasicInfo,
                                exact: true,
                            },
                            {
                                path:"/pipeline/:id/setting/user",
                                component: DomainUser,
                                exact: true,
                            },
                            {
                                path:"/pipeline/:id/setting/message",
                                component: DomainMessageNotice,
                                exact: true,
                            }
                        ]
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
                        path: "/setting/server",
                        component: Server,
                        exact: true,
                    },
                    {
                        path: "/setting/k8s",
                        component: K8s,
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
                        path:"/setting/openApi",
                        component: OpenApi,
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
                ]
            },
            {
                path:"/",
                render:()=><Redirect to="/index"/>,
            },
        ]
    },
]

export default routers
