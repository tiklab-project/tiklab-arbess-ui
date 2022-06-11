import React from "react";
import {Button, Card} from "antd";
import ConfigName from "../../config/common/component/configCommon/configName";

const StructureRightExecute = props => {

    const {status,leftExecute,killInstance,rightExecute,runWay,index,freshen,setFreshen} = props
    const pipelineId = localStorage.getItem('pipelineId')

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
        killInstance(pipelineId).then(res=>{
            console.log('停止成功',res)
            setFreshen(!freshen)
        }).catch(error=>{
            console.log(error)
        })
    }

    const executeDetails = () =>{
        return rightExecute && rightExecute.map((item,index)=>{
            return(
                <Card className='mid_group_center-cart' key={index}>
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

    const logRunLog = () =>{
        if(leftExecute) {
            const outLog=document.getElementById('outLog')
            if(outLog){
                outLog.scrollTop = outLog.scrollHeight
            }
            return  <div className='structure-content-bottom'>
                        <div className='structure-content-bottom-title'>输出</div>
                        <div className='structure-content-bottom-outLog'  id='outLog'>
                            {leftExecute.runLog}
                        </div>
                    </div>
        }
    }

    return(
        <div className="mid_group">
            <div className='mid_group_top'>
                <div className='mid_group_top_tel'>
                    <span className='tel_time'>构建 {index}</span>
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