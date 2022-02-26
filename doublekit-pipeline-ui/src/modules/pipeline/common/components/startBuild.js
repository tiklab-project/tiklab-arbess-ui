import React,{useEffect} from 'react'
import {Button} from "antd";
import {PoweroffOutlined} from "@ant-design/icons";
import { Card, } from 'antd';
import {inject, observer} from "mobx-react";

const lis=[
    {
        id:'1',
        title:"持续集成",
        icon:"#icon-yunhangchenggong",
        edition:"1.10.10.2",
        time:"23s",

    },
    {
        id:'2',
        title:"日常环境测试",
        icon:"#icon-zanting2",
        edition:"1.10.10.2",
        time:"23s",
    },
    {
        id:'3',
        title:"持续集成",
        icon:"#icon-yunhangshibai1",
        edition:"1.10.10.2",
        time:"23s",
    },
    {
        id:'4',
        title:"持续集成",
        icon:"#icon-yunhangchenggong",
        edition:"1.10.10.2",
        time:"23s",
    },
]

const StructureTask=props=>{

    const {STARTBUILD_STORE}=props
    const {foundPipelineLog,selectPipelineLog}=STARTBUILD_STORE

    const params=localStorage.getItem('pipelineId')
    const param=localStorage.getItem('logId')

    useEffect(()=>{
        foundPipelineLog(params)
        selectPipelineLog(param)
    },[])

    return(
        <div className='task-structure'>+
            <div className='task-structure-btn'>
                <Button>
                    <PoweroffOutlined />停止
                </Button>
            </div>
            <div style={{float:"left",width:'100%'}}>
                {
                    lis && lis.map(item=>{
                        return(
                            <Card title={item.title} key={item.id} className='task-structure-card'>
                                <div className='task-structure-div'>
                                    <svg className="icon" aria-hidden="true">
                                        <use xlinkHref={item.icon}></use>
                                    </svg>
                                </div>
                                <div className='task-structure-ul'>
                                    <ul>
                                        <li>版本：{item.edition}</li>
                                        <li>构建时间：{item.time}</li>
                                    </ul>
                                </div>
                            </Card>
                        )
                    })
                }
            </div>
            <div className='task-structure-out'>
                <h1>输出</h1>
            </div>
        </div>
    )
}

export default inject('STARTBUILD_STORE')(observer(StructureTask))
