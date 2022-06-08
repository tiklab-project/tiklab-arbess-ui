import React, {Fragment,useState} from "react";
import {Button, Card, Spin} from "antd";

const StructureRightExecute = props => {

    const {status,leftExecute,killInstance,rightExecute,configName,runWay,index,
        freshen,setFreshen} = props
    const pipelineId = localStorage.getItem('pipelineId')
    const [runTime,setRunTime] = useState(0)


    const type = item =>{
        return configName(item.taskType)
    }

    // 返回值：logList.status，状态（1）成功，（100）：失败， 默认值 0，成功后 logList.status+10
    const state = index =>{
        if(leftExecute){
            const i = leftExecute.sort;
            const j = leftExecute.status;
            if(i > j && index === i ){
                return  status(0)
            }else if (index < i ){
                return  status(1)
            }else if(i<j){
                return  status(2)
            }else if(index > i){
                return  status(3)
            }
        }
    }

    const logRunLog = () =>{
        if(leftExecute) {
            const outLog=document.getElementById('outLog')
            if(outLog){
                outLog.scrollTop = outLog.scrollHeight
            }
            return  <div className='structure-content-bottom'>
                        <h3>输出</h3>
                        <div className='structure-content-bottom-outLog'  id='outLog'>
                            {leftExecute.runLog}
                        </div>
                    </div>
        }
    }

    const triggerMode = () => {
        return runWay (leftExecute.runWay)
    }
    
    const cease = () => {
        killInstance(pipelineId).then(res=>{
            console.log('停止成功',res)
            setFreshen(!freshen)
        }).catch(error=>{
            console.log(error)
        })
    }

    let c = 0;
    const x = i => {
        setInterval(()=>setRunTime(runTime+1),1000)
        if (i > c){
            c++
            clearInterval( setInterval(()=>setRunTime(runTime+1),1000))
       }
        return runTime
    }


    const runTimes = index => {
        if(leftExecute){
            return null
            // const i = leftExecute.sort;
            // const j = leftExecute.status;
            // if(i > j && index === i ){
            //     return  x(0)
            // }else if (index < i ){
            //     return  x(1)
            //
            // }else if(i<j){
            //     return  x(2)
            //
            // }else if(index > i){
            //     return  x(3)
            //
            // }
        }
    }

    const executeDetails = () =>{
        return(
            <Fragment>
                {
                    rightExecute && rightExecute.map((item,index)=>{
                        return(
                            <Card className='mid_group_center-cart' key={index}>
                                <div className='cart-top'>
                                    {item.taskAlias} -- {type(item)}
                                </div>
                                <div className='cart-center'>
                                    <div className='cart-center-item'>
                                        <div>状态：{state(index+1)}</div>
                                        <div >时间: {runTimes(index+1)}</div>
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
            </Fragment>
        )
    }

    return(
        <div className="mid_group">
            <div className='mid_group_top'>
                <div className='mid_group_top_tel'>
                    <span className='tel_time'>构建 {index}</span>
                    <span className='tel_time'>执行时长：{runTimes()} </span>
                    <span className='tel_way'>触发方式：{triggerMode()}</span>
                </div>
                <div className="mid_group_top_del">
                    <Button onClick={()=>cease()}> 停止 </Button>
                </div>
            </div>
            <div className="mid_group_center">
                { executeDetails() }
            </div>
           { logRunLog() }
       </div>
    )
}

export default StructureRightExecute