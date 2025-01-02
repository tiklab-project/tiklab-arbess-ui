import React, {useState, useEffect, useRef} from "react";
import {Skeleton, Spin} from "antd";
import {CloseOutlined} from "@ant-design/icons";
import Btn from "../../../common/component/btn/Btn";
import PipelineDrawer from "../../../common/component/drawer/Drawer";
import BreadCrumb from "../../../common/component/breadcrumb/BreadCrumb";
import {getTime, runStatusIcon, runStatusText} from "./HistoryCommon";
import HistoryDetail from "./HistoryDetail";
import historyStore from "../store/HistoryStore";
import "./HistoryRunDetail.scss";

const HistoryRunDetail = (props) => {

    const {historyItem,setHistoryItem,historyType,back} = props;

    const {findOneInstance,findStageInstance,keepOn,execStop} = historyStore;

    const runInterRef = useRef(null);

    //获取当前历史运行状态
    const isRun = historyItem?.runStatus === "run";
    //流水线信息
    const pipeline = historyItem && historyItem.pipeline;
    //运行数据
    const [execData,setExecData] = useState([]);
    //日志弹出框
    const [logVisible,setLogVisible] = useState(false);
    //日志数据
    const [logData,setLogData] = useState(null);
    //继续执行加载状态
    const [execLoading,setExecLoading] = useState(true);

    useEffect(()=>{
        if(historyItem?.instanceId){
            findTask("init")
        }
        return ()=> {
            init()
        }
    },[historyItem?.instanceId])

    /**
     * 运行详情
     */
    const findTask = type => {
        findStageInstance(historyItem.instanceId).then(res=>{
            if(res.code===0){
                setExecData(res?.data || []);
                if(isRun && type==='init'){
                    findTaskInter()
                } else if(isRun && type==='end'){
                    findInstance()
                }
            } else {
                clearInterval(runInterRef.current)
            }
        }).finally(()=>setExecLoading(false))
    }

    /**
     * 重新查询
     */
    const findInstance = () => {
        findOneInstance(historyItem.instanceId).then(res=>{
            if(res.code===0){
                setHistoryItem(res.data)
            }
        })
    }

    /**
     * 开启定时器
     */
    const findTaskInter = () => {
        runInterRef.current = setInterval(()=>{
            findStageInstance(historyItem.instanceId).then(res=>{
                if(res.code===0){
                    setExecData(res?.data || []);
                    const data = [...res.data];
                    const statesList = data?.map(item => item.stageState) || [];
                    if(statesList?.length){
                        // 检查是否包含指定状态
                        const hasCriticalState = statesList.includes('error') || statesList.includes('halt');
                        const lastStateSuccess = statesList.at(-1) === 'success';
                        if (hasCriticalState || lastStateSuccess) {
                            clearInterval(runInterRef.current);
                            setTimeout(() => findTask("end"), 1000);
                        }
                    }
                } else {
                    clearInterval(runInterRef.current)
                }
            })
        },1000)
    }

    /**
     * 继续执行
     */
    const execKeep = () => {
        setExecLoading(true)
        keepOn(pipeline.id).then(res=>{
            setTimeout(()=>{
                setExecLoading(false)
            },1500)
        })
    }

    /**
     * 终止执行
     */
    const execCease = () => {
        setExecLoading(true);
        clearInterval(runInterRef.current);
        execStop(pipeline.id).then(res=>{
            setTimeout(()=>findTask("end"),1000)
        })
    }

    const goBack = () => {
        init()
        back()
    }

    const init = ()=>{
        setExecLoading(true);
        clearInterval(runInterRef.current)
    }

    // 获取时间
    const setTime = execData && execData.reduce((pre, cur) => {
        return pre + cur.stageTime;
    }, 0);

    /**
     * 获取任务
     */
    const setTaskLog = (task) => {
        setLogData(task.id)
        setLogVisible(true)
    }

    return (
        <div className="str-run-detail">
            <div className="str-run-detail-bread">
                <BreadCrumb
                    firstItem={`${pipeline?.name} # ${historyItem?.findNumber}`}
                    onClick={historyType!=="drawer" ? goBack: undefined}
                >
                    {historyType==="drawer" && <CloseOutlined style={{fontSize:16}} onClick={goBack}/>}
                </BreadCrumb>
                <div className='bread-center-box'>
                    <div className="bread-center">
                        <div className="bread-center-item">
                            <span className='bread-center-name'>开始时间</span>
                            <span className='bread-center-desc'>{historyItem?.createTime }</span>
                        </div>
                        <div className="bread-center-item">
                            <span className='bread-center-name'>运行方式</span>
                            <span className='bread-center-desc'>{historyItem?.runWay===1 ? historyItem?.user?.nickname + " · 手动触发" : "定时触发" }</span>
                        </div>
                        <div className="bread-center-item">
                            <span className='bread-center-name'>运行状态</span>
                            <span className={`bread-center-desc run-status-${historyItem?.runStatus}`}>{runStatusText(historyItem?.runStatus)}</span>
                        </div>
                        <div className="bread-center-item">
                            <span className='bread-center-name'>运行时长</span>
                            <span className='bread-center-desc'>{getTime(setTime)}</span>
                        </div>
                    </div>
                    {historyItem?.runStatus === "run" && <Btn onClick={execCease}>终止</Btn>}
                </div>
            </div>
            <div className="str-run-detail-center">
                <Spin spinning={execLoading}>
                    <div className='str-run-detail-box'>
                        {
                            execData && execData.map((item,itemIndex)=>{
                                const {stageName,stageInstanceList} = item;
                                return (
                                    <div key={item.id} className='str-run-item'>
                                        <div className='str-run-item-head'>
                                            {stageName}
                                        </div>
                                        <div className='str-run-item-stage'>
                                            {
                                                stageInstanceList && stageInstanceList.map((list,listIndex)=>{
                                                    const {taskInstanceList} = list;
                                                    return (
                                                        <div key={list.id} className='str-run-stage'>
                                                            {
                                                                taskInstanceList && taskInstanceList.map((task,taskIndex)=>{
                                                                    const {taskName,runTime,runState} = task;
                                                                    return (
                                                                        <div className={`str-run-stage-card str-run-stage-card-${runState}`} key={task.id}>
                                                                            <div className="card-top">
                                                                                <div>
                                                                                    <span className="card-top-state">{runStatusIcon(runState)}</span>
                                                                                    <span className="card-top-title">{taskName}</span>
                                                                                </div>
                                                                                {
                                                                                    runState==='suspend' &&
                                                                                    <div className='card-top-btn'>
                                                                                        <div className='btn-continue' onClick={execKeep}>继续执行</div>
                                                                                    </div>
                                                                                }
                                                                            </div>
                                                                            <div className={`card-ct run-status-${runState}`}>{runStatusText(runState)}</div>
                                                                            <div className="card-bt">
                                                                                <span className="card-bt-log" onClick={()=>setTaskLog(task)}>日志</span>
                                                                                <span className="card-bt-time">{getTime(runTime)}</span>
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                })
                                                            }
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </Spin>
            </div>
            <PipelineDrawer
                width={"80%"}
                visible={logVisible}
                onClose={()=>setLogVisible(false)}
            >
                <HistoryDetail
                    back={()=>setLogVisible(false)}
                    historyItem={historyItem}
                    execData={execData}
                    logData={logData}
                />
            </PipelineDrawer>
        </div>
    )
}

export default HistoryRunDetail
