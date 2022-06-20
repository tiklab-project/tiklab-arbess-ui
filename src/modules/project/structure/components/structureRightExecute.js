import React,{useState} from "react";
import {Button, Card} from "antd";
import ConfigName from "../../../config/common/component/configCommon/configName";
import {getUser} from "doublekit-core-ui";

const StructureRightExecute = props => {

    const {status,leftExecute,killInstance,rightExecute,runWay,freshen,setFreshen} = props
    const [isActiveSlide,setIsActiveSlide] = useState(true)

    // 返回值：logList.status，状态（1）成功，（100）：失败， 默认值 0，成功后 logList.status+10
    const state = index =>{
        if(leftExecute){
            const i = leftExecute.sort;
            const j = leftExecute.status;
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
        if(leftExecute){
            switch (index) {
                case 0:
                    return leftExecute.oneTime
                case 1:
                    return leftExecute.twoTime
                case 2:
                    return leftExecute.threeTime
                case 3:
                    return leftExecute.fourTime
            }
        }
    }
    
    const cease = () => {
        const params = {
            userId:getUser().userId,
            pipelineId:localStorage.getItem('pipelineId')
        }
        killInstance(params).then(res=>{
            console.log('停止成功',res)
            setFreshen(!freshen)
        }).catch(error=>{
            console.log(error)
        })
    }
    
    const style = index => {
        if(leftExecute){
            const i = leftExecute.sort;
            const j = leftExecute.status;
            if(i > j && index === i ){
                return  'item-100'  // 运行
            }else if (index < i ){
                return  'item-10'  //成功
            }else if(index > i){
                return  'item-all'  //运行--等待运行
            }
        }
    }

    const executeDetails = () =>{
        return rightExecute && rightExecute.map((item,index)=>{
            return(
                <Card className={`mid_group_center-cart ${style(index+1)}`} key={index}>
                    <div className='cart-top'>
                        <span className='cart-top-taskAlias'>{item.taskAlias}</span>
                        <span> -- </span>
                        <span className='cart-top-configName'>  <ConfigName type={item.taskType}/> </span>
                    </div>
                    <div className='cart-center'>
                        <div className='cart-center-item'>
                            <div>状态：{ state(index+1) }</div>
                            <div >时间：{ times(index) }</div>
                        </div>
                    </div>
                    <div className='cart-bottom' >
                        <span className='cart-bottom-span'>
                            日志
                        </span>
                    </div>
                </Card>
            )
        })
    }

    const onWheel = () =>{
        setIsActiveSlide(false)
    }

    const logRunLog = () =>{
        if(leftExecute) {
            const outLog=document.getElementById('outLog')
            if(outLog && isActiveSlide){
                outLog.scrollTop = outLog.scrollHeight
            }
            return  <div className='structure-content-bottom' onWheel={onWheel}>
                        <div className='structure-content-bottom-title'>输出</div>
                        <div className='structure-content-bottom-outLog' id='outLog'>
                            {leftExecute.runLog}
                        </div>
                    </div>
        }
    }

    return(
        <div className="mid_group">
            <div className='mid_group_top'>
                <div className='mid_group_top_tel'>
                    <span className='tel_time'>运行中</span>
                    <span className='tel_time'>执行时长：{leftExecute && leftExecute.allTime} </span>
                    <span className='tel_way'>触发方式：{ runWay (leftExecute && leftExecute.runWay) } </span>
                </div>
                <div className="mid_group_top_del">
                    <Button onClick={()=>cease()}> 停止 </Button>
                </div>
            </div>
            <div className="mid_group_center"> { executeDetails() } </div>
           { logRunLog() }
       </div>
    )
}

export default StructureRightExecute