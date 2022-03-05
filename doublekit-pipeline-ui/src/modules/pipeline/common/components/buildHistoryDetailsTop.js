import React from 'react'
import {Button, Popconfirm} from "antd";
import {withRouter} from "react-router-dom";

const BuildHistoryDetailsTop = props =>{

    const {historyId,historyNumber,deleteHistoryLog}=props

    const onConfirm= ()=>{
        deleteHistoryLog(historyId)
        props.history.push('/home/task/history')
    }

    return(
        <div className='task-build-top'>
            <h1>{historyNumber}</h1>
            <div className='task-build-top-btn'>
                <Button type='primary' onClick={()=>props.history.push('/home/task/history')}>
                    返回
                </Button>
                <Popconfirm
                    placement="bottom"
                    title="确定删除吗"
                    onConfirm={onConfirm}
                    okText="确定"
                    cancelText="取消"
                >
                    <Button >
                        删除本次构建
                    </Button>
                </Popconfirm>
            </div>
        </div>
    )
}

export default withRouter(BuildHistoryDetailsTop)