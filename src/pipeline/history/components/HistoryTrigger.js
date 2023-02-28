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
import {Profile} from "tiklab-eam-ui";
import pip_trigger from "../../../assets/images/svg/pip_trigger.svg"

/**
 * 删除历史
 * @param record
 * @param deleteHistoryLog
 */
const del = (record,deleteHistoryLog) =>{
    deleteHistoryLog(record.historyId)
}

/**
 * 终止运行
 * @param killInstance：终止
 * @param pipeline：流水线信息
 */
const terminateOperation = (killInstance,pipeline) => {
    killInstance(pipeline.id)
}

/**
 * 表格，历史操作
 * @param record
 * @param deleteHistoryLog：删除
 * @param killInstance：终止
 * @returns 终止，删除
 */
export const actionEn = (record,deleteHistoryLog,killInstance) =>{
    switch (record.runStatus) {
        case 30:
            return  <Tooltip title={"终止"} onClick={()=>terminateOperation(killInstance,record.pipeline)}>
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
 * 运行状态
 * @param type：运行类型
 * @returns {JSX.Element}
 */
export const runStatus = type =>{
    switch(type){
        case 1 :
            //失败
            return  <Tooltip title={"运行失败"}>
                        <CloseCircleOutlined style={{fontSize:16,color:"red"}}/>
                    </Tooltip>
        case 10 :
            //成功
            return  <Tooltip title={"运行成功"}>
                        <CheckCircleOutlined style={{fontSize:16,color:"#0063FF"}}/>
                    </Tooltip>
        case 20:
            //被迫停止
            return  <Tooltip title={"运行终止"}>
                        <ExclamationCircleOutlined style={{fontSize:16}}/>
                    </Tooltip>
        case 30:
            //运行
            return  <Tooltip title={"正在运行"}>
                        <Spin indicator={<LoadingOutlined style={{ fontSize: 16 }} spin />} />
                    </Tooltip>
        case 3:
            //运行--等待运行
            return <Tooltip title={"等待运行"}>
                        <PlayCircleOutlined style={{fontSize:16}}/>
                    </Tooltip>
    }
}

/**
 * 触发信息
 * @param text（1：手动；2：自动）
 * @param record
 * @returns {JSX.Element}
 */
export const runWay = (text,record) => {
    return (
        <div className="str-table-runWay">
            {
                text===1?
                    <>
                        <Profile userInfo={record.user}/>
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
