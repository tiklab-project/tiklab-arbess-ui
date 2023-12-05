import React,{useState,useEffect} from "react";
import HistoryDetail from "./HistoryDetail";
import historyStore from "../store/HistoryStore";

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
                if(res.data) return  setHistoryItem(res.data)
                return props.history.push(`/404`)
            }
        })
    },[])

    const back = () => props.history.push(`/pipeline/${params.id}/history`)

    return (
        <HistoryDetail
            back={back}
            historyItem={historyItem}
            setHistoryItem={setHistoryItem}
            historyStore={historyStore}
        />
    )
}

export default HistoryInstance
