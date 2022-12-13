import React,{useState} from "react";
import {getTime} from "../../../common/client/client";
import StrRightCue from "./strRightCue";
import Subtitle from "../../../config/common/components/subtitle";

const StrRightExec = props => {

    const {pipeline,status,execState,killInstance,rightExecuteData,setVisible,setDrawerContent} = props
    const [isActiveSlide,setIsActiveSlide] = useState(true) // 日志打印滚动条状态

    // 返回值：logList.status，状态（1）成功，（100）：失败， 默认值 0，成功后 logList.status+10
    const singleState = index =>{
        if(execState){
            const zz = execState[0].runLogList[index].runState
            return status(zz)
        }
    }

    const singleStyle = index => {
        if(execState){
            const zz = execState[0].runLogList[index].runState
            return `item-${zz}`
        }
    }

    const singleTimes = index => {
        if(execState){
            const zz = execState[0].runLogList[index].runTime
            return getTime(zz)
        }
    }

    const singleLog = index =>{
        setDrawerContent(execState[0].runLogList[index])
        setVisible(true)
    }

    // 多任务
    const renderSingle = (item,index) =>{
        return  <div className={`st-card ${singleStyle(index)}`} key={index}>
                    <div className="card-top">
                        <span className="card-top-state">{singleState(index)}</span>
                        <span className="card-top-title">
                            <Subtitle type={item.type}/>
                        </span>
                    </div>

                    <div className="card-bt" >
                        <span className="card-bt-log" onClick={()=>singleLog(index)}>
                            日志
                        </span>
                        <span className="card-bt-time">
                            {singleTimes(index)}
                        </span>
                    </div>
                </div>
    }

    const multiStatus = (groupIndex,listIndex,index) =>{
        if(execState){
            const  a = execState[groupIndex].runList[listIndex]
            const aa =  a &&
                a.runLogList[index] &&
                a.runLogList[index].runState
            return status(aa)
        }
    }

    const multiCt = (groupIndex,listIndex,index) =>{
        if(execState){
            const  a = execState[groupIndex].runList[listIndex]
            const aa =  a &&
                a.runLogList[index] &&
                a.runLogList[index].runState
            switch (aa) {
                case 10:
                    return "运行成功" 
                case 0:
                    return "正在运行" 
                case 3:
                    return "等待运行"            
            }
        }
    }

    const multiStyle = (groupIndex,listIndex,index) =>{
        if(execState){
            const  a = execState[groupIndex].runList[listIndex]
            const aa =  a &&
                a.runLogList[index] &&
                a.runLogList[index].runState
            return `item-${aa}`
        }
    }

    const multiTimes = (groupIndex,listIndex,index) =>{
        if(execState){
            const  a = execState[groupIndex].runList[listIndex]
            const aa =  a &&
                        a.runLogList[index] &&
                        a.runLogList[index].runTime

            return getTime(aa)
        }
    }

    const multiLog = (groupIndex,listIndex,index) =>{
        setVisible(true)
        setDrawerContent(execState[groupIndex].runList[listIndex].runLogList[index])
    }

    // 多阶段
    const renderMulti = (group,groupIndex) =>{
        return(
           <div  className="str-multi-group" key={groupIndex}>
                {
                    group && group.stagesList && group.stagesList.map((list,listIndex)=>{
                        return  <div className="str-multi-card" key={listIndex}>
                        {
                            list && list.taskValues && list.taskValues.map((item,index)=>{
                                return  <div className={`st-card ${multiStyle(groupIndex,listIndex,index)}`} key={index}>
                                            <div className="card-top">
                                                <span className="card-top-state">
                                                    {multiStatus(groupIndex,listIndex,index)}
                                                </span>
                                                <span className="card-top-title">
                                                    <Subtitle type={item.type}/>
                                                </span>
                                            </div>
                                            <div className="card-ct">
                                                {multiCt(groupIndex,listIndex,index)}
                                            </div>
                                            <div className="card-bt" >
                                                <span className="card-bt-log" onClick={()=>multiLog(groupIndex,listIndex,index)}>
                                                    日志
                                                </span>
                                                <span className="card-bt-time">
                                                    {multiTimes(groupIndex,listIndex,index)}
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

    // 关闭滚动条一直在下面
    const onWheel = () =>{
        setIsActiveSlide(false)
    }
    
    const runLog = execState =>{
        let a = ""
        execState[0].runLogList.map(item=>{
            return a = a + item.runLog
        })
        return a
    }

    // 日志打印
    const logRunLog = () =>{
        if(execState) {
            const outLog=document.getElementById("outLog")
            if(outLog && isActiveSlide){
                outLog.scrollTop = outLog.scrollHeight
            }
            return  <div className="mid_group-bottom" onWheel={onWheel}>
                <div className="mid_group-bottom-title">输出</div>
                <div className="mid_group-bottom-outLog" id="outLog">
                    {runLog(execState)}
                </div>
            </div>
        }
    }

    const cease = () => {
        killInstance(pipeline.id)
    }

    return(
        <>
            <StrRightCue
                way={execState && execState[0].runWay}
                time={getTime(execState && execState[0].runTime)}
                action={cease}
                title={"运行中"}
                actionTitle={"停止"}
            />
            {
                pipeline && pipeline.type===1?
                <>
                    <div className="str-single">
                        {
                            rightExecuteData && rightExecuteData.map((item,index)=>{
                                return renderSingle(item,index)
                            })
                        }
                    </div>
                    { logRunLog() }
                </>
                :
                <div className="str-multi">
                    {
                        rightExecuteData && rightExecuteData.map((group,groupIndex)=>{
                            return renderMulti(group,groupIndex)
                        })
                    }
                </div>
            }
       </>
    )
}

export default StrRightExec