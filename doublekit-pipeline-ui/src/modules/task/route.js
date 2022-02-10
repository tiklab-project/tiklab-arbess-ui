import React from 'react'
import {
    ClockCircleOutlined,
    DiffOutlined,
    LeftOutlined,
    PlayCircleOutlined,
    SettingOutlined,
    ToolOutlined
} from "@ant-design/icons";

export const  taskRouters=[
    {
        to:'/home/pipeline',
        title:"返回流水线",
        icon:<LeftOutlined />,
    },
    {
        to:'/home/task/work',
        title:"工作空间",
        icon:<DiffOutlined />,
    },
    {
        to:"/home/task/structure",
        title: "开始构建",
        icon:<PlayCircleOutlined />,
    },
    {
        to:'/home/task/config',
        title: "配置",
        icon: <ToolOutlined />,
    },
    {
        to:'/home/task/history',
        title:"构建历史",
        icon:<ClockCircleOutlined />,
    },
    {
        to:'/home/task/assembly',
        title: "流水线设置",
        icon:<SettingOutlined />,
    }
]