import React, { useEffect, useState} from 'react'
import { Spin,Button} from "antd";
import {LoadingOutlined,ExclamationCircleOutlined,CloseCircleOutlined} from "@ant-design/icons";
import './structure.scss';
import StructureLeft from "../components/structureLeft";
import StructureRight from "../components/structureRight";
import { inject, observer } from "mobx-react";
import StructureLeftDropdown from "../components/structureLeftDropdown";
import PipelineDetailsBreadcrumb from "../../pipeline/pipelineBreadcrumb/pipelineBreadcrumb";
import empty from '../../../assets/images/empty.jpg';

const Structure = props => {

    const {structureStore} = props

    const {findExecState,findStructureState,findAll,selectHistoryDetails,findHistoryLog,deleteHistoryLog,
        killInstance,findLikeHistory,pipelineStartStructure
    } = structureStore

    const [leftData,setLeftData] = useState([])     // 左侧 -- 旧历史列表
    const [leftExecute,setLeftExecute] = useState('')   // 左侧 -- 正在构建
    const [rightData,setRightData] = useState([])   // 右侧 -- 历史构建详情
    const [rightExecute,setRightExecute] = useState([])     // 右侧 -- 正在构建详情
    const [modeData,setModeData] = useState('')     // 历史列表的内容
    const [index,setIndex] = useState(0)  // 构建区分显示 -- 构建1 、2、……
    const [freshen,setFreshen] = useState(false)  // 删除刷新组件
    const [isData,setIsData] = useState(false)  // 是否有构建过的数据
    const pipelineId = localStorage.getItem('pipelineId')

    let interval=null
    useEffect(() => {
        findExecState(pipelineId).then(res=>{
            if(res.data === 1 ){
                interval = setInterval(() => {
                    findStructureState(pipelineId).then(res =>{
                        if(res.data!==null){
                            setLeftExecute(res.data)
                            setIsData(true)
                            if(res.data.runStatus===1 || res.data.runStatus===30){ stop() }
                        }else{ stop() }
                    })
                }, 1000)
                findAll(pipelineId).then(res=>{
                    console.log('正在执行的详情',res.data)
                    setRightExecute(res.data)
                })
                data()
            }
            else if(res.data=== 0){
                data()
                setLeftExecute('')
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
                findHistoryLog(res.data && res.data[0].historyId).then(response=>{
                    console.log('历史详情',response)
                    setLeftData([...res.data])
                    setRightData([...response.data])
                    setIsData(true)
                })
            }else{
                setLeftData([])
                setRightData([])
                if(leftExecute===''){
                    setIsData(false)
                }
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
                return  <CloseCircleOutlined style = {{fontSize:17,color:'red'}}/>
            case 3:
                //运行--等待运行
                return  <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#icon-yunhang"/>
                        </svg>
            case 4:
                //被迫停止
                return  <ExclamationCircleOutlined style = {{fontSize:17}}/>
            case 5:
                //运行过程
                return  <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#icon-dengdai1"/>
                        </svg>
        }
    }
    
    const working = () => {
        pipelineStartStructure(pipelineId).then(()=>{
            setTimeout(()=>setFreshen(!freshen),500)
        }).catch(error=>{
            console.log(error)
        })
    }

    const style = {
        'paddingLeft':'16px',
    }

    return (
        <div className='structure'>
            {
                // 没有正在构建和历史记录为null（非查询状态）
                isData ?
                    <div className='structure-content'>
                        <div className='structure-content-left'>
                            <StructureLeftDropdown
                                index={index}
                                setLeftData={setLeftData}
                                setModeData={setModeData}
                                setIndex={setIndex}
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
                            />
                        </div>
                        <div className='structure-content-right'>
                            <PipelineDetailsBreadcrumb style={style}/>
                            {
                                leftExecute === ''  &&  leftData.length === 0 ?
                                    <div className='structure-content-empty'>
                                        <div className='empty null'>
                                            <img src={empty} alt='logo' />
                                            <div className="empty-group">
                                                <div className="empty-group_title">没有查询到数据</div>
                                            </div>
                                        </div>
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
                                        setIndex={setIndex}
                                        deleteHistoryLog={deleteHistoryLog}
                                        killInstance={killInstance}
                                    />
                            }
                        </div>
                    </div>
                    :
                    <div className='structure-content-empty'>
                        <PipelineDetailsBreadcrumb/>
                        <div className='empty null'>
                            <img src={empty} alt='logo' />
                            <div className="empty-group">
                                <div className="empty-group_title">当前流水线尚未运行</div>
                                <div className="empty-group_extra">
                                    <Button type="primary" onClick={working}>
                                        立即运行
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </div>
    )
}

export default inject('structureStore')(observer(Structure))
