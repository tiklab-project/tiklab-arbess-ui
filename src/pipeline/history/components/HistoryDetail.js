import React,{useState,useEffect,useRef} from "react";
import Breadcrumb from "../../../common/breadcrumb/Breadcrumb";
import {SpinLoading} from "../../../common/loading/Loading";
import HistoryDetailTree from "./HistoryDetailTree";
import "./HistoryDetail.scss";
import {runStatusIcon, runStatusText} from "./HistoryTrigger";
import {getTime} from "../../../common/utils/Client";
import {Space} from "antd";
import {text} from "node-forge/lib/util";

/**
 * 历史运行详情页面
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const HistoryDetail = props =>{

    const {historyItem,back,historyStore,tableType} = props

    const {findTaskInstance,findStageInstance} = historyStore

    const scrollRef = useRef();

    // 获取当前历史运行状态
    const isRun = historyItem?.runStatus === "run";

    // 获取当前流水线信息
    const pipeline = historyItem && historyItem.pipeline;

    // 当前流水线运行State
    const state = pipeline?.type===1 ? "runState":"stageState";

    const [execData,setExecData] = useState([])

    const [isClick,setIsClick] = useState(true)

    // 构建详情页面数据未返回时加载状态
    const [detailsLoading,setDetailsLoading] = useState(true)

    // 日志滚动条
    const [isActiveSlide,setIsActiveSlide] = useState(true)

    // 日志id
    const [id,setId] = useState(null)

    let inter
    useEffect(()=>{
        if(pipeline){
            findTask("init").then()
        }
        return ()=> {
            clearInterval(inter)
            init()
        }
    },[pipeline])

    /**
     * 运行历史
     */
    const findTask = async type => {
        let taskRes;
        if(pipeline.type===1){
            taskRes = await findTaskInstance(historyItem.instanceId)
        } else {
            taskRes = await findStageInstance(historyItem.instanceId)
        }
        if(taskRes.code===0 && taskRes.data){
            setDetailsLoading(false)
            setExecData(taskRes.data)
            if(isRun && type==="init"){findInter()}
        }
    }

    /**
     * 开启定时器
     */
    const findInter = () =>{
        clearInterval(inter)
        if(pipeline.type===1){
            inter = setInterval(()=>{
                findTaskInstance(historyItem.instanceId).then(res=>{
                    if(res.code===0){destroyInter(res)}
                })
            },1000)
            return
        }
        inter = setInterval(()=>{
            findStageInstance(historyItem.instanceId).then(res=>{
                if(res.code===0){destroyInter(res)}
            })
        },1000)
    }

    /**
     * 清除定时器
     * @param data
     */
    const destroyInter = data =>{
        setExecData(data.data && data.data )
        const endValue = [...data.data].pop()
        if(endValue){
            const states = endValue[state]
            if(states ==="success" || states ==="error" || states ==="halt" ){
                clearInterval(inter)
                setTimeout(()=>findTask(),1000)
            }
        }
    }

    useEffect(()=>{
        if(execData){
            if(isRun && isClick){
                setId(autoLog(execData)?.id)
            }
            if(!isRun){
                const data = [...execData].pop()
                if(data){setId(data.id)}
            }
        }
    },[execData,isClick])


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
     * 返回列表
     */
    const goBack = () => {
        init()
        back()
    }

    const init = ()=>{
        setId(null)
        setDetailsLoading(true)
        clearInterval(inter)
    }

    console.log(historyItem)

    /**
     * 锚点跳转
     */
    const changeAnchor = id =>{
        setId(id)
        setIsActiveSlide(false)
        setIsClick(false)
        if (id) {
            const anchorElement = document.getElementById(id)
            if (anchorElement) {
                scrollRef.current.scrollTop = anchorElement.offsetTop - 210
            }
        }
    }

    // 控制台日志
    const renderLog = () =>{
        if(scrollRef.current && isActiveSlide){
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
        if(pipeline?.type===2){
            return (
                <div className="bottom-log" ref={scrollRef}  onWheel={()=>setIsActiveSlide(false)}>
                    {
                        execData && execData.map(group=>{
                            const {stageInstanceList} = group
                            return <div key={group.id} id={group.id} className='bottom-log-item'>
                                {
                                    stageInstanceList && stageInstanceList.map(list=>{
                                        const {taskInstanceList} = list
                                        return <div key={list.id} id={list.id}>
                                            {
                                                taskInstanceList && taskInstanceList.map(item=>{
                                                    return <div key={item.id} id={item.id}>{item.runLog}</div>
                                                })
                                            }
                                        </div>
                                    })
                                }
                            </div>
                        })
                    }
                </div>
            )
        }
        return (
            <div className="bottom-log" ref={scrollRef} onWheel={()=>setIsActiveSlide(false)}>
                {
                    execData && execData.map(item=>{
                        return <div key={item.id} id={item.id} className='bottom-log-item'>{item.runLog}</div>
                    })
                }
            </div>
        )
    }

    // 面包屑
    const isAllName = () => tableType==="history" ? pipeline?.name:"详情"
    const isFindName = () => historyItem?.findNumber

    // 数据获取前加载状态
    if(detailsLoading){
        return <SpinLoading size='large'/>
    }

    return(
        <div className="str-detail">
            <div className="str-detail-bread">
                <Breadcrumb
                    firstItem={`${isAllName()} # ${isFindName()}`}
                    onClick={goBack}
                />
                <div className="bread-center">
                    <div className="bread-center-item">
                        <div className='bread-center-name'>开始时间</div>
                        <div className='bread-center-desc'>{historyItem?.createTime }</div>
                    </div>
                    <div className="bread-center-item">
                        <div className='bread-center-name'>运行方式</div>
                        <div className='bread-center-desc'>{historyItem?.runWay===1 ? historyItem?.user?.nickname + " · 手动触发" : "定时触发" }</div>
                    </div>
                    <div className="bread-center-item">
                        <div className='bread-center-name'>运行状态</div>
                        <div className={`bread-center-desc bread-center-${historyItem?.runStatus}`}>{runStatusText(historyItem?.runStatus)}</div>
                    </div>
                    <div className="bread-center-item">
                        <div className='bread-center-name'>运行时长</div>
                        <div className='bread-center-desc'>{getTime(historyItem?.runTime)}</div>
                    </div>
                </div>

            </div>
            <div className={`str-detail-bottom ${tableType?"bottom-margin":""}`}>
                <HistoryDetailTree
                    id={id}
                    execData={execData}
                    pipeline={pipeline}
                    changeAnchor={changeAnchor}
                />
                <div className="str-detail-log">
                    { renderLog() }
                </div>
            </div>

        </div>
    )
}

export default HistoryDetail
