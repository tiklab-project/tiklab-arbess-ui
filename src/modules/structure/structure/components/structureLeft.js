import React, {Fragment} from "react";
import StructureLeft_dropdown from "./structureLeft_dropdown";
import StructureLeft_execute from "./structureLeft_execute";

const StructureLeft = props =>{

    const {findHistoryLog,leftData,leftExecute,setRightData,details,setDetails} = props

    const left = () =>{
        if(leftData){
            leftData && leftData.map((item,index)=>{
                return(
                    <div className='history-content-list' key={index}>
                        <div className='list-title'>
                                        <span
                                            onClick={()=>showHistory(item,index)}
                                        >
                                           构建 {index+1}
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
                                <span>执行方式 : {runWay(item)}</span>
                            </div>
                        </div>
                    </div>

                )
            })
        }
    }

    const sta = item =>{
        // if(buildHistoryList){
        //     switch (item.runStatus) {
        //         case 0:
        //             return  <svg className="icon" aria-hidden="true">
        //                         <use xlinkHref="#icon-dengdai1"/>
        //                     </svg>
        //         case 1:
        //             return  <svg className="icon" aria-hidden="true">
        //                         <use xlinkHref="#icon-yunhangshibai1"/>
        //                     </svg>
        //         case 30:
        //             return  <svg className="icon" aria-hidden="true">
        //                         <use xlinkHref="#icon-chenggong-"/>
        //                     </svg>
        //     }
        // }
    }

    const runWay = item => {
        // if(buildHistoryList){
        //     switch (item.runWay) {
        //         case 1:
        //             return  <span>
        //                         用户点击执行
        //                     </span>
        //         default:
        //             return  <span>
        //                         自动
        //                     </span>
        //     }
        // }
    }
    
    const showHistory = (item,index) => {
        findHistoryLog(item.historyId).then(res=>{
            setDetails(1)
            setRightData(res.data)
        })
    }

    return(
        <div className='structure-content-left'>
            <StructureLeft_dropdown/>
            <div className='structure-content-left-history'>
                <div className='history-content'>
                    {   leftExecute === '' ? ' ' :
                            <StructureLeft_execute
                                leftExecute={leftExecute}
                                setDetails={setDetails}
                            />
                    }
                    {
                        leftData && leftData.map((item,index)=>{
                        return(
                            <div className='history-content-list' key={index}>
                                <div className='list-title'>
                                        <span
                                            onClick={()=>showHistory(item,index)}
                                        >
                                           构建 {index+1}
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
                                        <span>执行方式 : {runWay(item)}</span>
                                    </div>
                                </div>
                            </div>

                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default StructureLeft