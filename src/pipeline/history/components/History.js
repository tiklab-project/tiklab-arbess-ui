import React,{useEffect,useState} from "react"
import {inject,observer} from "mobx-react";
import HistoryTable from "./HistoryTable";

/**
 * 所有历史页面
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const History = props => {

    const {historyStore,pipelineStore} = props

    const {findUserInstance,freshen,setHistoryList,pageCurrent,setPageCurrent,
    } = historyStore
    const {findUserPipeline,pipelineList} = pipelineStore

    // 列表数据详情状态
    const [detailsVisible,setDetailsVisible] = useState(false)

    // 筛选条件--流水线
    const [pipelineId,setPipelineId] = useState(null)

    // 筛选条件--执行状态
    const [state,setState] = useState(0)

    // 筛选条件--执行方式
    const [type,setType] = useState(0)

    // 加载
    const [isLoading,setIsLoading] = useState(true)

    useEffect(()=>{
        // 所有流水线
        findUserPipeline()
        return ()=>{
            setPageCurrent(1)
            setHistoryList()
        }
    },[])

    let inter = null
    useEffect(()=>{
        // 获取所有历史列表
        inter = setInterval(()=>findUserInstance({
            pipelineId:pipelineId,
            state:state,
            type:type
        }).then(res=>{
            setIsLoading(false)
            if(res.code===0){
                if(res.data.dataList.length<1 || res.data.dataList[0].runStatus!=="run"){
                    clearInterval(inter)
                }
            }
            else {
                clearInterval(inter)
            }
        }),1000)
        if(detailsVisible){
            clearInterval(inter)
        }
        return ()=>clearInterval(inter)
    },[freshen,pageCurrent,pipelineId,state,type,detailsVisible])

    return (
        <HistoryTable
            tableType="history"
            isLoading={isLoading}
            setType={setType}
            setState={setState}
            setPipelineId={setPipelineId}
            pipelineList={pipelineList}
            detailsVisible={detailsVisible}
            setDetailsVisible={setDetailsVisible}
            historyStore={historyStore}
        />
    )

}

export default inject("historyStore","pipelineStore")(observer(History))
