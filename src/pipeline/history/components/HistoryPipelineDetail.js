import React,{useState,useEffect} from "react";
import HistoryDetail from "./HistoryDetail";
import {observer,inject} from "mobx-react";

const HistoryPipelineDetail = props => {

    const {historyStore,match:{params}} = props

    const {findOneInstance} = historyStore

    // 历史信息
    const [historyItem,setHistoryItem] = useState({})

    useEffect(()=>{
        // 获取当前构建历史信息
        findOneInstance(params.instanceId).then(res=>{
            if(res.code===0){
                if(res.data) return  setHistoryItem(res.data)
                return props.history.push(`/index/404`)
            }
        })
    },[])

    const back = () => props.history.push(`/index/pipeline/${params.id}/structure`)

    return (
        <HistoryDetail
            back={back}
            firstItem={"历史"}
            historyItem={historyItem}
            historyStore={historyStore}
        />
    )
}

export default inject('historyStore')(observer(HistoryPipelineDetail))
