import React from "react";

const StructureLeft_execute = props => {
    const {leftExecute,setDetails,status,setIndex,details} = props

    const state = () =>{
        if(leftExecute){
            switch(leftExecute.runStatus){
                case 1:
                    return  status(2)
                case 30 :
                    return  status(1)
                default :
                    return  <svg className="icon" aria-hidden="true">
                                <use xlinkHref="#icon-dengdai1"/>
                            </svg>
            }
        }
    }

    const runWay = () => {
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

    const changeMode = () => {
        setIndex(-1)
        setDetails(0)
    }

    return(
        <div
            onClick={()=>changeMode()}
            className={ details === 0    ?
                'history-content-list history-content-list_active'
                :   'history-content-list'
            }
        >
            <div className='list-title'>
                <span>
                   构建 0
                </span>
            </div>
            <div className='list-group'>
                <div className='list-group-item'>
                    <div className='list-state'>
                        <span>状态 : {state()}</span>
                    </div>
                    <div className='list-one'>
                        <span>执行人 : {leftExecute && leftExecute.execName}</span>
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