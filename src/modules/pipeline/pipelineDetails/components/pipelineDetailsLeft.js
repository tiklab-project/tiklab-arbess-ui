import React, {useEffect, useState} from "react";
import {withRouter} from "react-router-dom";
import './pipelineDetailsLeft.scss'
import {
    ClockCircleOutlined,
    DiffOutlined,
    ClusterOutlined,
    PlayCircleOutlined,
    SettingOutlined,
    ToolOutlined
} from "@ant-design/icons";
import {Dropdown} from 'antd'
import PipelineDetailsLeftOpt from "./pipelineDetailsLeftOpt";

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

const PipelineDetailsLeft = props =>{

    const {pipelineList,visible,setVisible,isPrompt,setIsPrompt,setPipeline} = props

    const [nav,setNav] = useState('')
    const path = props.location.pathname

    useEffect(()=>{
        setNav(path)
    },[path])

    const changeNav = item=>{
        props.history.push(item.to)
    }

    return(
         <div className='aside'>
            <ul  className='content'>
                <li
                    onClick={()=>setVisible(!visible)}
                    onBlur={()=>setVisible(false)}
                    className='aside_content'
                    style={{padding:10}}
                >
                    <Dropdown overlay={
                        <PipelineDetailsLeftOpt
                            pipelineList={pipelineList}
                            setVisible={setVisible}
                            isPrompt={isPrompt}
                            setIsPrompt={setIsPrompt}
                            setPipeline={setPipeline}
                        />}
                        visible={visible}
                        id='liOne'
                    >
                        <ClusterOutlined id='liIcon' style={{fontSize:18,padding:10}}/>
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
                                <div className='aside_content_icon'>{item.icon}</div>
                                <div className='aside_content_title'>{item.title}</div>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default withRouter(PipelineDetailsLeft)