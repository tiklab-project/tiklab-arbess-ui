import React from "react";
import {
    BuildOutlined,
    FileProtectOutlined,
    LayoutOutlined,
    MergeCellsOutlined,
    SafetyCertificateOutlined,
    SoundOutlined,
    SwitcherOutlined,
    VerifiedOutlined,
    SaveOutlined,
    DeploymentUnitOutlined,
    MacCommandOutlined
} from "@ant-design/icons";
import SystemContent from "./SettingContent";

/**
 * 系统设置页面
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Setting = props =>{

    const applicationRouters =  [
        {
            id:"/setting/role",
            title:"权限",
            icon: <SafetyCertificateOutlined />,
            purviewCode:"pipeline_permission",
        },
        {
            id:"message",
            title: "消息",
            icon:<SoundOutlined/>,
            children: [
                {
                    id:"/setting/notice",
                    title:"消息通知方案",
                    purviewCode:"message_setting",
                },
                {
                    id:"/setting/send",
                    title: "消息发送方式",
                    purviewCode: "message_type",
                },
            ]
        },
        {
            id:"/setting/grouping",
            title:"分组管理",
            icon:<DeploymentUnitOutlined />,
        },
        {
            id:"/setting/env",
            title:"环境管理",
            icon:<SaveOutlined />,
        },
        {
            id:"resources",
            title:"主机管理",
            icon:<FileProtectOutlined />,
            children:[
                {
                    id:"/setting/hostGroup",
                    title:"主机组",
                },
                {
                    id:"/setting/host",
                    title:"主机配置",
                    purviewCode:"resources_host",
                },
            ]
        },
        {
            id:"/setting/auth",
            title:"认证配置",
            icon:<SwitcherOutlined />,
            purviewCode:"pipeline_auth",
        },
        {
            id:"/setting/tool",
            title:"工具配置",
            icon:<BuildOutlined />,
            purviewCode:"pipeline_env",
        },
        {
            id:"/setting/server",
            title:"服务集成",
            icon:<MacCommandOutlined />,
            purviewCode:"resources_server",
        },
        {
            id:"/setting/resources",
            title:"资源监控",
            icon:<FileProtectOutlined />,
            purviewCode:"pipeline_resources",
        },
        {
            id:"/setting/plugin",
            title:"插件",
            icon:<MergeCellsOutlined />,
            purviewCode:"pipeline_plugin",
        },
        {
            id:"security",
            title:"安全",
            icon:<LayoutOutlined />,
            children: [
                {
                    id:"/setting/backups",
                    title:"备份与恢复",
                    purviewCode:"restore",
                },
                {
                    id:"/setting/myLog",
                    title:"操作日志",
                    purviewCode:"pipeline_log",
                }
            ]
        },
        {
            id:"licence",
            title:"应用",
            icon:<LayoutOutlined />,
            children: [
                {
                    id:'/setting/version',
                    title: '版本与许可证',
                    purviewCode:'version',
                },
                {
                    id:'/setting/productAuth',
                    title: '应用访问权限',
                },
            ]
        },
    ]

    return  <SystemContent
                {...props}
                isDepartment={true}
                applicationRouters={applicationRouters}
            />
}

export default Setting
