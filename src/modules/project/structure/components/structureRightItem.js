import React,{Fragment} from "react";
import {getTime} from "../../../common/client/client";
import StructureRightCart from "./structureRightCart";
import StructureRightCue from "./structureRightCue";

const StructureRightItem = props =>{

    const {rightFlowData,status,deleteHistoryLog,modeData,index,setIndex,setVisible,setDrawerContent,
        freshen,setFreshen} = props

    // 日志详情
    const log = item => {
        setDrawerContent(item)
        setVisible(true)
    }

    // 确认删除
    const del = () =>{
        deleteHistoryLog(modeData && modeData.historyId).then(()=>{
            setFreshen(!freshen)
            if(index!==0){ setIndex(0) }
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
                                    state={status(item.runState)}
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
                time={getTime(modeData && modeData.runTime)}
                title={`# ${modeData && modeData.findNumber}`}
                action={del}
                actionTitle={"删除"}
            />
            {rightDetails(rightFlowData)}
            {logRunLog()}
        </>
    )
}

export default StructureRightItem