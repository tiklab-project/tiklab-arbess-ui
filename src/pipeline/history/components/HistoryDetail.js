import React,{useState,useEffect} from "react";
import Breadcrumb from "../../../common/breadcrumb/Breadcrumb";
import {SpinLoading} from "../../../common/loading/Loading";
import HistoryDetailItem from "./HistoryDetailItem";
import HistoryDetailTree from "./HistoryDetailTree";
import "./HistoryDetail.scss";

/**
 * 历史运行详情页面
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const HistoryDetail = props =>{

    const {historyItem,firstItem,back,historyStore,tableType} = props

    const {findTaskInstance,findStageInstance,findAllInstanceLogs,findAllStageInstanceLogs} = historyStore

    // 获取当前历史运行状态
    const isRun = historyItem && historyItem.runStatus === "run";

    // 获取当前流水线信息
    const pipeline = historyItem && historyItem.pipeline;

    // 当前流水线运行State
    const state = pipeline && pipeline.type===1 ? "runState":"stageState"

    const [execData,setExecData] = useState([])

    // 构建详情页面数据未返回时加载状态
    const [detailsLoading,setDetailsLoading] = useState(true)

    // 日志滚动条
    const [isActiveSlide,setIsActiveSlide] = useState(true)

    // 日志数据
    const [logData,setLogData] = useState("")

    // 左侧树结构
    const [treeData,setTreeData] = useState("")

    // 正在运行的任务下标
    const [execIndex,setExecIndex] = useState(0)

    // 日志id
    const [id,setId] = useState("")

    // 当期全部日志
    const [allLog,setAllLog] = useState(null)

    useEffect(()=>{
        // 销毁组件数据处理
        return ()=>{
            setId("")
            setExecIndex(0)
            setDetailsLoading(true)
            clearInterval(inter)
        }
    },[historyItem])

    let inter
    useEffect(()=>{
        if(pipeline){
            if(pipeline.type===1){
                // 获取多任务历史日志详情
                inter = setInterval(()=>findTaskInstance(historyItem.instanceId).then(res=>{
                    setExecData(res.data && res.data)
                    destroyInter(res)
                }),1000)
                return
            }
             // 获取多阶段历史日志详情
             inter = setInterval(()=>findStageInstance(historyItem.instanceId).then(res=> {
                 setExecData(res.data && res.data)
                 destroyInter(res)
             }),1000)
        }
        return ()=> clearInterval(inter)
    },[pipeline])

    /**
     * 清除定时器
     * @param data
     */
    const destroyInter = data =>{
        setDetailsLoading(false)
        // 浅拷贝
        const endValue = [...data.data].pop()
        if(endValue){
            const states = endValue[state]
            if(states ==="success" || states ==="error" || states ==="halt" ){
                clearInterval(inter)
                if(isRun){
                    !id && setExecIndex(data.data && data.data.length-1)
                    if(state==='runState') return setTimeout(()=>findTaskInstance(historyItem.instanceId).then(res=>{
                        setExecData(res.data && res.data)
                    }),1000)
                    setTimeout(()=>findStageInstance(historyItem.instanceId).then(res=>{
                        setExecData(res.data && res.data)
                    }),1000)
                }
            }
        }
    }

    useEffect(()=>{
        // 完成后状态数据
        if(!isRun && execData){
            if(execData.length>0){
                setTreeData(execData[0])
                setLogData(execData[0])
            }
        }
    },[execData])

    useEffect(()=>{
        // 运行中状态数据
        if(isRun && execData){
            // id是否有值，有值：手动切换运行状态数据；无值：自动切换运行状态数据；
            if(id){
                setTreeData(execData[execIndex])
                pipeline && pipeline.type===1 ?
                    setLogData(execData[execIndex]) :
                    setLogData(manualLog(execData))
            }else {
                setTreeData(autoLog(execData))
                setLogData(autoLog(execData))
            }
        }
    },[execData,execIndex,id])

    /**
     * 运行日志打印（自动）
     * @param data
     * @returns {*}
     */
    const autoLog = data =>{
        let a
        if(data && data.some(item=>item[state]==="run")){
            a = data && data.find(item=>item[state]==='run')
        }
        else{
            a = data[data && data.length-1]
        }
        return a
    }

    /**
     * 获取符合要求的值
     * @param data
     * @returns {*}
     */
    const isequal = data =>{
        for(let i=0 ; i<data.length;i++){
            if(data[i].id !== id){
                continue;
            }
            return data[i]
        }
    }

    /**
     * 获取多阶段自动切换运行状态数据（手动，三层嵌套）
     * @param data
     * @returns {*}
     */
    const manualLog = data =>{

        // 第一层
        let results = isequal(data)
        if(results != null){
            return results
        }

        // 第二层
        for(let i=0 ; i<data.length;i++){
            let a = data[i].stageInstanceList
            if(!a){
                continue
            }
            let result = isequal(a)
            if(result == null){
                continue
            }
            return result
        }

        // 第三层
        for(let i=0 ; i<data.length;i++){
            let a = data[i].stageInstanceList
            if(!a){
                continue
            }
            for(let i=0 ; i<a.length;i++){
                let b= a[i].taskInstanceList
                if(!b){
                    continue
                }
                let result = isequal(b)
                if(result == null){
                    continue
                }
                return result
            }
        }
    }

     /**
     * 返回列表
     */
     const goBack = () => {
        setId("")
        setExecIndex(0)
        setDetailsLoading(true)
        clearInterval(inter)
        back()
    }

    /**
     * 获取全部日志
     */
    const getAllLog = () =>{
        if(state==='runState'){
            findAllInstanceLogs(historyItem.instanceId).then(res=>{
                setAllLogs(res)
            })
            return
        }
        findAllStageInstanceLogs(historyItem.instanceId).then(res=>{
            setAllLogs(res)
        })
    }

    /**
     * 存储所有日志
     * @param {*} res 
     */
    const setAllLogs = res =>{
        if(res.code===0){
            setAllLog(res.data)
        }
    }

    // 查看所有日志
    const seeAllLog = () =>{
        if(execData){
            // 浅拷贝
            const endValue = [...execData].pop();
            const states = endValue[state] 
            if(states ==="success" || states ==="error" || states ==="halt" ){
                return <div onClick={getAllLog} className="bottom-up-allow">查看所有日志</div>
            }
        }
        return null
    }

    // 控制台日志
    const renderLog = logData =>{
        const outLog=document.getElementById("str_outLog")
        if(outLog && isActiveSlide){
            outLog.scrollTop = outLog.scrollHeight
        }
        return  <div className="bottom-log" id="str_outLog" onWheel={()=>setIsActiveSlide(false)}>
                    {logData?.runLog || "暂无日志"}
                </div>
    }

    // 面包屑
    const isAllName = () => tableType==="history" ? pipeline?.name:"详情"
    const isFindName = () => historyItem?.findNumber

    // 数据获取前加载状态
    if(detailsLoading){
        return <SpinLoading size='large'/>
    }

    if(allLog){
        return  <div className="str-detail-all-log">
                    <div className="mf-home-limited mf all-log-content">
                        <div className="str-detail-up all-log-title">
                            <Breadcrumb
                                firstItem={firstItem}
                                secondItem={`${isAllName()} # ${isFindName()}`}
                                onClick={()=>setAllLog(null)}
                            />
                        </div>
                        <div className='all-log'>
                            {
                                allLog && allLog.length > 0 ?
                                allLog.map(item=>item)
                                :
                                "暂无日志"
                            }
                        </div>
                    </div>
                </div>
    }

    return(
        <div className="str-detail">
            <div className="mf-home-limited mf">
                <div className="str-detail-up">
                    <Breadcrumb
                        firstItem={firstItem}
                        secondItem={`${isAllName()} # ${isFindName()}`}
                        onClick={goBack}
                    />
                </div>
                <div className="str-detail-card">
                    <HistoryDetailItem
                        isRun={isRun}
                        pipeline={pipeline}
                        execData={execData}
                        setTreeData={setTreeData}
                        setLogData={setLogData}
                        setExecIndex={setExecIndex}
                        setId={setId}
                    />
                </div>
                <div className="str-detail-log">
                    <div className="bottom-up">
                        <div>控制台</div>
                        { seeAllLog() }
                    </div>
                    <div className="bottom-content">
                        {
                            pipeline && pipeline.type===2 &&
                            <div className="bottom-tree">
                                <HistoryDetailTree
                                    isRun={isRun}
                                    treeData={treeData}
                                    logData={logData}
                                    setLogData={setLogData}
                                    setId={setId}
                                />
                            </div>
                        }
                        { renderLog(logData) }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HistoryDetail
