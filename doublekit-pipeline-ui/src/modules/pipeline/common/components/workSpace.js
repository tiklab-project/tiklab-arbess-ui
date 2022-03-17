import React from 'react'
import {withRouter} from "react-router-dom";
import './workSpace.scss'

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

const WorkSpace=props=>{

    return(
        <div className='workSpace task'>
            <div className='workSpace-top'>
                <h1 className='workSpace-top-h1'>节点master上的工作空间</h1>
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
            <div className='workSpace-bottom'>
                <h1 className='workSpace-top-h1'>近期构建历史</h1>
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

export default withRouter(WorkSpace)