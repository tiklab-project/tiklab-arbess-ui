import React from "react";

const StructureLeftExecute = props => {

    const {leftExecute,status,setIndex,index} = props

    const state = () =>{
        if(leftExecute){
            switch(leftExecute.runStatus){
                case 1:
                    return  status(2) //失败
                case 30 :
                    return  status(1) //成功
                default :
                    return  status(5) //运行过程
            }
        }
    }

    return(
        <div
            onClick={()=>setIndex(0)}
            className={ index === 0  ?
                'history-content-list history-content-list_active'
                : 'history-content-list'
            }
        >
            <div className='list-title'> 构建 0 </div>
            <div className='list-group'>
                <div className='list-group-item'>
                    <div className='list-state'>状态 : {state()}</div>
                    <div className='list-one'>
                        执行人 : {leftExecute && leftExecute.execName}
                    </div>
                </div>
                <div className='list-time'>
                    执行方式 : {leftExecute && leftExecute.createTime}
                </div>
            </div>
        </div>
    )
}

export default StructureLeftExecute