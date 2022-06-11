import React from "react";
import { Menu } from 'antd';
import {Link,withRouter} from "react-router-dom";
import './pipelineDetailsAside.scss'
import {
    ClockCircleOutlined,
    DiffOutlined,
    LeftOutlined,
    PlayCircleOutlined,
    SettingOutlined,
    ToolOutlined
} from "@ant-design/icons";

const  taskRouters=[
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
    }
]


const PipelineDetailsAside= props=>{

    let path=props.location.pathname
    if(path==='/home/task/build'){
        path='/home/task/history'
    }else if(path==='/home/task/post'){
        path='/home/task/config'
    }

    return(
        <Menu
            style={{ width: 200,height:'100%' }}
            selectedKeys={[path]}
            mode="inline"
        >
            {
                taskRouters  && taskRouters.map(item=>{
                    return(
                        <Menu.Item key={item.to} icon={item.icon}>
                            <Link to={item.to}>
                                {item.title}
                            </Link>
                        </Menu.Item>
                    )
                })
            }
        </Menu>
    )
}

export default withRouter(PipelineDetailsAside)
