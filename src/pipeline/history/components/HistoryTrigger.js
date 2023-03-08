import React from "react"
import {Popconfirm, Spin, Tooltip} from "antd";
import {
    CheckCircleOutlined,
    CloseCircleOutlined,
    DeleteOutlined,
    ExclamationCircleOutlined,
    LoadingOutlined,
    MinusCircleOutlined,
    PlayCircleOutlined
} from "@ant-design/icons";
import pip_trigger from "../../../assets/images/svg/pip_trigger.svg"

/**
 * 删除历史
 * @param record
 * @param deleteHistoryLog
 */
const del = (record,deleteHistoryLog) =>{
    deleteHistoryLog(record.instanceId)
}

/**
 * 终止运行
 * @param execStop：终止
 * @param pipeline：流水线信息
 */
const terminateOperation = (execStop,pipeline) => {
    execStop(pipeline.id)
}

/**
 * 表格，历史操作
 * @param record
 * @param deleteHistoryLog：删除
 * @param execStop：终止
 * @returns 终止，删除
 */
export const actionEn = (record,deleteHistoryLog,execStop) =>{
    switch (record.runStatus) {
        case "run":
            return  <Tooltip title={"终止"} onClick={()=>terminateOperation(execStop,record.pipeline)}>
                        <MinusCircleOutlined style={{cursor:"pointer"}}/>
                    </Tooltip>
        default:
            return (
                <Tooltip title={"删除"}>
                    <Popconfirm
                        placement="topRight"
                        title="你确定删除吗"
                        onConfirm={()=>del(record,deleteHistoryLog)}
                        okText="确定"
                        cancelText="取消"
                    >
                        <span style={{cursor:"pointer"}}>
                            <DeleteOutlined />
                        </span>
                    </Popconfirm>
                </Tooltip>
            )
    }
}

/**
 * 运行状态说明
 * @param type：运行类型
 * @returns {string}
 */
export const runStatusText = type =>{
    switch (type) {
        case "error" :
            return  "运行失败"
        case "success" :
            return  "运行成功"
        case "halt":
            return  "运行终止"
        case "run":
            return  "正在运行"
        case "wait":
            return "等待运行"
    }
}

/**
 * 运行状态图标
 * @param type：运行类型
 * @returns {JSX.Element}
 */
export const runStatusIcon = type =>{
    switch(type){
        case "error" :
            return  <CloseCircleOutlined style={{fontSize:16,color:"red"}}/>
        case "success" :
            return  <CheckCircleOutlined style={{fontSize:16,color:"#0063FF"}}/>
        case "halt":
            return  <ExclamationCircleOutlined style={{fontSize:16}}/>
        case "run":
            return  <Spin indicator={<LoadingOutlined style={{fontSize:16}} spin />} />
        case "wait":
            return  <PlayCircleOutlined style={{fontSize:16}}/>
    }
}

/**
 * 运行状态
 * @param type：运行类型
 * @returns {JSX.Element}
 */
export const runStatus = type =>{
    return  <Tooltip title={runStatusText(type)}>
                {runStatusIcon(type)}
            </Tooltip>
}

/**
 * 触发信息
 * @param text（1：手动；2：自动）
 * @param record
 * @returns {JSX.Element}
 */
export const runWay = (text,record) => {
    return (
        <div className="history-table-runWay">
            {
                text===1?
                    <>
                        {/*<Profile userInfo={record.user}/>*/}
                        <div className="runWay-user">{record.user.nickname}手动触发</div>
                    </>
                    :
                    <>
                        <img src={pip_trigger} alt={'trigger'} style={{width:22,height:22}}/>
                        <div className="runWay-user">定时任务自动触发</div>
                    </>
            }
        </div>
    )
}
