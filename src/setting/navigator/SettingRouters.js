import React from "react";
import {
    BarsOutlined,
    GroupOutlined,
    MenuOutlined,
    ProjectOutlined, SafetyCertificateOutlined,
    TeamOutlined,
} from "@ant-design/icons";

// 用户与部门路由
export const departmentRouters =[
    {
        id: "user",
        title: "用户与权限",
        icon: <TeamOutlined/>,
        children: [
            {
                id: "/setting/orga",
                title: "部门",
                purviewCode: "orga",
            },
            {
                id: "/setting/user",
                title: "用户",
                purviewCode: "user",
            },
            {
                id: "/setting/userGroup",
                title: "用户组",
                purviewCode: "user_group",
            },
            {
                id: "/setting/dir",
                title: "用户目录",
                purviewCode: "user_dir",
            },
            {
                id:"/setting/role",
                title:"权限",
                purviewCode:"pipeline_permission",
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
                id:"/setting/syr/feature",
                title:"系统功能",
            },
            {
                id:"/setting/roletrue",
                title:"系统角色",
            },
            {
                id:"/setting/project/feature",
                title:"项目功能",
            },
            {
                id:"/setting/project/role",
                title:"项目角色",
            },
            {
                id:"/setting/todoTask",
                title:"待办任务",
            },
            {
                id:"/setting/task",
                title:"待办事项",
            },
            {
                id:"/setting/todoTemp",
                title:"待办模板 ",
            },
            {
                id:"/setting/todoType",
                title:"待办类型 ",
            },
            {
                id:"/setting/logTemplate",
                title:"日志模板",
            },
            {
                id:"/setting/logType",
                title:"日志类型",
            },
            {
                id:"/setting/type",
                title:"消息类型",
            },
            {
                id:"/setting/sendtrue",
                title:"消息发送方式",
            },
            {
                id:"/setting/systemNotice",
                title:"系统消息通知方案",
            },
            {
                id:"/setting/projectNotice",
                title:"项目消息通知方案",
            },
            {
                id:"/setting/userGrouptrue",
                title:"用户组true",
            },
        ]
    }
]
