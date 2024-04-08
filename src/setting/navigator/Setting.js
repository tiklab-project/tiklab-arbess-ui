import React from "react";
import {
    FileProtectOutlined,
    LayoutOutlined,
    MergeCellsOutlined,
    SafetyCertificateOutlined,
    SoundOutlined,
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
            id:"configure",
            title:"流水线配置",
            icon:<DeploymentUnitOutlined />,
            children:[
                {
                    id:"/setting/grouping",
                    title:"分组",
                },
                {
                    id:"/setting/env",
                    title:"环境",
                },
                {
                    id:"/setting/host",
                    title:"主机",
                    purviewCode:"resources_host",
                },
                {
                    id:"/setting/hostGroup",
                    title:"主机组",
                },
                {
                    id:"/setting/auth",
                    title:"认证",
                    purviewCode:"pipeline_auth",
                },
                {
                    id:"/setting/tool",
                    title:"工具",
                    purviewCode:"pipeline_env",
                },
            ]
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
