import React,{useEffect} from 'react'
import './structureHistoryDetails.scss'
import StructureHistoryDetailsTop from "./structureHistoryDetailsTop";
import StructureHistoryDetailsCenter from "./structureHistoryDetailsCenter";
import {withRouter} from "react-router-dom";
import {inject, observer} from "mobx-react";

const StructureHistoryDetails = props =>{

    const {StructureStore}=props
    const {SelectHistoryLog,deleteHistoryLog,historyLog}=StructureStore

    const historyId=localStorage.getItem('historyId')

    useEffect(()=>{
        SelectHistoryLog(historyId)
        return () =>{
            localStorage.removeItem('historyId')
        }
    },[])

    return(
        <div className='structureHistory-details task'>
            <StructureHistoryDetailsTop
                {...props}
                historyId={historyId}
                deleteHistoryLog={deleteHistoryLog}
            />
            <StructureHistoryDetailsCenter
                historyLog={historyLog}
            />
        </div>
    )
}

export default withRouter(inject('StructureStore')(observer(StructureHistoryDetails)))