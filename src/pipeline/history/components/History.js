import React,{useEffect,useState} from "react"
import {inject,observer} from "mobx-react";
import HistoryTable from "./HistoryTable";
import HistoryDetail from "./HistoryDetail";

/**
 * 所有历史页面
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const History = props => {

    const {historyStore,pipelineStore} = props

    const {findUserInstance,setHistoryList,historyFresh,pageCurrent,setPageCurrent} = historyStore
    const {findUserPipeline,pipelineList} = pipelineStore

    // 列表数据详情状态
    const [detailsVisible,setDetailsVisible] = useState(false)

    // 加载状态
    const [isLoading,setIsLoading] = useState(true)

    // 历史信息
    const [historyItem,setHistoryItem] = useState({})

    // 获取所有历史列表请求数据
    const [params,setParams] = useState({
        pipelineId:null,
        state:null,
        type:0
    })

    useEffect(()=>{
        // 所有流水线
        findUserPipeline()
        return ()=> {
            setPageCurrent(1)
            setHistoryList([])
        }
    },[])

    let inter = null
    useEffect(()=>{
        // 获取所有历史列表
        inter = setInterval(()=>findUserInstance(params).then(res=>{
            setIsLoading(false)
            if(res.code===0){
                if(!res.data) return clearInterval(inter)
                if(res.data.dataList.length<1 || res.data.dataList[0].runStatus!=="run") clearInterval(inter)
            }
            else clearInterval(inter)
        }),1000)
        if(detailsVisible){
            clearInterval(inter)
        }
        return ()=> clearInterval(inter)
    },[historyFresh,pageCurrent,params,detailsVisible])

    /**
     * 初始化历史筛选条件
     */
    const initScreen = () =>{
        setParams({
            pipelineId:null,
            state:null,
            type:0
        })
    }

    /**
     * 返回
     */
    const back = () => {
        setDetailsVisible(false)
        initScreen()
    }

    const disDetails = record =>{
        setDetailsVisible(true)
        setHistoryItem(record)
    }

    if(detailsVisible){
        return  <HistoryDetail
                    firstItem={"历史"}
                    tableType="history"
                    back={back}
                    historyItem={historyItem}
                    historyStore={historyStore}
                />
    }

    return (
        <HistoryTable
            {...props}
            tableType="history"
            disDetails={disDetails}
            params={params}
            setParams={setParams}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            pipelineList={pipelineList}
            historyStore={historyStore}
        />
    )

}

export default inject("historyStore","pipelineStore")(observer(History))
