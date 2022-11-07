import React,{useState,Fragment} from "react";
import {getUser} from "tiklab-core-ui";
import {InfoOutlined} from "@ant-design/icons";
import StructureRightCart from "./structureRightCart";
import StructureRightCue from "./structureRightCue";

const StructureRightExecute = props => {

    const {status,execState,killInstance,rightExecuteData,freshen,setFreshen,setPageCurrent,pipelineId} = props
    const [isActiveSlide,setIsActiveSlide] = useState(true) // 日志打印滚动条状态

    // 返回值：logList.status，状态（1）成功，（100）：失败， 默认值 0，成功后 logList.status+10
    const state = index =>{
        if(execState){
            const zz = execState.timeList
            if (index+1 < zz.length){
                return  status(1) //成功
            }else if (index+1 === zz.length){
                return status(0) // 运行
            } else{
                return status(3) //运行--等待运行
            }
        }
    }

    const style = index => {
        if(execState){
            const zz = execState.timeList
            if (index < zz.length){
                return  "item-10" //成功
            }else if (index  === zz.length){
                return "item-100" // 运行
            } else{
                return "item-all" //运行--等待运行
            }
        }
    }


    const times = index => {
        if(execState){
            const zz = execState.timeList
            console.log("第"+index+"阶段的时间为："+zz.get(index))
            return zz.get(index)
            // switch (index) {
            //     case 0:return execState.oneTime
            //     case 1:return execState.twoTime
            //     case 2:return execState.threeTime
            //     case 3:return execState.fourTime
            // }
        }
    }
    
    const cease = () => {
        const params = {
            userId:getUser().userId,
            pipelineId:pipelineId
        }
        killInstance(params).then(res=>{
            setPageCurrent(1)
            setFreshen(!freshen)
        }).catch(error=>{
            console.log(error)
        })
    }

    // 关闭滚动条一直在下面
    const onWheel = () =>{
        setIsActiveSlide(false)
    }

    const executeDetails = rightExecuteData =>{
        return <div className="mid_group_center">
            {
                rightExecuteData && rightExecuteData.map((item,index)=>{
                    return  <Fragment key={index}>
                                <StructureRightCart
                                    item={item}
                                    style={style(index+1)}
                                    state={state(index)}
                                    time={times(index)}
                                />
                            </Fragment>
                })
            }
        </div>
    }

    const logRunLog = () =>{
        if(execState) {
            const outLog=document.getElementById("outLog")
            if(outLog && isActiveSlide){
                outLog.scrollTop = outLog.scrollHeight
            }
            return  <div className="structure-content-bottom" onWheel={onWheel}>
                <div className="structure-content-bottom-title">输出</div>
                <div className="structure-content-bottom-outLog" id="outLog">
                    {execState.runLog}
                </div>
                {/*<div className="structure-content-bottom-runLog">{status(0)}</div>*/}
            </div>
        }
    }

    return(
        <>
            <StructureRightCue
                way={execState && execState.runWay}
                time={execState && execState.allTime}
                title={"运行中"}
                action={cease}
                actionTitle={"停止"}
                icon={<InfoOutlined/>}
            />
            {executeDetails(rightExecuteData)}
            {logRunLog()}
       </>
    )
}

export default StructureRightExecute