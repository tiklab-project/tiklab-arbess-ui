import React,{useEffect,useState} from "react";
import {inject,observer} from "mobx-react";
import HistoryTable from "./HistoryTable";

/**
 * 单个流水线历史页面
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const HistoryPipeline = props => {

    const {historyStore,pipelineStore} = props

    const {findPipelineInstance,setHistoryList,historyFresh,pageCurrent,setPageCurrent} = historyStore
    const {pipeline,findDmUserPage,pipelineUserList} = pipelineStore

    // 加载
    const [isLoading,setIsLoading] = useState(true)

    // 获取流水线历史列表请求数据
    const [params,setParams] = useState({
        state:null,
        userId:null,
        type:0
    })

    useEffect(()=>{
        // 项目成员
        pipeline && findDmUserPage({
            pageParam:{
                pageSize:5,
                currentPage:1
            },
            domainId:pipeline.id,
        })
        return ()=> {
            setPageCurrent(1)
            setHistoryList([])
        }
    },[pipeline])

    let inter=null
    useEffect(() => {
        // 所有历史列表
        if(pipeline){
            inter = setInterval(()=>findPipelineInstance({
                pipelineId:pipeline.id,
                ...params
            }).then(res=>{
                setIsLoading(false)
                if(res.code===0){
                    if(!res.data) return clearInterval(inter)
                    if(res.data.dataList.length<1 || res.data.dataList[0].runStatus!=="run") clearInterval(inter)
                }
                else clearInterval(inter)
            }),1000)
        }
        // 组件销毁事件
        return ()=> clearInterval(inter)
    },[historyFresh,pipeline,pageCurrent,params])

    return (
        <HistoryTable
            {...props}
            params={params}
            setParams={setParams}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            pipelineUserList={pipelineUserList}
            historyStore={historyStore}
        />
    )

}

export default inject("historyStore","pipelineStore")(observer(HistoryPipeline))
