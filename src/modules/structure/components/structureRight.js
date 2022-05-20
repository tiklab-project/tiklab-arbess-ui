import React, {Fragment, useState} from "react";
import {Button, Card,Popconfirm} from 'antd'
import Structure_right_logDrawer from './Structure_right_logDrawer'
import StructureRight_execute from "./structureRight_execute";

const StructureRight = props =>{

    const {logList,rightData,rightExecute,details,status,historyId,deleteHistoryLog,
        forceUpdate, modeData,index,leftExecute,runTime,killInstance
    } = props
    
    const [visible,setVisible] = useState(false)
    const [drawer,setDrawer] = useState('')
    const [taskAlias,setTaskAlias] = useState('')
    
    const runWay = () => {
        if(modeData){
            switch (modeData.runWay) {
                case 1:
                    return '手动'
                case 2:
                    return '自动'
            }
        }
    }

    const type = item =>{
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

    const state = item =>{
        switch(item.runState){
            case 10:
                return status(1)
            case 30 :
                return status(2)
            default:
                return status(4)
        }
    }

    const log = item => {
        setDrawer(item.runLog)
        setTaskAlias(item.taskAlias)
        setVisible(true)
    }
    
    const confirm = () =>{
        deleteHistoryLog(historyId)
        localStorage.removeItem('historyId')
        forceUpdate({})
    }

    const rightDetails = () =>{
        return (
            <Fragment>
                {
                    rightData && rightData.map((item,index)=>{
                        return(
                            <Card className='mid_group_center-cart' key={index}>
                                <div className='cart-top'>
                                    {item.taskAlias} --
                                    <span >{type(item)}</span>
                                </div>
                                <div className='cart-center'>
                                    <div className='cart-center-item'>
                                        <div>状态：{state(item)}</div>
                                        <div>时间：{item.execTime} </div>
                                    </div>
                                </div>
                                <div className='cart-bottom' >
                                                    <span
                                                        className='cart-bottom-span'
                                                        onClick={()=>log(item)}
                                                    >
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
        <div className='structure-content-right'>
            <div className='structure-content-right-mid'>
                {
                    details === 0 ?
                    <StructureRight_execute
                        rightExecute={rightExecute}
                        logList={logList}
                        status={status}
                        leftExecute={leftExecute}
                        runTime={runTime}
                        killInstance={killInstance}
                    />
                    :
                    <div className="mid_group">
                        <div className='mid_group_top'>
                            <div className='mid_group_top_tel'>
                                 <span className='tel_time'>
                                     构建 {index}
                                 </span>
                                <span className='tel_time'>
                                    执行时长：{modeData && modeData.execTime}
                                 </span>
                                <span className='tel_way'>
                                     触发方式：{runWay()}
                                 </span>
                            </div>
                            <div className="mid_group_top_del">
                                <Popconfirm
                                    title="您确认删除吗?"
                                    onConfirm={()=>confirm()}
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
                            {rightDetails()}
                        </div>
                        <div className='structure-content-bottom'>
                            <h3>输出</h3>
                            <div className='structure-content-bottom-outLog' >
                                {rightData && rightData.map(item=>{
                                    return item.runLog
                                })}
                            </div>
                        </div>
                    </div>
                }
            </div>

            <Structure_right_logDrawer
                visible={visible}
                setVisible={setVisible}
                drawer={drawer}
                taskAlias={taskAlias}
            />
        </div>
    )
}

export default StructureRight