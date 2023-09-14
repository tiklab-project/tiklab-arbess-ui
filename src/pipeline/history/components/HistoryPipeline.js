import React,{useEffect,useState} from "react";
import {inject,observer} from "mobx-react";
import historyStore from "../store/HistoryStore";
import HistoryTable from "./HistoryTable";

/**
 * 单个流水线历史页面
 */
const HistoryPipeline = props => {

    const {pipelineStore} = props

    const {findPipelineInstance,setHistoryList} = historyStore
    const {pipeline} = pipelineStore

    // 加载状态
    const [isLoading,setIsLoading] = useState(true)

    // 监听关闭定时器的状态
    const [detail,setDetail] = useState(false)

    const pageParam = {
        pageSize: 13,
        currentPage: 1,
    }

    // 获取流水线历史列表请求数据
    const [params,setParams] = useState({
        pageParam,
        state:null,
        userId:null,
        type:0
    })

    useEffect(()=>{
        return ()=> {
            setHistoryList([])
        }
    },[])

    let inters=null
    useEffect(() => {
        if(detail){
            clearInterval(inters)
        }else {
            findHistoryInstance()
        }
        return ()=> clearInterval(inters)
    },[params,detail])

    /**
     * 获取所有历史列表
     */
    const findHistoryInstance = () =>{
        findPipelineInstance({
            pipelineId:pipeline.id,
            ...params
        }).then(res=>{
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
    const findInter = () =>{
        clearInterval(inters)
        inters = setInterval(()=>{
            findPipelineInstance({
                pipelineId:pipeline.id,
                ...params
            }).then(res=>{
                if(!res.data || res.data.dataList.length<1 || res.data.dataList[0].runStatus!=="run"){
                    clearInterval(inters)
                }
            })
        },1000)
    }

    return (
        <HistoryTable
            {...props}
            historyType="historyPipeline"
            params={params}
            setParams={setParams}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            detail={detail}
            setDetail={setDetail}
            historyStore={historyStore}
        />
    )

}

export default inject("pipelineStore")(observer(HistoryPipeline))
