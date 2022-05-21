import React, {Fragment, useEffect} from "react";
import StructureLeftDropdown from "./structureLeftDropdown";
import StructureLeftExecute from "./structureLeftExecute";

const StructureLeft = props =>{

    const {findHistoryLog,leftData,leftExecute,setRightData,status,details,setDetails,
        setModeData,setIndex,index,
    } = props

    const sta = item =>{
        if(leftData){
            switch (item.runStatus) {
                case 1:
                    return status(2)
    
                case 30:
                    return  status(1)
            }
        }
    }
    
    const showHistory = (item,i)=> {
        setDetails(1)
        localStorage.setItem('historyId',item.historyId)
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
                                className={index === i+1 && details === 1 ?
                                    'history-content-list history-content-list_active'
                                    :   'history-content-list'
                                }
                            >
                                <div className='list-title'>
                                    <span>
                                       构建 {i+1}
                                    </span>
                                </div>
                                <div className='list-group'>
                                    <div className='list-group-item'>
                                        <div className='list-state'>
                                            <span>状态 : {sta(item)}</span>
                                        </div>
                                        <div className='list-one'>
                                            <span>执行人 : {item.execName}</span>
                                        </div>
                                    </div>
                                    <div className='list-time'>
                                        <span>执行时间 : {item.createTime}</span>
                                    </div>
                                </div>
                            </div>
                        )})
                }
            </Fragment>
        )
    }

    return(
        <div className='structure-content-left'>
            <StructureLeftDropdown/>
            <div className='structure-content-left-history'>
                <div className='history-content'>
                    {   leftExecute === '' ? ' ' :
                        <StructureLeftExecute
                            leftExecute={leftExecute}
                            details={details}
                            setDetails={setDetails}
                            status={status}
                            setIndex={setIndex}
                        />
                    }
                    { leftDetails() }
                </div>
            </div>
        </div>
    )
}

export default StructureLeft