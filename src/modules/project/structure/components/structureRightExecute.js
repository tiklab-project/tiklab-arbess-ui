import React,{useState} from "react";
import {Button, Card} from "antd";
import ConfigName from "../../../config/common/component/configCommon/configName";
import {getUser} from "doublekit-core-ui";

const StructureRightExecute = props => {

    const {status,execState,killInstance,rightExecuteData,runWay,freshen,setFreshen,setPageCurrent} = props
    const [isActiveSlide,setIsActiveSlide] = useState(true)

    // 返回值：logList.status，状态（1）成功，（100）：失败， 默认值 0，成功后 logList.status+10
    const state = index =>{
        if(execState){
            const i = execState.sort
            const j = execState.status
            if(i > j && index === i ){
                return  status(0)  // 运行
            }else if (index < i ){
                return  status(1)  //成功
            }else if(i<j){
                return  status(2)  //失败
            }else if(index > i){
                return  status(3)  //运行--等待运行
            }
        }
    }
    
    const times = index => {
        if(execState){
            switch (index) {
                case 0:
                    return execState.oneTime
                case 1:
                    return execState.twoTime
                case 2:
                    return execState.threeTime
                case 3:
                    return execState.fourTime
            }
        }
    }
    
    const cease = () => {
        const params = {
            userId:getUser().userId,
            pipelineId:localStorage.getItem("pipelineId")
        }
        killInstance(params).then(res=>{
            console.log("停止成功",res)
            setPageCurrent(1)
            setFreshen(!freshen)
        }).catch(error=>{
            console.log(error)
        })
    }
    
    const style = index => {
        if(execState){
            const i = execState.sort
            const j = execState.status
            if(i > j && index === i ){
                return  "item-100"  // 运行
            }else if (index < i ){
                return  "item-10"  //成功
            }else if(index > i){
                return  "item-all"  //运行--等待运行
            }
        }
    }

    // 关闭滚动条一直在下面
    const onWheel = () =>{
        setIsActiveSlide(false)
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
                    </div>
        }
    }

    const executeDetails = rightExecuteData =>{
        return rightExecuteData && rightExecuteData.map((item,index)=>{
            return(
                <Card className={`mid_group_center-cart ${style(index+1)}`} key={index}>
                    <div className="cart-top">
                        <span className="cart-top-taskAlias">{item.taskAlias}</span>
                        <span> -- </span>
                        <span className="cart-top-configName">
                            <ConfigName type={item.taskType}/>
                        </span>
                    </div>
                    <div className="cart-center">
                        <div className="cart-center-item">
                            <div>状态：{ state(index+1) }</div>
                            <div >时间：{ times(index) }</div>
                        </div>
                    </div>
                    <div className="cart-bottom" >
                        <span className="cart-bottom-span">
                            日志
                        </span>
                    </div>
                </Card>
            )
        })
    }

    return(
        <div className="mid_group">
            <div className="mid_group_top">
                <div className="mid_group_top_tel">
                    <span className="tel_time">运行中</span>
                    <span className="tel_time">执行时长：{execState && execState.allTime} </span>
                    <span className="tel_way">触发方式：{ runWay (execState && execState.runWay) } </span>
                </div>
                <div className="mid_group_top_del">
                    <Button onClick={()=>cease()}> 停止 </Button>
                </div>
            </div>
            <div className="mid_group_center"> { executeDetails(rightExecuteData) } </div>
           { logRunLog() }
       </div>
    )
}

export default StructureRightExecute