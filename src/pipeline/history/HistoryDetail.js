import React,{useState,useEffect,useRef} from "react";
import Breadcrumb from "../../common/breadcrumb/Breadcrumb";
import {SpinLoading} from "../../common/loading/Loading";
import HistoryDetailItem from "./components/HistoryDetailItem";
import HistoryDetailTree from "./HistoryDetailTree";
import "./HistoryDetail.scss";

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

    // 构建详情页面数据未返回时加载状态
    const [detailsLoading,setDetailsLoading] = useState(true)

    // 日志滚动条
    const [isActiveSlide,setIsActiveSlide] = useState(true)

    // 正在运行的任务下标
    const [execIndex,setExecIndex] = useState(0)

    // 左侧树结构
    const [treeData,setTreeData] = useState(null)

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
            setExecData(taskRes.data || [])
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

    useEffect(() => {
        if(pipeline?.type===2 && execData){
            if(id){
                setTreeData(execData[execIndex])
            }else {
                setTreeData(autoLog(execData))
            }
        }
    }, [execData,execIndex,id]);

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
        setExecIndex(0)
        setDetailsLoading(true)
        clearInterval(inter)
    }

    /**
     * 锚点跳转
     */
    const changeAnchor = id =>{
        setIsActiveSlide(false)
        if (id) {
            setId(id)
            const anchorElement = document.getElementById(id)
            if (anchorElement) {
                scrollRef.current.scrollTop = anchorElement.offsetTop - 300
            }
        }
    }

    console.log(treeData)

    // 控制台日志
    const renderLog = () =>{
        if(scrollRef.current && isActiveSlide){
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
        if(pipeline?.type===2 && treeData){
            const {stageInstanceList} = treeData
            return  <div className="bottom-log" ref={scrollRef} onWheel={()=>setIsActiveSlide(false)}>
                        <div id={treeData.id}>
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
                    </div>
        }
        return  <div className="bottom-log" ref={scrollRef} onWheel={()=>setIsActiveSlide(false)}>
                    {
                        execData && execData.map(item=>{
                            return <div key={item.id} id={item.id}>{item.runLog}</div>
                        })
                    }
                </div>
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
            <div className="mf-home-limited mf">
                <div className="str-detail-up">
                    <Breadcrumb
                        firstItem={`${isAllName()} # ${isFindName()}`}
                        onClick={goBack}
                    />
                </div>
                <div className="str-detail-card">
                    <HistoryDetailItem
                        pipeline={pipeline}
                        execData={execData}
                        setExecIndex={setExecIndex}
                        changeAnchor={changeAnchor}
                    />
                </div>
                <div className="str-detail-log">
                    <div className="bottom-up">控制台</div>
                    <div className="bottom-content">
                        {
                            pipeline?.type===2 &&
                            <HistoryDetailTree
                                id={id}
                                treeData={treeData}
                                changeAnchor={changeAnchor}
                            />
                        }
                        { renderLog() }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HistoryDetail
