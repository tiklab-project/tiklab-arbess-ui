import React, { useEffect,useState} from 'react'
import { Spin,Result} from "antd";
import {LoadingOutlined,ExclamationCircleOutlined} from "@ant-design/icons";
import './structure.scss'
import StructureLeft from "../components/structureLeft";
import StructureRight from "../components/structureRight";
import { inject, observer } from "mobx-react";

const Structure = props => {

    const {structureStore} = props

    const {findExecState,findStructureState,findAll,selectHistoryDetails,findHistoryLog,deleteHistoryLog,
        killInstance,findLikeHistory
    } = structureStore

    const [leftData,setLeftData] = useState([])     // 左侧 -- 旧历史列表
    const [leftExecute,setLeftExecute] = useState('')   // 左侧 -- 正在构建
    const [rightData,setRightData] = useState([])   // 右侧 -- 历史构建详情
    const [rightExecute,setRightExecute] = useState([])     // 右侧 -- 正在构建详情
    const [modeData,setModeData] = useState([])     // 历史列表的内容
    const [index,setIndex] = useState(0)  // 构建区分显示 -- 构建1 、2、……
    const [freshen,setFreshen] = useState(false)  // 删除刷新组件
    const pipelineId = localStorage.getItem('pipelineId')

    let interval=null
    useEffect(() => {
        findExecState(pipelineId).then(res=>{
            if(res.data === 1 ){
                interval = setInterval(() => {
                    findStructureState(pipelineId).then(res =>{
                        if(res.data!==null){
                            setLeftExecute(res.data)
                            if(res.data.runStatus===1 || res.data.runStatus===30){
                                setLeftExecute('')
                                clearInterval(interval)
                            }
                        }else{
                            setLeftExecute('')
                            clearInterval(interval)
                        }
                    })
                }, 500)
                findAll(pipelineId).then(res=>{
                    console.log('正在执行的详情',res.data)
                    setRightExecute(res.data)
                })
                data()
            }else if(res.data=== 0){
                data()
                setLeftExecute('')
                clearInterval(interval)
                setIndex(1)
            }
        })
        return ()=> clearInterval(interval)
    }, [pipelineId,freshen])

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
                localStorage.setItem('historyId',res.data && res.data[0].historyId)
                findHistoryLog(res.data && res.data[0].historyId).then(res=>{
                    console.log('历史详情',res)
                    for (let i in res.data){
                        right.push(res.data[i])
                    }
                    setLeftData([...left])
                    setRightData([...right])
                })
            }else{
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
        <div className='structure' shouldupdate='true'>
            {
                leftExecute ==='' && leftData && leftData.length === 0 ?
                    <Result title="当前没有历史数据"/>
                    :
                    <div className='structure-content'>
                        <StructureLeft
                            leftExecute={leftExecute}
                            leftData={leftData}
                            setLeftData={setLeftData}
                            setRightData={setRightData}
                            status={status}
                            setModeData={setModeData}
                            index={index}
                            setIndex={setIndex}
                            findHistoryLog={findHistoryLog}
                            findLikeHistory={findLikeHistory}
                        />
                        <StructureRight
                            freshen={freshen}
                            setFreshen={setFreshen}
                            leftData={leftData}
                            setLeftData={setLeftData}
                            rightData={rightData}
                            rightExecute={rightExecute}
                            status={status}
                            leftExecute={leftExecute}
                            modeData={modeData}
                            index={index}
                            deleteHistoryLog={deleteHistoryLog}
                            killInstance={killInstance}
                        />
                    </div>
            }
        </div>
    )
}

export default inject('structureStore')(observer(Structure))
