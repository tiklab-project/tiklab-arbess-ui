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

    // 列表数据详情状态
    const [detailsVisible,setDetailsVisible] = useState(false)

    // 筛选条件--执行状态
    const [state,setState] = useState(null)

    // 筛选条件--执行人
    const [userId,setUseId] = useState(null)

    // 筛选条件--执行方式
    const [type,setType] = useState(0)

    useEffect(()=>{
        // 项目成员
        pipeline && findDmUserPage(pipeline.id)
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
                state:state,
                userId:userId,
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
        }
        if(detailsVisible){
            clearInterval(inter)
            initScreen()
        }
        // 组件销毁事件
        return ()=> clearInterval(inter)
    },[historyFresh,pipeline,pageCurrent,userId,state,type,detailsVisible])

    /**
     * 初始化历史筛选条件
     */
    const initScreen = () =>{
        setType(0)
        setState(null)
        setUseId(null)
    }

    return (
        <HistoryTable
            isLoading={isLoading}
            setType={setType}
            setState={setState}
            setUseId={setUseId}
            setIsLoading={setIsLoading}
            pipelineUserList={pipelineUserList}
            detailsVisible={detailsVisible}
            setDetailsVisible={setDetailsVisible}
            historyStore={historyStore}
        />
    )

}

export default inject("historyStore","pipelineStore")(observer(HistoryPipeline))
