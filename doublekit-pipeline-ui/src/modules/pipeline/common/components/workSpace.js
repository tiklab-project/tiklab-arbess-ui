import React from 'react'
import {withRouter} from "react-router-dom";

const nods=[
    {
        desc:"文件一"
    },
    {
        desc:"文件二"
    }
]

const recent=[
    {
        desc:"2021"
    },
    {
        desc:"2022"
    }
]

const WorkTask=props=>{

    return(
        <div className='task-work task'>
            <div className='task-work-top'>
                <h1 className='task-work-top-h1'>节点master上的工作空间</h1>
                <ul>
                    {
                        nods && nods.map(item=>{
                            return(
                                <li key={item.desc}>
                                    {item.desc}
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
            <div className='task-work-bottom'>
                <h1 className='task-work-top-h1'>近期构建历史</h1>
                <ul>
                    {
                        recent && recent.map(item=>{
                            return(
                                <li key={item.desc} >
                                    {item.desc}
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    )
}

export default withRouter(WorkTask)