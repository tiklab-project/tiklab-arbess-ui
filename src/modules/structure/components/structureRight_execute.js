import React, {useEffect, useState} from "react";
import {Button, Card, Popconfirm} from "antd";

const StructureRight_execute = props => {
    const {rightExecute,logList,status,leftExecute,runTime} = props

    const type = item =>{
        if(item){
            switch(item.taskType){
                case 1:
                    return '通用Git'
                case 2:
                    return 'Gitee'
                case 11:
                    return '单元测试'
                case 21:
                    return 'maven'
                case 22:
                    return 'node'
                case 31:
                    return 'linux'
                case 32:
                    return 'docker'
            }
        }
    }

    // 返回值：logList.status，状态（1）成功，（100）：失败， 默认值 0，成功后 logList.status+10
    const state = index =>{
        if(logList){
            const i = logList.sort;
            const j = logList.status;
            if(i > j && index === i ){
                return  status(0)
            }else if (index <i ){
                return  status(1)
            }else if(i<j){
                return  status(2)
            }else if(index > i){
                return  status(3)
            }
        }
    }
    
    const logRunLog = () =>{
        if(logList) {
            const outLog=document.getElementById('outLog')
            if(outLog){
                outLog.scrollTop = outLog.scrollHeight
            }
            return  <div className='structure-content-bottom'>
                        <h3>输出</h3>
                        <div className='structure-content-bottom-outLog'  id='outLog'>
                            {logList.runLog}
                        </div>
                    </div>
        }
    }

    const runWay = () => {
        if(leftExecute){
            switch (leftExecute.runWay) {
                case 1:
                    return  <span>
                                手动
                            </span>
                default:
                    return  <span>
                                自动
                            </span>
            }
        }
    }
    
    

    return(
        <div className="mid_group">
            <div className='mid_group_top'>
                <div className='mid_group_top_tel'>
                    <span className='tel_time'>
                        构建 0
                    </span>
                    <span className='tel_time'>
                        执行时长：{runTime}
                    </span>
                    <span className='tel_way'>
                        触发方式：{runWay()}
                    </span>
                </div>
                <div className="mid_group_top_del">
                    <Popconfirm
                        title="您确认删除吗?"
                        onConfirm={confirm}
                        okText="确认"
                        cancelText="取消"
                        placement="bottom"
                    >
                        <Button>
                            删除
                        </Button>
                    </Popconfirm>
                </div>
            </div>
            <div className="mid_group_center">
            {
               rightExecute && rightExecute.map((item,index)=>{
                   return(           
                        <Card className='mid_group_center-cart' key={index}>
                            <div className='cart-top'>
                                {item.taskAlias} --
                                <span style={{paddingLeft:5}}>{type(item)}</span>
                            </div>
                            <div className='cart-center'>
                                <div className='cart-center-item'>
                                    <div>状态：{state(index+1)}</div>
                                    <div>时间:</div>
                                </div>
                            </div>
                            <div className='cart-bottom' >
                                <span
                                    className='cart-bottom-span'
                                    // onClick={()=>log(item)}
                                >
                                    日志
                                </span>
                            </div>
                        </Card>
                   )
               })
            }
            </div>
           { logRunLog() }
       </div>
    )
}

export default StructureRight_execute