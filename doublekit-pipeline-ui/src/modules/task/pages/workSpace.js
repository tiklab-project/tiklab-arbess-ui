import React from 'react'
import {withRouter} from "react-router-dom";

const WorkTask=(props)=>{
    return(
        <div className='task-work'>
            <div className='task-work-top'>
                <h1 className='task-work-top-h1'>节点master上的工作空间</h1>
                <ul>
                    <li>文件一</li>
                    <li>文件二</li>
                </ul>
            </div>
            <div className='task-work-bottom'>
                <h1 className='task-work-top-h1'>近期构建历史</h1>
                <ul >
                    <li><a onClick={()=>props.history.push('/home/task/build')}>2021</a></li>
                    <li><a onClick={()=>props.history.push('/home/task/build')}>2022</a></li>
                </ul>
            </div>

        </div>
    )
}
export default withRouter(WorkTask)