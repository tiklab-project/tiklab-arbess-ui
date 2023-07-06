import React from "react";
import {DeleteOutlined, PlusOutlined,ExclamationCircleOutlined} from "@ant-design/icons";
import {Popconfirm, Tooltip} from "antd";
import TaskIcon from "./TaskIcon";
import pip_zengjia from "../../../../../assets/images/svg/pip_zengjia.svg";

/**
 * 值是否相同
 * @param newValue
 * @param lastValue
 * @returns {boolean}
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
 * @param type：多阶段||多任务
 * @param list：数据列表
 * @param title：新阶段||新任务
 * @param newTask：点击事件（添加任务）
 * @returns {JSX.Element}
 * @constructor
 */
export const TaskFinalAdd = (type,list,title,newTask) =>{
    if(list && list.length>0){
        return  <>
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
 * 渲染任务标题
 * @param item
 * @param showDetail：任务详情事件
 * @param deep
 * @param delTask：删除任务事件
 * @param validData：未填的必需任务
 * @returns {JSX.Element}
 */
export const TaskTypeContent = (item,deep,showDetail,delTask,validData) =>{
    const valid = taskId => validData && validData.some(li=>li===taskId)
    return (
        <div onClick={()=>showDetail(item)}
             style={{paddingLeft:deep}}
             className={`newStages-job-content ${valid(item.taskId)?"job-name":""} ${item.taskType<10?"newStages-job-code":""}`}
        >
            <div className="newStages-job-sub">
                <span className="newStages-job-icon"><TaskIcon type={item.taskType}/></span>
                <span className="newStages-job-title">{item.taskName}</span>
            </div>
            {
                valid(item.taskId) &&
                <div className="newStages-job-warn"><ExclamationCircleOutlined /></div>
            }
            <Popconfirm
                title="你确定删除吗"
                onConfirm={e=>delTask(e,item)}
                onCancel={e=>e.stopPropagation()}
                okText="确定"
                cancelText="取消"
            >
                <div className="newStages-job-del" onClick={e=>e.stopPropagation()}>
                    <DeleteOutlined />
                </div>
            </Popconfirm>
        </div>
    )
}

/**
 * 插入多阶段或多任务按钮
 * @param insertData：插入数据操作
 * @param group
 * @param groupIndex
 * @param type：多任务或多阶段
 * @returns {JSX.Element}
 * @constructor
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
