import React,{useEffect,useState} from "react"
import {inject,observer} from "mobx-react";
import historyStore from "../store/HistoryStore";
import HistoryTable from "./HistoryTable";

/**
 * 所有历史页面
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const History = props => {

    const {pipelineStore} = props

    const {findUserInstance,setHistoryList,historyFresh} = historyStore
    const {pipelineList} = pipelineStore

    // 加载状态
    const [isLoading,setIsLoading] = useState(true)

    const [detail,setDetail] = useState(true)

    // 监听关闭定时器的状态
    const pageParam = {
        pageSize: 13,
        currentPage: 1,
    }

    // 获取所有历史列表请求数据
    const [params,setParams] = useState({
        pageParam,
        pipelineId:null,
        state:null,
        type:0
    })

    useEffect(()=>{
        return ()=> {
            setHistoryList([])
        }
    },[])

    let inters = null;
    useEffect(()=>{
        if(detail){
            findHistoryInstance()
        }else {
            clearInterval(inters)
        }
        return ()=> clearInterval(inters)
    },[historyFresh,params,detail])

    /**
     * 获取历史列表
     */
    const findHistoryInstance = () => {
        findUserInstance(params).then(res=>{
            setIsLoading(false)
            if(res.code===0){
                if(!res.data || res.data.dataList.length<1 || res.data.dataList[0].runStatus!=="run"){
                    return
                }
                findInter()
            }
        })
    }

    /**
     * 开启定时器
     */
    const findInter = () => {
        clearInterval(inters)
        inters = setInterval(()=>{
            findUserInstance(params).then(res=>{
                if(!res.data || res.data.dataList.length<1 || res.data.dataList[0].runStatus!=="run"){
                    clearInterval(inters)
                }
            })
        },1000)
    }

    return (
        <HistoryTable
            {...props}
            tableType="history"
            params={params}
            setParams={setParams}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            setDetail={setDetail}
            pipelineList={pipelineList}
            historyStore={historyStore}
        />
    )

}

export default inject("pipelineStore")(observer(History))
