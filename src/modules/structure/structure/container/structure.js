import React, {Fragment, useEffect,useState} from 'react'
import {Result} from "antd";
import './structure.scss'
import StructureLeft from "../components/structureLeft";
import StructureRight from "../components/structureRight";
import { inject, observer } from "mobx-react";

const Structure = props => {

    const { StructureStore } = props
    const { findExecState, findStructureState,logList,findAll,selectHistoryDetails,
        findHistoryLog,
    } = StructureStore

    const pipelineId = localStorage.getItem('pipelineId')

    const [details,setDetails] = useState(0)

    //左--正在构建
    const [leftExecute,setLeftExecute] = useState('')
    //左--历史构建列表
    const [leftData,setLeftData] = useState([])

    //右--正在构建
    const [rightExecute,setRightExecute] = useState('')
    //右--历史构建列表的某一构建详情
    const [rightData,setRightData] = useState([])


    const data = () => {
        let left = []
        let right = []
        selectHistoryDetails(pipelineId).then(res=>{
            for (let i in res.data){
                left.push(res.data[i])
            }
            findHistoryLog(res.data[0].historyId).then(res=>{
                for (let i in res.data){
                    right.push(res.data[i])
                }
                setLeftData([...left])
                setRightData([...right])
            })
        })
    }

    let interval=null
    useEffect(() => {
        findExecState(pipelineId).then(res=>{
            if(res.data === 1 ){
                interval = setInterval(() => {
                    findStructureState(pipelineId).then(res =>{
                        console.log('构建时候的状态',res)
                        if(res.data!==null){
                            setLeftExecute(res.data)
                        }
                    })
                }, 500)
                findAll(pipelineId).then(res=>{
                    setRightExecute(res.data)
                })
                data()
            }else if(res.data=== 0){
                data()
                setDetails(1)
            }
        })
        return ()=> clearInterval(interval)
    }, [pipelineId])


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
            <div className='structure-content'>

                <StructureLeft
                    details={details}
                    setDetails={setDetails}
                    leftExecute={leftExecute}
                    findHistoryLog={findHistoryLog}
                    leftData={leftData}
                    setRightData={setRightData}
                />
                <StructureRight
                    details={details}
                    rightExecute={rightExecute}
                    rightData={rightData}
                    logList={logList}
                />
            </div>
        </div>
    )
}

export default inject('StructureStore')(observer(Structure))
