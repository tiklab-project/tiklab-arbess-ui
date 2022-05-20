import React, { useEffect,useState} from 'react'
import { Spin,Result} from "antd";
import {LoadingOutlined,ExclamationCircleOutlined} from "@ant-design/icons";
import './structure.scss'
import StructureLeft from "../components/structureLeft";
import StructureRight from "../components/structureRight";
import { inject, observer } from "mobx-react";

const Structure = props => {

    const { StructureStore } = props
    const { findExecState, findStructureState,logList,findAll,selectHistoryDetails,
        findHistoryLog,deleteHistoryLog,killInstance
    } = StructureStore

    const [details,setDetails] = useState(0)
    const [, forceUpdate] = useState({}) 
    const [leftExecute,setLeftExecute] = useState('')   //左--正在构建
    const [leftData,setLeftData] = useState([])     //左--历史构建列表
    const [rightExecute,setRightExecute] = useState('')  //右--正在构建
    const [rightData,setRightData] = useState([])   //右--历史构建列表的某一构建详情
    const [modeData,setModeData] = useState('')
    const [index,setIndex] = useState(0)
    const [runTime,setRunTime] = useState(0)

    const pipelineId = localStorage.getItem('pipelineId')
    const historyId = localStorage.getItem('historyId')

    useEffect(()=>{
        return ()=>{
            localStorage.removeItem('historyId')
        }
    },[])

    let interval=null
    useEffect(() => {
        findExecState(pipelineId).then(res=>{
            if(res.data === 1 ){
                setIndex(0)
                interval = setInterval(() => {
                    findStructureState(pipelineId).then(res =>{
                        console.log('构建时候的状态',res)
                        if(res.data!==null){
                            setLeftExecute(res.data)
                            if(res.data.runStatus===1 || res.data.runStatus===30){
                                setLeftExecute('')
                                clearInterval(interval)
                                setDetails(1)
                                setIndex(1)
                            }
                        }else{
                            setLeftExecute('')
                            setDetails(1)
                            clearInterval(interval)
                        }
                    })
                }, 500)
                data()
                findAll(pipelineId).then(res=>{
                    console.log('正在执行的详情',res)
                    setRightExecute(res.data)
                })
            }else if(res.data=== 0){
                data()
                setIndex(1)
                setDetails(1)
            }
        })
        return ()=> {
            clearInterval(interval)
        }
    }, [pipelineId,historyId,details])

    const data = () => {
        let left = []
        let right = []
        selectHistoryDetails(pipelineId).then(res=>{
            console.log('历史列表',res)
            if(res.data.length!==0){
                for (let i in res.data){
                    left.push(res.data[i])
                }
                setModeData(res.data && res.data[0])
                setIndex(1)
                localStorage.setItem('historyId', res.data && res.data[0].historyId)
                findHistoryLog(res.data && res.data[0].historyId).then(res=>{
                    console.log('历史详情',res)
                    for (let i in res.data){
                        right.push(res.data[i])
                    }
                    setLeftData([...left])
                    setRightData([...right])
                })
            }else {
                setLeftData([])
                setRightData([])
            }
        })
    }

    const status = i =>{
        switch(i){
            case 0 :
                return  <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
            case 1 :
                return  <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#icon-chenggong-"/>
                        </svg>
            case 2 :
                return  <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#icon-yunhangshibai1"/>
                        </svg>
            case 3:
                return  <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#icon-yunhang"/>
                        </svg>
            case 4:
                return  <ExclamationCircleOutlined style = {{fontSize:16}}/>
        }
    }

    return (
        <div className='structure task' shouldupdate='true'>
            {
                leftExecute ==='' && leftData && leftData.length===0 ?
                    <Result
                        title="当前没有历史数据"
                    />
                    :
                    <div className='structure-content'>
                        <StructureLeft
                            details={details}
                            setDetails={setDetails}
                            leftExecute={leftExecute}
                            leftData={leftData}
                            setRightData={setRightData}
                            status={status}
                            setModeData={setModeData}
                            index={index}
                            setIndex={setIndex}
                            findHistoryLog={findHistoryLog}
                        />
                        <StructureRight
                            details={details}
                            rightExecute={rightExecute}
                            rightData={rightData}
                            status={status}
                            leftExecute={leftExecute}
                            modeData={modeData}
                            index={index}
                            runTime={runTime}
                            logList={logList}
                            deleteHistoryLog={deleteHistoryLog}
                            killInstance={killInstance}
                            forceUpdate={forceUpdate}
                            historyId={historyId}
                        />
                    </div>
            }
        </div>
    )
}

export default inject('StructureStore')(observer(Structure))
