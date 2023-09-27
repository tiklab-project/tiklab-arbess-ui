import React,{useState,useEffect,useRef} from "react";
import {CloseOutlined} from "@ant-design/icons";
import Btn from "../../../common/component/btn/Btn";
import Breadcrumb from "../../../common/component/breadcrumb/Breadcrumb";
import {SpinLoading} from "../../../common/component/loading/Loading";
import HistoryDetailTree from "./HistoryDetailTree";
import {runStatusText,getTime} from "./HistoryTrigger";
import "./HistoryDetail.scss";


/**
 * 历史运行详情页面
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const HistoryDetail = props =>{

    const {historyItem,setHistoryItem,back,historyStore,historyType} = props

    const {findOneInstance,findTaskInstance,findStageInstance} = historyStore

    const scrollRef = useRef();

    // 获取当前历史运行状态
    const isRun = historyItem?.runStatus === "run";
    // 获取当前流水线信息
    const pipeline = historyItem && historyItem.pipeline;
    // 当前流水线运行State
    const state = pipeline?.type===1 ? "runState":"stageState";
    const time = pipeline?.type===1 ? "runTime":"stageTime";

    const [execData,setExecData] = useState([])

    // 构建详情页面数据未返回时加载状态
    const [detailsLoading,setDetailsLoading] = useState(true)

    // 日志滚动条
    const [isActiveSlide,setIsActiveSlide] = useState(true)

    // 日志id
    const [id,setId] = useState(null)

    let inter;
    useEffect(()=>{
        if(historyItem?.instanceId){
            setDetailsLoading(true)
            findTask("init").then()
        }
        return ()=> {
            clearInterval(inter)
            init()
        }
    },[historyItem?.instanceId])

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
            if(isRun && type==="end"){findInstance()}
        }
    }

    /**
     * 重新查询
     */
    const findInstance = () => {
        findOneInstance(historyItem.instanceId).then(res=>{
            if(res.code===0){setHistoryItem(res.data)}
        })
    }

    /**
     * 开启定时器
     */
    const findInter = () =>{
        clearInterval(inter)
        if(pipeline?.type===1){
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
                setTimeout(()=>findTask("end"),1000)
            }
        }
    }

    useEffect(()=>{
        if(execData && isActiveSlide){
            if(isRun){setId(autoLog(execData)?.id)}
            else {
                const data = [...execData].pop()
                if(data){setId(data.id)}
            }
        }
    },[execData,isActiveSlide])


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
        setIsActiveSlide(true)
        clearInterval(inter)
    }

    /**
     * 锚点跳转
     */
    const changeAnchor = id =>{
        setIsActiveSlide(false)
        setId(id)
        if (id) {
            const anchorElement = document.getElementById(id)
            if (anchorElement) {
                scrollRef.current.scrollTop = anchorElement.offsetTop - 130
            }
        }
    }

    /**
     * 鼠标滚轮滑动事件
     */
    const onWheel = () => {
        if(!isActiveSlide) return
        setIsActiveSlide(false)
    }

    let startScrollTop  = 0;

    /**
     * 鼠标左键事件获取内容区域初始滚动位置
     * @param e
     */
    const handleMouseDown = e =>{
        if(e.button===0){
            if(!isActiveSlide) return
            startScrollTop  = scrollRef.current.scrollTop;
        }
    }


    /**
     * 结束滚动位置
     * @param e
     */
    const handleMouseUp = e => {
        if(e.button===0){
            if(!isActiveSlide) return
            const endScrollTop = scrollRef.current.scrollTop;
            if(startScrollTop !== endScrollTop) {
                setIsActiveSlide(false)
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
                <div className="bottom-log">
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
            <div className="bottom-log">
                {
                    execData && execData.map(item=>{
                        return <div key={item.id} id={item.id} className='bottom-log-item'>{item.runLog}</div>
                    })
                }
            </div>
        )
    }

    // 数据获取前加载状态
    if(detailsLoading){
        return <div className="str-detail">
                    <SpinLoading size='large'/>
                </div>
    }

    // 获取时间
    const setTime = execData && execData.reduce((pre, cur) => {
        return pre + cur[time];
    }, 0);

    return(
        <div className="str-detail">
            <div className="str-detail-bread">
                <Breadcrumb
                    firstItem={pipeline?.name +" # " + historyItem?.findNumber}
                    onClick={historyType!=="drawer" ? goBack: undefined}
                >
                    {
                        historyType==="drawer" &&
                        <Btn
                            title={<CloseOutlined style={{fontSize:16}}/>}
                            type="text"
                            onClick={goBack}
                        />
                    }
                </Breadcrumb>
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
                        <span className={`bread-center-desc bread-center-${historyItem?.runStatus}`}>{runStatusText(historyItem?.runStatus)}</span>
                    </div>
                    <div className="bread-center-item">
                        <span className='bread-center-name'>运行时长</span>
                        <span className='bread-center-desc'>{getTime(setTime)}</span>
                    </div>
                </div>
            </div>
            <div className="str-detail-bottom">
                <HistoryDetailTree
                    id={id}
                    execData={execData}
                    pipeline={pipeline}
                    changeAnchor={changeAnchor}
                />
                <div className="str-detail-log" 
                     ref={scrollRef} 
                     onWheel={onWheel}
                     onMouseDown={handleMouseDown}
                     onMouseUp={handleMouseUp}
                >
                    { renderLog() }
                </div>
            </div>

        </div>
    )
}

export default HistoryDetail
