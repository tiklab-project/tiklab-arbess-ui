import React,{useState,useEffect} from "react";
import {observer} from "mobx-react";
import {MinusCircleOutlined} from "@ant-design/icons";
import BreadcrumbContent from "../../../common/breadcrumb/Breadcrumb";
import {SpinLoading} from "../../../common/loading/Loading";
import HistoryDetailItem from "./HistoryDetailItem";
import HistoryDetailTree from "./HistoryDetailTree";
import Btn from "../../../common/btn/Btn";
import "./HistoryDetail.scss";

/**
 * 历史运行详情页面
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const HistoryDetail = props =>{

    const {firstItem,index,pipeline,isDetails,setIsDetails,historyStore,isAll} = props

    const {execData,itemData,killInstance,pipelineRunStatus} = historyStore

    const [strDetails,setStrDetails] = useState(true) // 构建详情页面数据未返回时加载状态
    const [isActiveSlide,setIsActiveSlide] = useState(true)  // 日志滚动条
    const [logData,setLogData] = useState("")  // 日志数据
    const [treeData,setTreeData] = useState("") // 左侧树结构
    const [execIndex,setExecIndex] = useState(0)
    const [id,setId] = useState("")

    useEffect(()=>{
        return ()=>{
            setId("")
            setExecIndex(0)
            setStrDetails(true)
        }
    },[isDetails])

    // 完成后状态数据
    useEffect(()=>{
        if(index===1 && itemData){
            const data = itemData.runLogList
            setTreeData(data[0])
            pipeline && pipeline.type===1 ? setLogData(itemData):setLogData(data[0])
            setStrDetails(false)
        }
    },[itemData])

    // 所有流水线历史列表 && 配置运行 -- 运行中状态接口调用
    let interval=null
    useEffect(()=>{
        if(isAll && index===2){
            interval=setInterval(()=>
                pipelineRunStatus(pipeline.id).then(res=>{
                    if(res.code===0){
                        res.data.allState === 0 && clearInterval(interval)
                    }
                }), 1000)
        }
        // 销毁定时器
        return ()=> clearInterval(interval)
    },[])

    // 运行中状态数据
    useEffect(()=>{
        if(index===2 && execData){
            const data = execData.runLogList
            // id是否有值，有值：手动切换运行状态数据；无值：自动切换运行状态数据；
            if(id){
                setTreeData(data[execIndex])
                setLogData(manualEquals(data))
            }else{
                setTreeData(autoEuqals(data))
                pipeline && pipeline.type===1 ? setLogData(execData) : setLogData(autoEuqals(data))
            }
            setStrDetails(false)
        }
    },[execData,execIndex,id])

    /**
     * 运行日志打印（自动）
     * @param data
     * @returns {*}
     */
    const autoEuqals = data =>{
        let a
        if(data && data.some(item=>item.state===0)){
            data && data.map(item=>{
                if(item.state===0){
                    a = item
                }
            })
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
     * 运行日志打印（手动，三层嵌套）
     * @param data
     * @returns {*}
     */
    const manualEquals = data =>{

        // 第一层
        let results = isequal(data)
        if(results != null){
            return results
        }

        // 第二层
        for(let i=0 ; i<data.length;i++){
            let a = data[i].runLogList
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
            let a = data[i].runLogList
            if(!a){
                continue
            }
            for(let i=0 ; i<a.length;i++){
                let b= a[i].runLogList
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
     * 关闭滚动条一直在下面
     */
    const onWheel = () =>{
        setIsActiveSlide(false)
    }

    /**
     * 控制台日志
     * @param logData
     * @returns {JSX.Element}
     */
    const renderLog = logData =>{
        const outLog=document.getElementById("str_outLog")
        if(index===2 && outLog && isActiveSlide){
            outLog.scrollTop = outLog.scrollHeight
        }
        return  <div className="bottom-log" id="str_outLog" onWheel={onWheel}>
                    {logData && logData.runLog ? logData.runLog : "暂无日志"}
                </div>
    }

    /**
     * 终止运行
     */
    const terminateOperation = () => killInstance(pipeline.id)

    /**
     * 返回列表
     */
    const goBack = () => setIsDetails(false)

    /**
     * 面包屑 secondItem = isAllName() + isFindName()
     * @returns {*|string}
     */
    const isAllName = () => isAll==="structure" ? pipeline && pipeline.name:"详情"
    const isFindName = () => index===1 ? itemData && itemData.name:execData && execData.name

    // 数据获取前加载状态
    if(strDetails){
        return <SpinLoading size='large'/>
    }

    return(
        <div className="strDetail mf-home-limited mf">
            <div className="strDetail-up" style={{paddingBottom:15}}>
                <BreadcrumbContent
                    firstItem={firstItem}
                    secondItem={`${isAllName()} # ${isFindName()}`}
                    goBack={goBack}
                />
                {
                    index===2 && execData.allState!==0 &&
                    <Btn title={"终止"} icon={<MinusCircleOutlined/>} onClick={()=>terminateOperation()}/>
                }
            </div>
            <div className="strDetail-card">
                <HistoryDetailItem
                    index={index}
                    itemData={index===1 ? itemData && itemData.runLogList:execData && execData.runLogList}
                    setTreeData={setTreeData}
                    setLogData={setLogData}
                    setExecIndex={setExecIndex}
                    setId={setId}
                />
            </div>
            <div className="strDetail-log">
                <div className="bottom-up">控制台</div>
                <div className="bottom-content">
                    {
                        pipeline && pipeline.type===2 &&
                        <div className="bottom-tree">
                            <HistoryDetailTree
                                index={index}
                                treeData={treeData}
                                logData={logData}
                                setLogData={setLogData}
                                setExecIndex={setExecIndex}
                                setId={setId}
                            />
                        </div>
                    }
                    { renderLog(logData) }
                </div>
            </div>
        </div>
    )
}

export default observer(HistoryDetail)
