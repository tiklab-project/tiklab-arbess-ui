import React from "react";
import {getTime} from "../../../common/client/client";
import Subtitle from "../../../config/common/components/subtitle";

const StrExec = props => {

    const {pipeline,status,execData,setLogContent} = props

    const singleLog = item =>{
        setLogContent(item)
    }

    // 多任务
    const renderSingle = (item,index) =>{
        return  <div className={`st-card item-${item.runState}`} key={index}>
                    <div className="card-top">
                        <span className="card-top-state">{status(item.runState)}</span>
                        <span className="card-top-title">
                            <Subtitle type={item.type}/>
                        </span>
                    </div>

                    <div className="card-bt" >
                        <span className="card-bt-log" onClick={()=>singleLog(item)}>
                            日志
                        </span>
                        <span className="card-bt-time">
                            {getTime(item.runTime)}
                        </span>
                    </div>
                </div>
    }

    const multiCt = runState =>{
        switch (runState) {
            case 10:
                return "运行成功" 
            case 0:
                return "正在运行" 
            case 3:
                return "等待运行"  
            case 1:
                return "运行失败"          
        }
    }

    const multiLog = item =>{
        setLogContent(item)
    }

    // 多阶段
    const renderMulti = (group,groupIndex) =>{
        return(
           <div  className="str-multi-group" key={groupIndex}>
                {
                    group && group.runList && group.runList.map((list,listIndex)=>{
                        return  <div className="str-multi-card" key={listIndex}>
                        {
                            list && list.runLogList && list.runLogList.map((item,index)=>{
                                return  <div className={`st-card item-${item.runState}`} key={index}>
                                            <div className="card-top">
                                                <span className="card-top-state">
                                                    {status(item.runState)}
                                                </span>
                                                <span className="card-top-title">
                                                    <Subtitle type={item.taskType}/>
                                                </span>
                                            </div>
                                            <div className="card-ct">
                                                {multiCt(item.runState)}
                                            </div>
                                            <div className="card-bt" >
                                                <span className="card-bt-log" onClick={()=>multiLog(item)}>
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
                    })
                }
           </div>
        )
    }

    return(
        <>
            {
                pipeline && pipeline.type===1?
                <div className="str-single">
                    {
                       execData &&execData.runList && execData.runLogList.map((item,index)=>{
                            return renderSingle(item,index)
                        })
                    }
                </div>
                :
                <div className="str-multi">
                    {
                        execData && execData.runList && execData.runList.map((group,groupIndex)=>{
                            return renderMulti(group,groupIndex)
                        })
                    }
                </div>
            }
       </>
    )
}

export default StrExec