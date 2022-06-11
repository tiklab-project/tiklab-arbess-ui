import React from "react";
import {Button, Card, Popconfirm} from "antd";
import ConfigName from "../../config/common/component/configCommon/configName";

const StructureRightItem = props =>{

    const {rightData,status,deleteHistoryLog,modeData,index,setVisible,setDrawerContent,runWay,historyId,
        freshen,setFreshen,
    } = props

    const state = item =>{
        switch(item.runState){
            case 1:
                return status(2) //失败
            case 10:
                return status(1) //成功
            default:
                return status(4) //被迫停止
        }
    }

    const log = item => {
        setDrawerContent(item)
        setVisible(true)
    }

    const confirm = () =>{
        deleteHistoryLog(historyId).then(()=>{
            setFreshen(!freshen)
        }).catch(error=>{
            console.log(error)
        })
    }

    const rightDetails = () =>{
        return  rightData && rightData.map((item,index)=>{
            return(
                <Card className='mid_group_center-cart' key={index}  >
                    <div className='cart-top'>
                        <span className='cart-top-taskAlias'>{item.taskAlias}</span>
                        <span> -- </span>
                        <span className='cart-top-configName'>  <ConfigName type={item.taskType}/> </span>
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

    return (
        <div className="mid_group">
            <div className='mid_group_top'>
                <div className='mid_group_top_tel'>
                    <span className='tel_time'>构建 {index}</span>
                    <span className='tel_time'>执行时长：{modeData && modeData.execTime}</span>
                    <span className='tel_way'>触发方式：{ runWay (modeData && modeData.runWay) }</span>
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
            <div className="mid_group_center"> {rightDetails()} </div>
            <div className='structure-content-bottom'>
                <div className='structure-content-bottom-title'>输出</div>
                <div className='structure-content-bottom-outLog' >
                    { modeData && modeData.runLog }
                </div>
            </div>
        </div>
    )
}

export default StructureRightItem