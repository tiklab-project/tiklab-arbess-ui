import React from "react";
import {LeftOutlined,
        PlayCircleOutlined,
        DiffOutlined,
        SettingOutlined,
        ClockCircleOutlined,
        ToolOutlined} from "@ant-design/icons";
import WorkTask from "../pages/work";
import StructureTask from "../pages/structure";
import ConfigTask from "../pages/config";
import HistoryTask from "../pages/history";
import AssemblyTask from "../pages/assembly";
import BuildTask from "../pages/history_build";
import PastRecordsTask from "../pages/config_pastRecords";

export const taskRouter=[
    {
        path:"/pipeline",
        title:"返回流水线",
        icon:<LeftOutlined />,
        isShow:true
    },
    {
        path:"/task/work",
        title:"工作空间",
        icon:<DiffOutlined />,
        component:WorkTask,
        isShow:true
    },
    {
        path:"/task/structure",
        title: "开始构建",
        icon:<PlayCircleOutlined />,
        component: StructureTask,
        isShow:true
    },
    {
        path:"/task/config",
        title: "配置",
        icon: <ToolOutlined />,
        component: ConfigTask,
        isShow:true

    },
    {
        path:"/task/history",
        title:"构建历史",
        icon:<ClockCircleOutlined />,
        component: HistoryTask,
        isShow:true
    },
    {
        path:"/task/assembly",
        title: "流水线设置",
        icon:<SettingOutlined />,
        component: AssemblyTask,
        isShow:true
    },
    {
        path:"/task/build",
        component: BuildTask,
        isShow:false
    },
    {
        path:"/task/post",
        component: PastRecordsTask,
        isShow:false
    }
]