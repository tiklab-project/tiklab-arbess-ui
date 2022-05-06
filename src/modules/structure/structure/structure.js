import React, {Fragment, useEffect} from 'react'
import {Button,Result} from "antd";
import { PoweroffOutlined } from "@ant-design/icons";
import './structure.scss'
import StructureLeft from "./structureLeft";
import StructureRight from "./structureRight";
import { inject, observer } from "mobx-react";

const Structure = props => {

    const { StructureStore } = props
    const { pipelineStartStructure, findStructureState,logList,findAll ,structureStepList,
        selectHistoryDetails,buildHistoryList,
    } = StructureStore

    const pipelineId = localStorage.getItem('pipelineId')

    useEffect(()=>{
        findAll(pipelineId)
    },[])

    useEffect(()=>{
        selectHistoryDetails(pipelineId)
    },[])

    let interval=null
    useEffect(() => {
        interval = setInterval(() => {
            findStructureState(pipelineId).then(res =>{
                if(res.data && res.data.findState === 1 ){
                    clearInterval(interval)
                }
            })
        }, 500)
        return ()=> clearInterval(interval)
    }, [])

    const logRunLog = () =>{
        if(logList) {
            const outLog=document.getElementById('outLog')
            if(outLog){
                outLog.scrollTop = outLog.scrollHeight
            }
            return  <div className='structure-content-bottom'>
                        <h3>输出</h3>
                        <div className='structure-content-bottom-outLog'  id='outLog'>
                            {logList.runLog}
                        </div>
                    </div>
        }
    }

    return (
        <div className='structure task'>
            {
                structureStepList.length === 0 ?
                    <div className='structure-noContent'>
                        <Result
                            title="当前没有任何数据"
                        />
                    </div>
                    :
                    <Fragment>
                        <div className='structure-content'>
                            <StructureLeft
                                buildHistoryList={buildHistoryList}
                            />
                            <StructureRight
                                logList={logList}
                                structureStepList={structureStepList}
                            />
                        </div>

                        {logRunLog()}
                    </Fragment>
            }

        </div>
    )
}

export default inject('StructureStore')(observer(Structure))
