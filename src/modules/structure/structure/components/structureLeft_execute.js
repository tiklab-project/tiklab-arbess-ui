import React, {Fragment} from "react";

const StructureLeft_execute = props => {
    const {leftExecute,setDetails} = props

    const runWay = item => {
        if(leftExecute){
            switch (leftExecute.runWay) {
                case 1:
                    return  <span>
                                用户点击执行
                            </span>
                default:
                    return  <span>
                                自动
                            </span>
            }
        }
    }

    return(
        <div className='history-content-list' >
            <div className='list-title'>
                <span onClick={()=>setDetails(0)}>
                   构建 0
                </span>
            </div>
            <div className='list-group'>
                <div className='list-group-item'>
                    <div className='list-state'>
                        <span>状态 : 正在构建</span>
                    </div>
                    <div className='list-one'>
                        <span>执行人 : {leftExecute.execName}</span>
                    </div>
                </div>
                <div className='list-time'>
                    <span>执行方式 : {runWay()}</span>
                </div>
            </div>
        </div>
    )
}

export default StructureLeft_execute