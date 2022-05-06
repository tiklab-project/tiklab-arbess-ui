import React, { useState } from "react";
import {withRouter} from "react-router-dom";
import './pipelineDetails_left.scss'
import {
    ClockCircleOutlined,
    DiffOutlined,
    ClusterOutlined,
    PlayCircleOutlined,
    SettingOutlined,
    ToolOutlined
} from "@ant-design/icons";
import {Dropdown} from 'antd'
import PipelineDetails_leftOpt from "./pipelineDetails_leftOpt";

const  taskRouters=[
    {
        to:'/home/task/work',
        title:'工作空间',
        icon:<DiffOutlined />,
        key:'2'
    },
    {
        to:'/home/task/config',
        title: '配置',
        icon: <ToolOutlined />,
        key:'3'
    },
    {
        to:"/home/task/structure",
        title: '历史',
        icon:<ClockCircleOutlined />,
        key:'4'
    },
    {
        to:'/home/task/assembly',
        title: '设置',
        icon:<SettingOutlined />,
        key:'5'
    }
]

const PipelineDetails_left = props =>{

    const {pipelineList} = props
    const [nav,setNav] = useState(props.location.pathname)
    const [visible,setVisible] = useState(false)
    const changeNav = item=>{
        setNav(item.to)
        props.history.push(item.to)
    }

    return(
       <div className='aside'>
            <ul  className='content'>
                <li
                    className='aside_content'
                    style={{padding:10}}
                    onClick={()=>{}}
                >
                    <Dropdown overlay={
                        <PipelineDetails_leftOpt
                            pipelineList={pipelineList}
                            setVisible={setVisible}
                        />}
                        visible={visible}
                    >
                        <ClusterOutlined
                            // onBlur = {()=>setVisible(false)}
                            onClick = {()=>setVisible(!visible)}
                            style={{fontSize:18,padding:10}}
                        />
                    </Dropdown>
                </li>
            
                {
                    taskRouters && taskRouters.map(item=>{
                        return(
                            <li
                                className={nav===item.to ? 'aside_content aside_link' : 'aside_content'}
                                key={item.key}
                                onClick={()=>changeNav(item)}
                            >
                                <div className='aisde_icon'>{item.icon}</div>
                                <div className='aisde_title'>{item.title}</div>
                            </li>
                        )
                    })
                }
        </ul>

       </div>
    )
}

export default withRouter(PipelineDetails_left)