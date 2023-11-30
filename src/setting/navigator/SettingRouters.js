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
                purviewCode: "orga",
            },
            {
                id: "/index/system/list",
                title: "用户",
                purviewCode: "user",
            },
            {
                id: "/index/system/userGroup",
                title: "用户组",
                purviewCode: "user_group",
            },
            {
                id: "/index/system/directory",
                title: "用户目录",
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
            },
            {
                id:"/index/system/roletrue",
                title:"系统角色",
            },
            {
                id:"/index/system/project/feature",
                title:"项目功能",
            },
            {
                id:"/index/system/project/role",
                title:"项目角色",
            },
            {
                id:"/index/system/todoTask",
                title:"待办任务",
            },
            {
                id:"/index/system/task",
                title:"待办事项",
            },
            {
                id:"/index/system/todoTemp",
                title:"待办模板 ",
            },
            {
                id:"/index/system/todoType",
                title:"待办类型 ",
            },
            {
                id:"/index/system/logTemplate",
                title:"日志模板",
            },
            {
                id:"/index/system/logType",
                title:"日志类型",
            },
            {
                id:"/index/system/management",
                title:"消息管理",
            },
            {
                id:"/index/system/type",
                title:"消息类型",
            },
            {
                id:"/index/system/sendtrue",
                title:"消息通知类型",
            },
            {
                id:"/index/system/noticetrue",
                title:"通知方案",
            },
            {
                id:"/index/system/userGrouptrue",
                title:"用户组true",
            },
        ]
    }
]
