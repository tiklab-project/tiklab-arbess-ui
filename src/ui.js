import {store as pipelineStore} from "./store";
import App from "./app";
import Portal from "./common/layout/Portal";
import SettingAside from "./common/component/aside/SettingAside";
import PipelineSetAside from "./common/component/aside/PipelineSetAside";
import AsyncComponent from "./common/lazy/SyncComponent";

const Index=AsyncComponent(()=>import("./common/layout/Layout"))

const Login=AsyncComponent(()=>import("./login/Login"))
const LoginRpw=AsyncComponent(()=>import("./login/LoginRpw"))
const SysException=AsyncComponent(()=>import("./login/SysException"))

const Logout=AsyncComponent(()=>import("./login/Logout"))
const ExcludeProductUser=AsyncComponent(()=>import("./login/ExcludeProductUser"))
const NotFound=AsyncComponent(()=>import("./login/NotFound"))

const NoAccess=AsyncComponent(()=>import("./setting/privilege/NoAccess"))

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
const Dynamic=AsyncComponent(()=>import("./pipeline/overview/components/Dynamic"))
const Design=AsyncComponent(()=>import("./pipeline/design/navigator/Design"))
const DesignProcess=AsyncComponent(()=>import("./pipeline/design/processDesign/gui/component/Gui"))
const DesignTrigger=AsyncComponent(()=>import("./pipeline/design/trigger/components/Trigger"))
const DesignVariable=AsyncComponent(()=>import("./pipeline/design/variable/components/Variable"))
const DesignPostprocess=AsyncComponent(()=>import("./pipeline/design/postprocess/components/Postprocess"))
const Authorize=AsyncComponent(()=>import("./pipeline/authorize/Authorize"))
const History=AsyncComponent(()=>import("./pipeline/history/components/History"))
const HistoryInstance=AsyncComponent(()=>import("./pipeline/history/components/HistoryInstance"))
const Test=AsyncComponent(()=>import("./pipeline/test/navigator/Test"))
const TestHubo=AsyncComponent(()=>import("./pipeline/test/testhubo/component/TestHubo"))
const TestMaven=AsyncComponent(()=>import("./pipeline/test/maven/component/TestMaven"))
const TestScan=AsyncComponent(()=>import("./pipeline/test/scan/component/Scan"))
const PipelineSetting=AsyncComponent(()=>import("./pipeline/setting/navigator/PipelineSetting"))
const BasicInfo=AsyncComponent(()=>import("./pipeline/setting/basicInfo/BasicInfo"))
const Statistics=AsyncComponent(()=>import("./pipeline/statistics/navigator/Statistics"))
const StatisticsOperate=AsyncComponent(()=>import("./pipeline/statistics/operate/Operate"))
const StatisticsResult=AsyncComponent(()=>import("./pipeline/statistics/result/Result"))

/**
 * 系统设置
 */
const Setting=AsyncComponent(()=>import("./setting/navigator/Setting"))
const SettingHome=AsyncComponent(()=>import("./setting/home/component/SettingHome"))
const Auth=AsyncComponent(()=>import("./setting/configure/auth/components/Auth"))
const Host=AsyncComponent(()=>import("./setting/configure/host/component/Host"))
const HostGroup=AsyncComponent(()=>import("./setting/configure/host/component/HostGroup"))
const Tool=AsyncComponent(()=>import("./setting/configure/tool/components/Tool"))
const Resources=AsyncComponent(()=>import("./setting/resources/component/Resources"))
const Grouping=AsyncComponent(()=>import("./setting/configure/grouping/component/Grouping"))
const Env=AsyncComponent(()=>import("./setting/configure/env/component/Env"))
const Agent=AsyncComponent(()=>import('./setting/configure/agent/component/Agent'))
const Server=AsyncComponent(()=>import("./setting/server/components/Server"))
const K8s=AsyncComponent(()=>import('./setting/configure/k8s/components/K8s'))

// message
const MessageSendType=AsyncComponent(()=>import("./setting/message/MessageSendType"))
const MessageNotice=AsyncComponent(()=>import("./setting/message/MessageNotice"))
const DomainMessageNotice=AsyncComponent(()=>import("./setting/message/DomainMessageNotice"))

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

// licence
const Version=AsyncComponent(()=>import("./setting/licence/Version"))
const ProductAuth=AsyncComponent(()=>import("./setting/licence/ProductAuth"))

// base
const UserGroupTrue=AsyncComponent(()=>import("./setting/base/user/Groupture"))
const SystemFeature=AsyncComponent(()=>import("./setting/base/privilege/SystemFeature"))
const SystemRoleTrue=AsyncComponent(()=>import("./setting/base/privilege/SystemRoleTrue"))
const ProjectRole=AsyncComponent(()=>import("./setting/base/privilege/ProjectRole"))
const ProjectFeature=AsyncComponent(()=>import("./setting/base/privilege/ProjectFeature"))
const ProjectVirtualRole=AsyncComponent(()=>import("./setting/base/privilege/ProjectVirtualRole"))

const MyTodoTask=AsyncComponent(()=>import("./setting/base/message/MyTodoTask"))
const Task=AsyncComponent(()=>import("./setting/base/message/Task"))
const TodoTemp=AsyncComponent(()=>import("./setting/base/message/TodoTemp"))
const TodoType=AsyncComponent(()=>import("./setting/base/message/TodoType"))

const LogTemplate=AsyncComponent(()=>import("./setting/base/log/LogTemplate"))
const LogType=AsyncComponent(()=>import("./setting/base/log/LogType"))

const MessageSendTypeTrue=AsyncComponent(()=>import("./setting/base/message/MessageSendType"))
const MessageType=AsyncComponent(()=>import("./setting/base/message/MessageType"))
const SystemMessageNotice=AsyncComponent(()=>import("./setting/base/message/SystemMessageNotice"))
const ProjectMessageNotice=AsyncComponent(()=>import("./setting/base/message/ProjectMessageNotice"))



export {
    AsyncComponent,

    pipelineStore,
    App,
    Portal,
    SettingAside,
    PipelineSetAside,

    Index,
    Login,
    LoginRpw,
    SysException,
    Logout,
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

    Test,
    TestScan,
    TestHubo,
    TestMaven,

    Statistics,
    StatisticsOperate,
    StatisticsResult,

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
}


