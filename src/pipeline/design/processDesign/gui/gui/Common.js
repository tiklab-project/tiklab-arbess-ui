import React from "react";
import {PlusOutlined} from "@ant-design/icons";
import {Tooltip} from "antd";
import pip_zengjia from "../../../../../assets/images/svg/pip_zengjia.svg";

/**
 * 值是否相同
 */
export const WhetherChange = (newValue,lastValue) => {
    if (newValue == null){
        return false
    }
    if (newValue === ""  && lastValue == null){
        return false
    }
    return newValue !== lastValue
}

/**
 * 添加最后一项多阶段或者多任务按钮
 */
export const TaskFinalAdd = (type,list,title,newTask) =>{
    if(list && list.length>0){
        return (
            <>
                <div className="group-flow">
                    <div className={`group-flow_btn group-flow_${type}`} />
                </div>
                <div className="group-create">
                    <div className="group-head">
                        <div className="name" style={{opacity:0}}/>
                    </div>
                    <div className="newStages-multi">
                        <div className="newStages-contents add-newStage">
                            <div className="newStages-content">
                                <div className="newStages-job">
                                    <div onClick={()=>newTask()} className="newStages-job-content">
                                        <PlusOutlined/>
                                        <span style={{paddingLeft:5}}>{title}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
    return (
        <div className="group-create">
            <div className="group-head">
                <div className="name" style={{opacity:0}}/>
            </div>
            <div className="newStages-multi">
                <div className="newStages-job">
                    <div onClick={()=>newTask()} className="newStages-job-content">
                        <PlusOutlined/>
                        <span style={{paddingLeft:5}}>{title}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}


/**
 * 插入多阶段或多任务按钮
 */
export const TaskInsertBtn = (insertData,group,groupIndex,type) =>{
    return (
        <div className="group-flow">
            <div className={`group-flow_btn group-flow_${type}`}>
                <Tooltip title="添加新任务">
                    <img
                        src={pip_zengjia}
                        style={{width:22,height:22}}
                        className="group-flow_btn_i"
                        alt={"添加"}
                        onClick={()=>insertData(group,groupIndex)}
                    />
                </Tooltip>
            </div>
        </div>
    )
}
