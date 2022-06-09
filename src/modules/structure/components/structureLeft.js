import React, {Fragment} from "react";
import StructureLeftExecute from "./structureLeftExecute";

const StructureLeft = props =>{

    const {findHistoryLog,leftData,leftExecute,setRightData,status,setModeData,setIndex,index,setHistoryId} = props

    const sta = item =>{
        if(leftData){
            switch (item.runStatus) {
                case 1:
                    return status(2)
                case 30:
                    return status(1)
                default:
                    return status(4)
            }
        }
    }
    
    const showHistory = (item,i)=> {
        setHistoryId(item.historyId)
        findHistoryLog(item.historyId).then(res=>{
            console.log('构建历史详情',res)
            setModeData(item)
            setIndex(i+1)
            setRightData(res.data)
        })
    }
    
    const leftDetails = () => {
        return(
            <Fragment>
                {
                    leftData && leftData.map((item,i)=>{
                        return(
                            <div
                                key={i}
                                onClick={()=>showHistory(item,i)}
                                className={index === i+1  ?
                                    'history-content-list history-content-list_active'
                                    :   'history-content-list'
                                }
                            >
                                <div className='list-title'> 构建 {i+1}</div>
                                <div className='list-group'>
                                    <div className='list-group-item'>
                                        <div className='list-state'>状态 : {sta(item)}</div>
                                        <div className='list-one'>执行人 : {item.execName}</div>
                                    </div>
                                    <div className='list-time'>执行时间 : {item.createTime}</div>
                                </div>
                            </div>
                        )})
                }
            </Fragment>
        )
    }

    return(
        <div className='structure-content-left-history'>
            <div className='history-content'>
                {   leftExecute === '' ? null:
                    <StructureLeftExecute
                        leftExecute={leftExecute}
                        status={status}
                        index={index}
                        setIndex={setIndex}
                    />
                }
                { leftDetails() }
            </div>
        </div>
    )
}

export default StructureLeft