import React from "react";
import {getTime} from "../../../common/utils/Client";
import {runStatusIcon,runStatusText} from "./HistoryTrigger";

const HistoryDetailItem = props =>{

    const {pipeline,execData,setTreeData,setLogData,setExecIndex,setId,isRun} = props

    /**
     * 设置日志
     * @param item
     * @param itemIndex
     */
    const log = (item,itemIndex) =>{
        if(isRun){
            setExecIndex(itemIndex)
            setId(item.id)
        }else{
            setTreeData(item)
            setLogData(item)
        }
    }

    const renderTask = (item,index) =>{
        return <div className={`st-card item-${item.runState}`} key={index}>
            <div className="card-top">
                <span className="card-top-state">{runStatusIcon(item.runState)}</span>
                <span className="card-top-title">{item.taskName}</span>
            </div>
            <div className="card-ct">{runStatusText(item.runState)}</div>
            <div className="card-bt">
                <span className="card-bt-log" onClick={()=>log(item,index)}>日志</span>
                <span className="card-bt-time">{item.runTimeDate}</span>
            </div>
        </div>
    }

    const renderStage = (item,index) =>{
        return <div className={`st-card item-${item.stageState}`} key={index}>
            <div className="card-top">
                <span className="card-top-state">{runStatusIcon(item.stageState)}</span>
                <span className="card-top-title">{item.stageName}</span>
            </div>
            <div className="card-ct">{runStatusText(item.stageState)}</div>
            <div className="card-bt">
                <span className="card-bt-log" onClick={()=>log(item,index)}>日志</span>
                <span className="card-bt-time">{getTime(item.stageTime)}</span>
            </div>
        </div>
    }

    return(
        <div className="str-multi">
            {
                execData && execData.map((item,index)=>(
                    pipeline && pipeline.type===1?renderTask(item,index):renderStage(item,index)
                ))
            }
        </div>
    )
}

export default HistoryDetailItem
