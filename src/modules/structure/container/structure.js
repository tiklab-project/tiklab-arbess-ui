import React, { useEffect,useState} from 'react'
import { Spin,Result} from "antd";
import {LoadingOutlined,ExclamationCircleOutlined} from "@ant-design/icons";
import './structure.scss'
import StructureLeft from "../components/structureLeft";
import StructureRight from "../components/structureRight";
import { inject, observer } from "mobx-react";

const Structure = props => {

    const { structureStore , structureDataStore} = props

    const { findExecState, findStructureState,findAll,selectHistoryDetails,findHistoryLog,
        deleteHistoryLog,killInstance
    } = structureStore

    const { leftExecute,setLeftExecute,leftData,setLeftData, rightData,setRightData,modeData,
        setModeData,
    } = structureDataStore

    const [, forceUpdate] = useState({})  // 刷新组件
    const [details,setDetails] = useState(0) // 组件显示 -- 历史构建 或者 正在构建
    const [index,setIndex] = useState(0)  // 构建区分显示 -- 构建1 、2、……

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
                    setRightData(res.data)
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
            case 5:
                return  <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#icon-dengdai1"/>
                        </svg>
        }
    }

    return (
        <div className='structure task' shouldupdate='true'>
            {
                leftExecute ==='' && leftData && leftData.length===0 ?
                    <Result title="当前没有历史数据"/>
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
                            rightData={rightData}
                            status={status}
                            leftExecute={leftExecute}
                            modeData={modeData}
                            index={index}
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

export default inject('structureStore','structureDataStore')(observer(Structure))
