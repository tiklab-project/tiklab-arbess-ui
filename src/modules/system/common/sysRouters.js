import React from "react";
import {
    BarsOutlined,
    GroupOutlined,
    MenuOutlined,
    ProjectOutlined,
    TeamOutlined,
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