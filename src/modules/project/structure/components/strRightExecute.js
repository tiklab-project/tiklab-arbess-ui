import React,{useState} from "react";
import {getTime} from "../../../common/client/client";
import StrRightCue from "./strRightCue";
import Subtitle from "../../../config/common/components/subtitle";

const StrRightExecute = props => {

    const {pipeline,status,execState,killInstance,rightExecuteData} = props
    const [isActiveSlide,setIsActiveSlide] = useState(true) // 日志打印滚动条状态

    // 返回值：logList.status，状态（1）成功，（100）：失败， 默认值 0，成功后 logList.status+10
    const singleState = index =>{
        if(execState){
            const zz = execState[0].timeList
            const zIndex =  index+1
            if (zIndex < zz.length){
                return  status(10) //成功
            }else if (zIndex === zz.length){
                return status(0) // 运行
            } else{
                return status(3) //运行--等待运行
            }
        }
    }

    const singleStyle = index => {
        if(execState){
            const zz = execState[0].timeList
            const zIndex = index+1
            if (zIndex < zz.length){
                return  "item-10" //成功
            }else if (zIndex === zz.length){
                return "item-100" // 运行
            } else{
                return "item-all" //运行--等待运行
            }
        }
    }

    const singleTimes = index => {
        if(execState){
            const zz = execState[0].timeList
            if(zz.length-1 < index){
                return getTime(0)
            }
            let time = zz.get(index)
            return getTime(time)
        }
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
                        <span className="card-bt-log">
                            日志
                        </span>
                        <span className="card-bt-time">
                            {singleTimes(index)}
                        </span>
                    </div>
                </div>
    }

    const multiStatus = (groupIndex,index) =>{
        if(execState){
            if(groupIndex > execState.length-1){
                return status(3) //运行--等待运行
            }
            const zz = execState[groupIndex].timeList
            const zIndex =  index+1
            if(groupIndex === execState.length-1){
                if (zIndex < zz.length){
                    return  status(10) //成功
                }else if (zIndex === zz.length){
                    return status(0) // 运行
                } else{
                    return status(3) //运行--等待运行
                }
            }
            if(groupIndex < execState.length-1){
                return  status(10)
            }
        }
    }

    const multiStyle = (groupIndex,index) =>{
        if(execState){
            if (groupIndex > execState.length-1){
                return "item-all" //运行--等待运行
            }
            const zz = execState[groupIndex].timeList
            const zIndex =  index+1
            if (groupIndex === execState.length-1){
                if (zIndex < zz.length){
                    return  "item-10" //成功
                }else if (zIndex === zz.length){
                    return "item-100" // 运行
                } else{
                    return "item-all" //运行--等待运行
                }
            }
            if(groupIndex < execState.length-1){
                return  "item-10"
            }
        }
    }

    const multiTimes = (groupIndex,index) =>{
        if(execState){        
            if(groupIndex >= execState.length){
                return getTime(0)
            }
            const zz = execState[groupIndex].timeList
            if(zz.length-1 < index){
                return getTime(0)
            }
            let time = zz.get(index)
            return getTime(time)
        }
    }

    // 多阶段
    const renderMulti = (group,groupIndex) =>{
        return(
            <div className="str-multi-card" key={groupIndex}>
                {
                    group && group.taskValues && group.taskValues.map((item,index)=>{
                        return  <div className={`st-card ${multiStyle(groupIndex,index)}`} key={index}>
                                    <div className="card-top">
                                        <span className="card-top-state">{multiStatus(groupIndex,index)}</span>
                                        <span className="card-top-title">
                                            <Subtitle type={item.type}/>
                                        </span>
                                    </div>
                        
                                    <div className="card-bt" >
                                        <span className="card-bt-log">
                                            日志
                                        </span>
                                        <span className="card-bt-time">
                                            {multiTimes(groupIndex,index)}
                                        </span>
                                    </div>
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
                    {execState[0].runLog}
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
                <div className="str-single">
                    {
                        rightExecuteData && rightExecuteData.map((item,index)=>{
                            return renderSingle(item,index)
                        })
                    }
                </div>
                :
                <div className="str-multi">
                    {
                        rightExecuteData && rightExecuteData.map((group,groupIndex)=>{
                            return renderMulti(group,groupIndex)
                        })
                    }
                </div>
            }

            {logRunLog()}
       </>
    )
}

export default StrRightExecute