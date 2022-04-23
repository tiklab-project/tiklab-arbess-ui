import React, { useEffect} from 'react'
import {Button} from "antd";
import { PoweroffOutlined } from "@ant-design/icons";
import './structure.scss'
import StructureCenter from "./structureCenter";
import { inject, observer } from "mobx-react";

const Structure = props => {

    const { StructureStore } = props
    const { pipelineStartStructure, findStructureState,logList,findAll ,structureStepList} = StructureStore

    const pipelineId = localStorage.getItem('pipelineId')

    useEffect(()=>{
        findAll(pipelineId)
    },[])

    let interval=null
    useEffect(() => {
        // pipelineStartStructure(pipelineId).then(res => {
        //     if (res.data===1 || res.data === 100) {
        //         interval = setInterval(() => {
        //             findStructureState(pipelineId).then(res =>{
        //                 // if(res.data && res.data.logRunStatus !== 0 ){
        //                 //     clearInterval(interval)
        //                 // }
        //             })
        //         }, 500)
        //     }
        // })
        return ()=> clearInterval(interval)
    }, [])

    const logRunLog = () =>{
        if(logList) {
            const outLog=document.getElementById('outLog')
            if(outLog){
                outLog.scrollTop = outLog.scrollHeight
            }
            return  <div className='structure-bottom'>
                        <h3>输出</h3>
                        <div className='structure-bottom-outLog'  id='outLog'>
                            {logList.runLog}
                        </div>
                    </div>

        }
    }

    return (
        <div className='structure task'>
            <div className='structure-Top'>
                <div className='structure-Top-btn'>
                    <Button>
                        <PoweroffOutlined />停止
                    </Button>
                </div>
            </div>

             <StructureCenter
                logList={logList}
                structureStepList={structureStepList}
            />

            {logRunLog()}
        </div>
    )
}

export default inject('StructureStore')(observer(Structure))
