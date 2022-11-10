import React from "react";
import {TeamOutlined,BarsOutlined,BuildOutlined,AppstoreOutlined,ProjectOutlined,
    GroupOutlined,SoundOutlined,MergeCellsOutlined,SafetyCertificateOutlined,
    FileProtectOutlined,SwitcherOutlined,ProfileOutlined,LayoutOutlined,
    MenuOutlined,
} from "@ant-design/icons";

export const departmentRouter = [
    {
        id:"1",
        title: "成员与部门",
        purviewCode: "orga_user",
        icon:<TeamOutlined />,
        children: [
            {
                id:"/index/system/user/dashbord",
                title:"部门",
                icon:<GroupOutlined />,
                purviewCode:"orga",
            },
            {
                id:"/index/system/user/list",
                title:"用户",
                icon:<TeamOutlined />,
                purviewCode:"user",
            },
            {
                id:"/index/system/user/directory",
                title:"用户目录",
                icon:<BarsOutlined />,
                purviewCode:"user_dir",
            },
        ]
    }
]

export const applicationRouter = [
    {
        id:"/index/system/role",
        title:"权限",
        icon: <SafetyCertificateOutlined />,
        purviewCode:"permission",
    },
    {
        id:"/index/system/auth",
        title:"认证配置",
        icon:<SwitcherOutlined />,
        purviewCode:"auth",
    },
    {
        id:2,
        title:"资源配置",
        icon:<FileProtectOutlined />,
        purviewCode:"server",
        children:[
            {
                id:"/index/system/resoure/server",
                title:"服务配置",
                icon:<FileProtectOutlined />,
                purviewCode:"server",
            },
            {
                id:"/index/system/resoure/host",
                title:"主机配置",
                icon:<FileProtectOutlined />,
                purviewCode:"host",
            },
        ]
    },
    {
        id:"/index/system/envi",
        title:"环境配置",
        icon:<BuildOutlined />,
        purviewCode:"env",
    },
    {
        id:"3",
        title: "消息",
        icon:<SoundOutlined/>,
        purviewCode: "message",
        children: [
            {
                id:"/index/system/mes/send",
                title: "消息发送方式",
                icon:<SoundOutlined />,
                purviewCode: "message",
            },
            {
                id:"/index/system/mes/management",
                title:"消息管理",
                icon:<SoundOutlined />,
                purviewCode:"message",
            },
        ]
    },
    {
        id:"/index/system/myTodoTask",
        title:"待办事项",
        icon:<ProfileOutlined />,
        purviewCode:"todotask",
    },
    {
        id:"/index/system/plugin",
        title:"插件",
        icon:<MergeCellsOutlined />,
        purviewCode:"plugin",
    },
    {
        id:"5",
        title:"安全",
        icon:<LayoutOutlined />,
        purviewCode:"log",
        children: [
            {
                id:"/index/system/myLog",
                title:"操作日志",
                icon:<LayoutOutlined />,
                purviewCode:"log",
            }
        ]
    },
    {
        id:"/index/system/info",
        title:"系统信息",
        icon:<AppstoreOutlined />,
        purviewCode:"system",
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
                id:"/index/system/thirdAddress",
                title:"授权管理",
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
                id:"/index/system/logTemplate",
                title:"日志模板",
                icon:<MenuOutlined />,
                purviewCode:"basics",
            },
            {
                id:"/index/system/mes/type",
                title:"消息类型管理",
                icon:<MenuOutlined />,
                purviewCode:"basics",
            },
            {
                id:"/index/system/mes/template",
                title:"消息模板管理",
                icon:<MenuOutlined />,
                purviewCode:"basics",
            },
        ]
    }
]