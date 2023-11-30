import {store as pipelineStore} from "./store";
import App from "./app";
import Portal from "./home/components/Portal";
import SettingContent from "./setting/navigator/SettingContent";

import AsyncComponent from "./common/lazy/SyncComponent";

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
const PipelineSetting=AsyncComponent(()=>import("./pipeline/setting/navigator/PipelineSetting"))
const BasicInfo=AsyncComponent(()=>import("./pipeline/setting/basicInfo/BasicInfo"))
const Authorize=AsyncComponent(()=>import("./pipeline/authorize/Authorize"))
const Dynamic=AsyncComponent(()=>import("./pipeline/overview/components/Dynamic"))
const History=AsyncComponent(()=>import("./pipeline/history/components/History"))
const HistoryInstance=AsyncComponent(()=>import("./pipeline/history/components/HistoryInstance"))
const Test=AsyncComponent(()=>import("./pipeline/test/component/Test"))

const Scan=AsyncComponent(()=>import("./pipeline/scan/component/Scan"))

/**
 * 系统设置
 */
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
const BackupRecovery=AsyncComponent(()=>import("./setting/security/BackupRecovery"))

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

export {
    pipelineStore,
    App,
    Portal,
    SettingContent,
    AsyncComponent,

    Login,
    Logout,
    Wechat,
    ExcludeProductUser,
    Dynamic,
    HomePage,
    Pipeline,
    PipelineAdd,
    PipelineDetails,
    Overview,
    Design,
    DesignProcess,
    DesignTrigger,
    DesignVariable,
    DesignPostprocess,
    PipelineSetting,
    BasicInfo,
    Authorize,
    History,
    HistoryInstance,
    Test,
    Scan,
    DomainUser,
    DomainRole,

    Grouping,
    Env,
    Auth,
    Host,
    HostGroup,
    Server,
    Tool,
    Resources,

    Plugin,
    MessageSendType,
    MessageNotice,
    MyLog,
    BackupRecovery,

    User,
    UserGroup,
    Orga,
    Directory,
    SystemRole,
    NotFound,
    Version,

    UserGroupTrue,
    SystemFeature,
    SystemRoleTrue,
    ProjectRole,
    ProjectFeature,
    MyTodoTask,
    Task,
    TodoTemp,
    TodoType,
    LogTemplate,
    LogType,
    MessageManagement,
    MessageNoticeTrue,
    MessageSendTypeTrue,
    MessageType,
}


