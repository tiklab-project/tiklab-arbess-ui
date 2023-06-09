import React from "react";
import {
    AppstoreOutlined,
    BuildOutlined,
    FileProtectOutlined,
    LayoutOutlined,
    MergeCellsOutlined,
    SafetyCertificateOutlined,
    SoundOutlined,
    SwitcherOutlined,
    VerifiedOutlined,
    AuditOutlined,
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
            id:"/index/system/role",
            title:"权限",
            icon: <SafetyCertificateOutlined />,
            purviewCode:"pipeline_permission",
        },
        {
            id:"2",
            title: "消息",
            icon:<SoundOutlined/>,
            children: [
                {
                    id:"/index/system/notice",
                    title:"消息通知方案",
                    icon:<SoundOutlined />,
                    purviewCode:"message_setting",
                },
                {
                    id:"/index/system/send",
                    title: "消息发送方式",
                    icon:<SoundOutlined />,
                    purviewCode: "message_type",
                },
            ]
        },
        {
            id:"/index/system/auth",
            title:"认证配置",
            icon:<SwitcherOutlined />,
            purviewCode:"pipeline_auth",
        },
        {
            id:"3",
            title:"资源配置",
            icon:<FileProtectOutlined />,
            children:[
                {
                    id:"/index/system/server",
                    title:"服务配置",
                    icon:<FileProtectOutlined />,
                    purviewCode:"resources_server",
                },
                {
                    id:"/index/system/host",
                    title:"主机配置",
                    icon:<FileProtectOutlined />,
                    purviewCode:"resources_host",
                },
            ]
        },
        {
            id:"/index/system/envi",
            title:"环境配置",
            icon:<BuildOutlined />,
            purviewCode:"pipeline_env",
        },
        {
            id:"/index/system/resources",
            title:"资源占用",
            icon:<FileProtectOutlined />,
            purviewCode:"pipeline_resources",
        },
        {
            id:"/index/system/plugin",
            title:"插件",
            icon:<MergeCellsOutlined />,
            purviewCode:"pipeline_plugin",
        },
        {
            id:"5",
            title:"安全",
            icon:<LayoutOutlined />,
            children: [
                {
                    id:"/index/system/myLog",
                    title:"操作日志",
                    icon:<LayoutOutlined />,
                    purviewCode:"pipeline_log",
                }
            ]
        },
        {
            id:"/index/system/version",
            title:"版本与许可证",
            icon:<VerifiedOutlined />,
            purviewCode:"pipeline_version",
        },
        {
            id:"/index/system/info",
            title:"系统信息",
            icon:<AppstoreOutlined />,
            purviewCode:"pipeline_system",
        },
    ]

    return  <SystemContent
                {...props}
                isDepartment={true}
                applicationRouters={applicationRouters}
            />
}

export default Setting
