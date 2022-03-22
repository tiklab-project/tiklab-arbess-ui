import React, { useEffect } from 'react'
import {Button} from "antd";
import { PoweroffOutlined } from "@ant-design/icons";
import './structure.scss'
import StructureClone from "../components/structureClone";
import StructureTest from "../components/structureTest";
import StructurePack from "../components/structurePack";
import StructureDeploy from "../components/structureDeploy";
import { inject, observer } from "mobx-react";

const StructureTask = props => {

    const { StructureStore } = props
    const { pipelineStructure, selectStructureState,logList } = StructureStore

    const pipelineId = localStorage.getItem('pipelineId')

    let interval=null
    useEffect(() => {
        pipelineStructure(pipelineId).then(res => {
            if (res.data==='1' || res.data === '100') {
                interval = setInterval(() => {
                    selectStructureState(pipelineId).then(res =>{
                        if(res.data.logRunStatus!==0){
                            clearInterval(interval)
                        }
                    })
                }, 500)
            }
        })
        return ()=> clearInterval(interval)
    }, [])

    const logRunLog = () =>{
        if(logList) {
            return (
                <div  onLoad={onload()}>
                    {logList.logRunLog}
                </div>
            )
        }
    }

    const onload = () =>{
        const outLog=document.getElementById('outLog')
        if(outLog){
            outLog.scrollTop = outLog.scrollHeight;
        }
    }

    return (
        <div className='structure task'>
            <div className='structure-btn'>
                <Button>
                    <PoweroffOutlined />停止
                </Button>
            </div>

            <div style={{ float: "left", width: '100%' }}>
                <StructureClone logList={logList} />
                <StructureTest logList={logList} />
                <StructurePack logList={logList} />
                <StructureDeploy logList={logList} />
            </div>

            <div className='structure-out'>
                <h2>输出</h2>
                <div className='structure-outLog'  id='outLog'>
                    {logRunLog()}
                </div>
            </div>

        </div>
    )
}

export default inject('StructureStore')(observer(StructureTask))
