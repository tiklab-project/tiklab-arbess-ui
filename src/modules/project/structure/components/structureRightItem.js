import React,{Fragment} from "react";
import {Modal} from "antd";
import {ExclamationCircleOutlined} from "@ant-design/icons";
import {getTime} from "../../../../common/client/client";
import StructureRightCart from "./structureRightCart";
import StructureRightCue from "./structureRightCue";

const StructureRightItem = props =>{

    const {rightFlowData,status,deleteHistoryLog,modeData,index,setIndex,setVisible,setDrawerContent,
        freshen,setFreshen,setPageCurrent} = props

    // 状态
    const state = item =>{
        switch(item.runState){
            case 1:
                return status(2) //失败
            case 10:
                return status(1) //成功
            default:
                return status(4) //被迫停止
        }
    }

    // 日志详情
    const log = item => {
        setDrawerContent(item)
        setVisible(true)
    }

    // 删除提示
    const del = () =>{
        Modal.confirm({
            title: "删除",
            icon: <ExclamationCircleOutlined />,
            content: "删除后数据无法恢复",
            onOk:()=>delHistory(modeData),
            okText: "确认",
            cancelText: "取消",
        })
    }

    // 确认删除
    const delHistory = modeData =>{
        deleteHistoryLog(modeData &&modeData.historyId).then(()=>{
            setFreshen(!freshen)
            setPageCurrent(1)
            if(index!==0){ setIndex(0) }
        }).catch(error=>{
            console.log(error)
        })
    }

    // 样式
    const style = runState => {
        return `item-${runState}`
    }

    // cart
    const rightDetails = rightFlowData =>{
        return <div className="mid_group_center">
            {
                rightFlowData && rightFlowData.map((item,index)=>{
                    return  <Fragment key={index}>
                                <StructureRightCart
                                    item={item}
                                    style={style(item.runState)}
                                    state={state(item)}
                                    time={getTime(item.runTime)}
                                    log={log}
                                />
                            </Fragment>
                })
            }
        </div>
    }

    // 日志
    const logRunLog = () =>{
        if(modeData){
            return   <div className="structure-content-bottom">
                        <div className="structure-content-bottom-title">输出</div>
                        <div className="structure-content-bottom-outLog">
                            {modeData && modeData.runLog}
                        </div>
                    </div>
        }
    }

    return (
        <>
            <StructureRightCue
                way={modeData && modeData.runWay}
                time={modeData && modeData.execTime}
                title={`# ${modeData && modeData.findNumber}`}
                action={del}
                actionTitle={"删除"}
                icon={<ExclamationCircleOutlined/>}
            />
            {rightDetails(rightFlowData)}
            {logRunLog()}
        </>
    )
}

export default StructureRightItem