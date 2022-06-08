import React ,{Fragment} from "react";
import {Button, Card, Popconfirm} from "antd";

const StructureRightItem = props =>{

    const {rightData,status,deleteHistoryLog,modeData,index,setVisible,setDrawerContent,configName,runWay,
        freshen,setFreshen
    } = props

    const historyId = localStorage.getItem('historyId')
    const triggerMode = () => {
        return runWay (modeData && modeData.runWay)
    }

    const type = item =>{
        return configName(item.taskType)
    }

    const state = item =>{
        switch(item.runState){
            case 1:
                return status(2)
            case 10:
                return status(1)
            default:
                return status(4)
        }
    }

    const log = item => {
        setDrawerContent(item)
        setVisible(true)
    }

    const confirm = () =>{
        deleteHistoryLog(historyId)
        setFreshen(!freshen)
    }

    const rightDetails = () =>{
        return (
            <Fragment>
                {
                    rightData && rightData.map((item,index)=>{
                        return(
                            <Card className='mid_group_center-cart' key={index}>
                                <div className='cart-top'>
                                    {item.taskAlias} -- { type(item) }
                                </div>
                                <div className='cart-center'>
                                    <div className='cart-center-item'>
                                        <div>状态：{state(item)}</div>
                                        <div>时间：{item.execTime} </div>
                                    </div>
                                </div>
                                <div className='cart-bottom' >
                                    <span className='cart-bottom-span' onClick={()=>log(item)}>
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

    return (
        <div className="mid_group">
            <div className='mid_group_top'>
                <div className='mid_group_top_tel'>
                    <span className='tel_time'>构建 {index}</span>
                    <span className='tel_time'>执行时长：{modeData && modeData.execTime}</span>
                    <span className='tel_way'>触发方式：{triggerMode()}</span>
                </div>
                <div className="mid_group_top_del">
                    <Popconfirm
                        title="您确认删除吗?"
                        onConfirm={()=>confirm()}
                        okText="确认"
                        cancelText="取消"
                        placement="bottom"
                    >
                        <Button>删除</Button>
                    </Popconfirm>
                </div>
            </div>
            <div className="mid_group_center">
                {rightDetails()}
            </div>
            <div className='structure-content-bottom'>
                <h3>输出</h3>
                <div className='structure-content-bottom-outLog' >
                    { modeData && modeData.runLog }
                </div>
            </div>
        </div>
    )
}

export default StructureRightItem