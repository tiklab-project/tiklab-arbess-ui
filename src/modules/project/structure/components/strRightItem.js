import React from "react";
import {getTime} from "../../../common/client/client";
import StrRightCue from "./strRightCue";
import Subtitle from "../../../config/common/components/subtitle";

const StrRightItem = props =>{

    const {pipeline,rightFlowData,status,deleteHistoryLog,modeData,setVisible,setDrawerContent} = props

    // 日志详情
    const log = item => {
        setDrawerContent(item)
        setVisible(true)
    }

    // 确认删除
    const del = () =>{
        deleteHistoryLog(modeData && modeData.historyId)
    }

    // 样式
    const style = runState => {
        return `item-${runState}`
    }

    // 多任务
    const renderSingle = (item,index) =>{
        return(
            <div className={`st-card ${style(item.runState)}`} key={index}>
                <div className="card-top">
                    <span className="card-top-state">{status(item.runState)}</span>
                    <span className="card-top-title">
                        <Subtitle type={item.taskType}/>
                    </span>
                </div>
    
                <div className="card-bt" >
                    <span className="card-bt-log" onClick={()=>log(item)}>
                        日志
                    </span>
                    <span className="card-bt-time">
                        {getTime(item.runTime)} 
                    </span>
                </div>
            </div>
        )
    }

    // 多阶段
    const renderMulti = (group,groupIndex) =>{
        return(
            <div className="str-multi-card" key={groupIndex}>
                {
                    group && group.logList && group.logList.map((item,index)=>{
                        return  <div className={`st-card ${style(item.runState)}`} key={index}>
                                    <div className="card-top">
                                        <span className="card-top-state">{status(item.runState)}</span>
                                        <span className="card-top-title">
                                            <Subtitle type={item.taskType}/>
                                        </span>
                                    </div>
                        
                                    <div className="card-bt" >
                                        <span className="card-bt-log" onClick={()=>log(item)}>
                                            日志
                                        </span>
                                        <span className="card-bt-time">
                                            {getTime(item.runTime)} 
                                        </span>
                                    </div>
                                </div>
                    })
                }
            </div>
        )
    }

    // 日志打印
    const logRunLog = () =>{
        if(modeData){
            return   <div className="mid_group-bottom">
                        <div className="mid_group-bottom-title">输出</div>
                        <div className="mid_group-bottom-outLog">
                            {modeData && modeData.runLog}
                        </div>
                    </div>
        }
    }

    return (
        <>
             <StrRightCue
                    way={modeData && modeData.runWay}
                    title={`# ${modeData && modeData.findNumber}`}
                    time={getTime(modeData && modeData.runTime)}
                    action={del}
                    actionTitle={"删除"}
                />
                {
                    pipeline && pipeline.type===1?
                    <div className="str-single">
                        {
                            rightFlowData && rightFlowData.map((item,index)=>{
                                return renderSingle(item,index)
                            })
                        }
                    </div>
                    :
                    <div className="str-multi">
                        {
                            rightFlowData && rightFlowData.map((group,groupIndex)=>{
                                return renderMulti(group,groupIndex)
                            })
                        }
                    </div>
                }
            {logRunLog()}
        </>
    )
}

export default StrRightItem