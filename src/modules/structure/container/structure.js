import React, { useEffect,useState} from 'react'
import { Spin,Result} from "antd";
import {LoadingOutlined,ExclamationCircleOutlined} from "@ant-design/icons";
import './structure.scss'
import StructureLeft from "../components/structureLeft";
import StructureRight from "../components/structureRight";
import { inject, observer } from "mobx-react";
import StructureLeftDropdown from "../components/structureLeftDropdown";

const Structure = props => {

    const {structureStore} = props

    const {findExecState,findStructureState,findAll,selectHistoryDetails,findHistoryLog,deleteHistoryLog,
        killInstance,findLikeHistory
    } = structureStore

    const [leftData,setLeftData] = useState([])     // 左侧 -- 旧历史列表
    const [leftExecute,setLeftExecute] = useState('')   // 左侧 -- 正在构建
    const [rightData,setRightData] = useState([])   // 右侧 -- 历史构建详情
    const [rightExecute,setRightExecute] = useState([])     // 右侧 -- 正在构建详情
    const [modeData,setModeData] = useState('')     // 历史列表的内容
    const [index,setIndex] = useState(0)  // 构建区分显示 -- 构建1 、2、……
    const [freshen,setFreshen] = useState(false)  // 删除刷新组件
    const [isData,setIsData] = useState(true)  // 是否有构建过的数据
    const [historyId,setHistoryId] = useState('')
    const pipelineId = localStorage.getItem('pipelineId')

    let interval=null
    useEffect(() => {
        findExecState(pipelineId).then(res=>{
            if(res.data === 1 ){
                interval = setInterval(() => {
                    findStructureState(pipelineId).then(res =>{
                        console.log(res,'findStructureState')
                        if(res.data!==null){
                            setLeftExecute(res.data)
                            if(res.data.runStatus===1 || res.data.runStatus===30){ stop() }
                        }else{ stop() }
                    })
                }, 1000)
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
        selectHistoryDetails(pipelineId).then(res=>{
            console.log('历史列表',res)
            if(res.data.length!==0){
                setModeData(res.data && res.data[0])
                setHistoryId(res.data && res.data[0].historyId)
                findHistoryLog(res.data && res.data[0].historyId).then(response=>{
                    console.log('历史详情',response)
                    setLeftData([...res.data])
                    setRightData([...response.data])
                    setIsData(true)
                })
            }else{
                setLeftData([])
                setRightData([])
                setIsData(false)
            }
        })
    }
    
    const stop = () => {
        setFreshen(!freshen)
        setLeftExecute('')
        clearInterval(interval)
    }

    const status = i =>{
        switch(i){
            case 0 :
                //运行
                return  <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />

            case 1 :
                //成功
                return  <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#icon-chenggong-"/>
                        </svg>
            case 2 :
                //失败
                return  <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#icon-yunhangshibai1"/>
                        </svg>
            case 3:
                //运行--等待运行
                return  <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#icon-yunhang"/>
                        </svg>
            case 4:
                //被迫停止
                return  <ExclamationCircleOutlined style = {{fontSize:16}}/>
            case 5:
                //运行过程
                return  <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#icon-dengdai1"/>
                        </svg>
        }
    }

    return (
        <div className='structure'>
            {
                isData ?
                    <div className='structure-content'>
                       <div className='structure-content-left'>
                           <StructureLeftDropdown
                               index={index}
                               setLeftData={setLeftData}
                               setModeData={setModeData}
                               setIndex={setIndex}
                               setHistoryId={setHistoryId}
                               setRightData={setRightData}
                               findLikeHistory={findLikeHistory}
                               findHistoryLog={findHistoryLog}
                           />
                           <StructureLeft
                               findHistoryLog={findHistoryLog}
                               leftData={leftData}
                               leftExecute={leftExecute}
                               setRightData={setRightData}
                               status={status}
                               setModeData={setModeData}
                               index={index}
                               setIndex={setIndex}
                               setHistoryId={setHistoryId}
                           />
                       </div>
                        {
                            rightExecute.length===0 &&  rightData.length===0 ?
                                <div className='structure-content-null'>
                                    <Result title="没有数据"/>
                                </div>
                                :
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
                                    historyId={historyId}
                                    deleteHistoryLog={deleteHistoryLog}
                                    killInstance={killInstance}
                                />
                        }

                    </div>
                    :
                    <Result title="当前没有历史数据"/>
            }
        </div>
    )
}

export default inject('structureStore')(observer(Structure))
