import React from "react";
import Subtitle from "../../../config/common/components/subtitle";
import {getTime} from "../../../common/client/client";

const StrItem = props =>{

    const {pipeline,itemData,status,setLogContent} = props

    // 日志详情
    const log = item => {
        setLogContent(item)
    }

    // 样式
    const style = runState => {
        return `item-${runState}`
    }

    const statusText = runState =>{
        switch (runState) {
            case 1:
                return "运行失败"
            case 10:
                return "运行成功"
            case 20:
                return "运行终止"
        }
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
                <div className="card-ct">
                    {statusText(item.runState)}
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
            <div className="str-multi-group" key={groupIndex}>
                {
                    group && group.runList && group.runList.map((list,listIndex)=>{
                        return <div className="str-multi-card" key={listIndex}>
                            {
                                list && list.runLogList && list.runLogList.map((item,index)=>{
                                    return  <div className={`st-card ${style(item.runState)}`} key={index}>
                                        <div className="card-top">
                                            <span className="card-top-state">{status(item.runState)}</span>
                                            <span className="card-top-title">
                                                    <Subtitle type={item.taskType}/>
                                                </span>
                                        </div>
                                        <div className="card-ct">
                                            {statusText(item.runState)}
                                        </div>
                                        <div className="card-bt">
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
                            itemData && itemData.runLogList && itemData.runLogList.map((item,index)=>{
                                return renderSingle(item,index)
                            })
                        }
                    </div>
                    :
                    <div className="str-multi">
                        {
                            itemData && itemData.runList && itemData.runList.map((group,groupIndex)=>{
                                return renderMulti(group,groupIndex)
                            })
                        }
                    </div>
            }
        </>
    )
}

export default StrItem