import React, { useEffect ,useState} from 'react'
import {Button} from "antd";
import { PoweroffOutlined } from "@ant-design/icons";
import BuildClone from "./buildClone";
import BuildPack from "./buildPack";
import BuildDeploy from "./buildDeploy";
import { inject, observer } from "mobx-react";

const StructureTask = props => {

    const { BUILD_STORE } = props
    const { pipelineStructure, selectStructureState,logList } = BUILD_STORE

    const pipelineId = localStorage.getItem('pipelineId')

    let interval=null
    useEffect(() => {
        pipelineStructure(pipelineId).then(res => {
            if (res.data==='1' ) {
                interval = setInterval(() => {
                    selectStructureState().then(res =>{
                        if(res.data.logRunStatus!==0){
                            clearInterval(interval)
                        }
                    })
                }, 1000)
            }
        })
        return
    }, [])

    const log = () =>{
        if(!logList){
            return (
                <div >
                    null
                </div>
            )
        }else {
            return (
                <div  onLoad={onload()}>
                    {logList.logRunLog}
                </div>
            )
        }
    }

    const onload = () =>{
        const out=document.getElementById('out')
        if(out){
            out.scrollTop = out.scrollHeight;
        }
    }

    return (
        <div className='task-structure'>
            <div className='task-structure-btn'>
                <Button>
                    <PoweroffOutlined />停止
                </Button>
            </div>

            <div style={{ float: "left", width: '100%' }}>
                <BuildClone logList={logList} />
                <BuildPack logList={logList} />
                <BuildDeploy logList={logList} />
            </div>

            <div className='task-structure-out'>
                <h2>输出</h2>
                <div className='task-structure-outLog'  id='out'>
                    {log()}
                </div>
            </div>

        </div>
    )
}

export default inject('BUILD_STORE')(observer(StructureTask))
