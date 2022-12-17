import React from "react";
import {
    AppstoreOutlined,
    BarsOutlined,
    BuildOutlined,
    FileProtectOutlined,
    GroupOutlined,
    LayoutOutlined,
    MenuOutlined,
    MergeCellsOutlined,
    ProfileOutlined,
    ProjectOutlined,
    SafetyCertificateOutlined,
    SoundOutlined,
    SwitcherOutlined,
    TeamOutlined,
    VerifiedOutlined
} from "@ant-design/icons";

export const departmentRouters = a =>{
    return [
        {
            id: "1",
            title: "用户与部门",
            purviewCode: a[0],
            icon: <TeamOutlined/>,
            children: [
                {
                    id: "/index/system/user/dashbord",
                    title: "部门",
                    icon: <GroupOutlined/>,
                    purviewCode: "orga",
                },
                {
                    id: "/index/system/user/list",
                    title: "用户",
                    icon: <TeamOutlined/>,
                    purviewCode: "user",
                },
                {
                    id: "/index/system/user/directory",
                    title: "用户目录",
                    icon: <BarsOutlined/>,
                    purviewCode: "user_dir",
                },
            ]
        }
    ]
}

export const departmentUnifyRouters = a =>{
    return [
        {
            id: "/setting/orga",
            title: "用户与部门",
            purviewCode: a[0],
            icon: <TeamOutlined/>,
        }
    ]
}

export const applicationRouters = a =>{
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

export const applicationRouter = [
    {
        id:"/index/system/role",
        title:"权限",
        icon: <SafetyCertificateOutlined />,
        purviewCode:"pipeline_permission",
    },
    {
        id:"/index/system/auth",
        title:"认证配置",
        icon:<SwitcherOutlined />,
        purviewCode:"pipeline_auth",
    },
    {
        id:2,
        title:"资源配置",
        icon:<FileProtectOutlined />,
        purviewCode:"resources_host",
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
        id:"3",
        title: "消息",
        icon:<SoundOutlined/>,
        purviewCode: "message",
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
        id:"/index/system/plugin",
        title:"插件",
        icon:<MergeCellsOutlined />,
        purviewCode:"pipeline_plugin",
    },
    {
        id:"5",
        title:"安全",
        icon:<LayoutOutlined />,
        purviewCode:"pipeline_log",
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

export const templateRouter = [
    {
        id:"6",
        title:"基础数据",
        icon:<ProjectOutlined />,
        purviewCode:"basics",
        children:[
            {
                id:"/index/system/syr/feature",
                title:"系统功能",
                icon:<MenuOutlined />,
                purviewCode:"basics",
            },
            {
                id:"/index/system/roletrue",
                title:"系统角色",
                icon: <MenuOutlined />,
                purviewCode:"basics",
            },
            {
                id:"/index/system/project/feature",
                title:"项目功能",
                icon:<MenuOutlined />,
                purviewCode:"basics",
            },
            {
                id:"/index/system/project/role",
                title:"项目角色",
                icon:<MenuOutlined />,
                purviewCode:"basics",
            },
            {
                id:"/index/system/todoTask",
                title:"待办任务",
                icon:<MenuOutlined />,
                purviewCode:"basics",
            },
            {
                id:"/index/system/task",
                title:"待办事项",
                icon:<MenuOutlined />,
                purviewCode:"basics",
            },
            {
                id:"/index/system/todoTemp",
                title:"代办模板 ",
                icon:<MenuOutlined />,
                purviewCode:"basics",
            },
            {
                id:"/index/system/todoType",
                title:"代办类型 ",
                icon:<MenuOutlined />,
                purviewCode:"basics",
            },
            {
                id:"/index/system/logTemplate",
                title:"日志模板",
                icon:<MenuOutlined />,
                purviewCode:"basics",
            },
            {
                id:"/index/system/logType",
                title:"日志类型",
                icon:<MenuOutlined />,
                purviewCode:"basics",
            },
            {
                id:"/index/system/mes/management",
                title:"消息管理",
                icon:<MenuOutlined />,
                purviewCode:"basics",
            },
            {
                id:"/index/system/mes/type",
                title:"消息类型",
                icon:<MenuOutlined />,
                purviewCode:"basics",
            },
            {
                id:"/index/system/mes/sendtrue",
                title:"消息通知类型",
                icon:<MenuOutlined />,
                purviewCode:"basics",
            },
            {
                id:"/index/system/mes/noticetrue",
                title:"通知方案",
                icon:<MenuOutlined />,
                purviewCode:"basics",
            },
        ]
    }
]