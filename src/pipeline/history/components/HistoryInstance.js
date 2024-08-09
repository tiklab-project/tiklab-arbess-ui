import React,{useState,useEffect} from "react";
import historyStore from "../store/HistoryStore";
import HistoryRunDetail from "./HistoryRunDetail";

/**
 * 历史运行实例
 * @param {*} props
 * @returns
 */
const HistoryInstance = props => {

    const {match:{params}} = props

    const {findOneInstance} = historyStore

    // 历史信息
    const [historyItem,setHistoryItem] = useState({})

    useEffect(()=>{
        // 获取当前构建历史信息
        findOneInstance(params.instanceId).then(res=>{
            if(res.code===0){
                setHistoryItem(res.data)
            }
        })
    },[params.instanceId])

    const back = () => props.history.push(`/pipeline/${params.id}/history`)

    return (
        <HistoryRunDetail
            back={back}
            historyItem={historyItem}
            setHistoryItem={setHistoryItem}
        />
    )
}

export default HistoryInstance
