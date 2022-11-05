import React from "react";
import {TeamOutlined,BarsOutlined,BuildOutlined,AppstoreOutlined,ProjectOutlined,
    GroupOutlined,SoundOutlined,MergeCellsOutlined,SafetyCertificateOutlined,
    FileProtectOutlined,SwitcherOutlined,ProfileOutlined,LayoutOutlined,
    MenuOutlined,
} from "@ant-design/icons";

export const departmentRouter = [
    {
        key:"1",
        label: "成员与部门",
        enCode: "I",
        icon:<TeamOutlined />,
        children: [
            {
                key:"/index/system/dashbord",
                label:"部门",
                icon:<GroupOutlined />,
                enCode:"F",
            },
            {
                key:"/index/system/list",
                label:"用户",
                icon:<TeamOutlined />,
                enCode:"H",
            },
            {
                key:"/index/system/directory",
                label:"用户目录",
                icon:<BarsOutlined />,
                enCode:"G",
            },
        ]
    }
]

export const applicationRouter = [
    {
        key:"/index/system/role",
        label:"权限",
        icon: <SafetyCertificateOutlined />,
        enCode:"E",
    },
    {
        key:"/index/system/auth",
        label:"认证配置",
        icon:<SwitcherOutlined />,
        enCode:"F",
    },
    {
        key:2,
        label:"资源配置",
        icon:<FileProtectOutlined />,
        enCode:"I",
        children:[
            {
                key:"/index/system/resoure/server",
                label:"服务配置",
                icon:<FileProtectOutlined />,
                enCode:"I",
            },
            {
                key:"/index/system/resoure/host",
                label:"主机配置",
                icon:<FileProtectOutlined />,
                enCode:"I",
            },
        ]
    },
    {
        key:"/index/system/envi",
        label:"环境配置",
        icon:<BuildOutlined />,
        enCode:"J",
    },
    {
        key:"3",
        label: "消息",
        icon:<SoundOutlined/>,
        enCode: "I",
        children: [
            {
                key:"/index/system/mes/send",
                label: "消息类型",
                icon:<SoundOutlined />,
                enCode: "I",
            },
            {
                key:"/index/system/mes/management",
                label:"消息管理",
                icon:<SoundOutlined />,
                enCode:"I",
            },
        ]
    },
    {
        key:"/index/system/myTodoTask",
        label:"待办事项",
        icon:<ProfileOutlined />,
        enCode:"F",
    },
    {
        key:"/index/system/plugin",
        label:"插件",
        icon:<MergeCellsOutlined />,
        enCode:"G",
    },
    {
        key:"5",
        label:"安全",
        icon:<LayoutOutlined />,
        enCode:"I",
        children: [
            {
                key:"/index/system/myLog",
                label:"操作日志",
                icon:<LayoutOutlined />,
                enCode:"H",
            }
        ]
    },
    {
        key:"/index/system/info",
        label:"系统信息",
        icon:<AppstoreOutlined />,
        enCode:"H",
    },
]

export const templateRouter = [
    {
        key:"6",
        label:"基础数据",
        icon:<ProjectOutlined />,
        enCode:"E",
        children:[
            {
                key:"/index/system/syr/feature",
                label:"系统功能",
                icon:<MenuOutlined />,
                enCode:"E1",
            },
            {
                key:"/index/system/project/feature",
                label:"项目功能",
                icon:<MenuOutlined />,
                enCode:"I2",
            },
            {
                key:"/index/system/project/role",
                label:"项目角色",
                icon:<MenuOutlined />,
                enCode:"I",
            },
            {
                key:"/index/system/thirdAddress",
                label:"授权管理",
                icon:<MenuOutlined />,
                enCode:"I",
            },
            {
                key:"/index/system/task",
                label:"待办事项",
                icon:<MenuOutlined />,
                enCode:"J",
            },
            {
                key:"/index/system/todoTemp",
                label:"代办模板 ",
                icon:<MenuOutlined />,
                enCode:"F",
            },
            {
                key:"/index/system/logTemplate",
                label:"日志模板",
                icon:<MenuOutlined />,
                enCode:"H",
            },
            {
                key:"/index/system/mes/type",
                label:"消息类型管理",
                icon:<MenuOutlined />,
                enCode:"J",
            },
            {
                key:"/index/system/mes/template",
                label:"消息模板管理",
                icon:<MenuOutlined />,
                enCode:"J",
            },
        ]
    }
]