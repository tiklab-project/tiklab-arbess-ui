import React,{useEffect} from 'react'
import BuildHistoryDetailsTop from "./buildHistoryDetailsTop";
import BuildHistoryDetailsCenter from "./buildHistoryDetailsCenter";
import {withRouter} from "react-router-dom";
import {inject, observer} from "mobx-react";

const BuildTask = props =>{

    const {BUILD_STORE}=props
    const {SelectHistoryLog,deleteHistoryLog,historyLog}=BUILD_STORE

    const historyId=localStorage.getItem('historyId')
    const historyNumber=localStorage.getItem('historyNumber')

    useEffect(()=>{
        SelectHistoryLog(historyId)
    },[])

    return(
        <div className='task-build'>
            <BuildHistoryDetailsTop
                historyId={historyId}
                historyNumber={historyNumber}
                deleteHistoryLog={deleteHistoryLog}
            />
            <BuildHistoryDetailsCenter
                historyLog={historyLog}
            />
        </div>
    )
}

export default withRouter(inject('BUILD_STORE')(observer(BuildTask)))