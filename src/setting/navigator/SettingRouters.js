import React from "react";
import {
    BarsOutlined,
    GroupOutlined,
    MenuOutlined,
    ProjectOutlined,
    TeamOutlined,
} from "@ant-design/icons";

// 用户与部门路由
export const departmentRouters =[
    {
        id: "user",
        title: "用户与部门",
        icon: <TeamOutlined/>,
        children: [
            {
                id: "/index/system/org",
                title: "部门",
                icon: <GroupOutlined/>,
                purviewCode: "orga",
            },
            {
                id: "/index/system/list",
                title: "用户",
                icon: <TeamOutlined/>,
                purviewCode: "user",
            },
            {
                id: "/index/system/userGroup",
                title: "用户组",
                icon: <TeamOutlined/>,
                purviewCode: "user_group",
            },
            {
                id: "/index/system/directory",
                title: "用户目录",
                icon: <BarsOutlined/>,
                purviewCode: "user_dir",
            },
        ]
    }
]

// 基础数据路由
export const templateRouter = [
    {
        id:"base",
        title:"基础数据",
        icon:<ProjectOutlined />,
        children:[
            {
                id:"/index/system/syr/feature",
                title:"系统功能",
                icon:<MenuOutlined />,
            },
            {
                id:"/index/system/roletrue",
                title:"系统角色",
                icon: <MenuOutlined />,
            },
            {
                id:"/index/system/project/feature",
                title:"项目功能",
                icon:<MenuOutlined />,
            },
            {
                id:"/index/system/project/role",
                title:"项目角色",
                icon:<MenuOutlined />,
            },
            {
                id:"/index/system/todoTask",
                title:"待办任务",
                icon:<MenuOutlined />,
            },
            {
                id:"/index/system/task",
                title:"待办事项",
                icon:<MenuOutlined />,
            },
            {
                id:"/index/system/todoTemp",
                title:"代办模板 ",
                icon:<MenuOutlined />,
            },
            {
                id:"/index/system/todoType",
                title:"代办类型 ",
                icon:<MenuOutlined />,
            },
            {
                id:"/index/system/logTemplate",
                title:"日志模板",
                icon:<MenuOutlined />,
            },
            {
                id:"/index/system/logType",
                title:"日志类型",
                icon:<MenuOutlined />,
            },
            {
                id:"/index/system/management",
                title:"消息管理",
                icon:<MenuOutlined />,
            },
            {
                id:"/index/system/type",
                title:"消息类型",
                icon:<MenuOutlined />,
            },
            {
                id:"/index/system/sendtrue",
                title:"消息通知类型",
                icon:<MenuOutlined />,
            },
            {
                id:"/index/system/noticetrue",
                title:"通知方案",
                icon:<MenuOutlined />
            },
            {
                id:"/index/system/userGrouptrue",
                title:"用户组true",
                icon:<MenuOutlined />
            },
        ]
    }
]
