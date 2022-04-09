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
        title:'返回流水线',
        icon:<LeftOutlined />,
        key:'1'
    },
    {
        to:'/home/task/work',
        title:'工作空间',
        icon:<DiffOutlined />,
        key:'2'
    },
    {
        to:"/home/task/structure",
        title: '开始构建',
        icon:<PlayCircleOutlined />,
        key:'3'
    },
    {
        to:'/home/task/config',
        title: '配置',
        icon: <ToolOutlined />,
        key:'4'
    },
    {
        to:'/home/task/history',
        title:'构建历史',
        icon:<ClockCircleOutlined />,
        key:'5'
    },
    {
        to:'/home/task/assembly',
        title: '流水线设置',
        icon:<SettingOutlined />,
        key:'6'
    },
    {
        to:'/home/task/aa',
        title: 'aa',
        icon:<SettingOutlined />,
        key:'7'
    }
]