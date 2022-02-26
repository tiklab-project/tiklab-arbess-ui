import React from 'react'
import {Button, Popconfirm} from "antd";
import {withRouter} from "react-router-dom";

const BuildHistory_buildTop=props=>{
    return(
        <div className='task-build-top'>
            <h1>构建1</h1>
            <div className='task-build-top-btn'>
                <Button type='primary' onClick={()=>props.history.push('/home/task/history')}>
                    返回
                </Button>
                <Popconfirm
                    placement="bottom"
                    title="确定删除吗"
                    onConfirm={()=>{
                        props.history.push('/home/task/history')
                    }}
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
export default withRouter(BuildHistory_buildTop)