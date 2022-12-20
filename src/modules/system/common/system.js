import React from "react";
import SystemContent from "./systemContent";
import {
    AppstoreOutlined,
    BuildOutlined,
    FileProtectOutlined,
    LayoutOutlined,
    MergeCellsOutlined,
    SafetyCertificateOutlined,
    SoundOutlined,
    SwitcherOutlined,
    VerifiedOutlined
} from "@ant-design/icons";

const System = props =>{

    const applicationRouters = a =>{
        return [
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
                purviewCode: a[2],
                children: [
                    {
                        id:"/index/system/mes/notice",
                        title:"消息通知方案",
                        icon:<SoundOutlined />,
                        purviewCode:"message_setting",
                    },
                    {
                        id:"/index/system/mes/send",
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
                id:3,
                title:"资源配置",
                icon:<FileProtectOutlined />,
                purviewCode:a[1],
                children:[
                    {
                        id:"/index/system/resoure/server",
                        title:"服务配置",
                        icon:<FileProtectOutlined />,
                        purviewCode:"resources_server",
                    },
                    {
                        id:"/index/system/resoure/host",
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
                id:"/index/system/plugin",
                title:"插件",
                icon:<MergeCellsOutlined />,
                purviewCode:"pipeline_plugin",
            },
            {
                id:"5",
                title:"安全",
                icon:<LayoutOutlined />,
                purviewCode:a[3],
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
    }

    return  <SystemContent
                {...props}
                isDepartment={true}
                applicationRouters={applicationRouters}
            />
}

export default System