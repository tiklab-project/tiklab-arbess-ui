import React,{useEffect} from 'react'
import './structureHistoryDetails.scss'
import StructureHistoryDetailsTop from "../components/structureHistoryDetailsTop";
import StructureHistoryDetailsCenter from "../components/structureHistoryDetailsCenter";
import StructureHistoryDetailsBottom from "../components/structureHistoryDetailsBottom";
import {withRouter} from "react-router";
import {inject, observer} from "mobx-react";

const StructureHistoryDetails = props =>{

    const {StructureStore}=props
    const {findHistoryLog,deleteHistoryLog,historyLog}=StructureStore

    const logId=localStorage.getItem('logId')
    const historyId=localStorage.getItem('historyId')

    useEffect(()=>{
        findHistoryLog(logId)
        return () =>{
            localStorage.removeItem('logId')
            localStorage.removeItem('historyId')
        }
    },[])

    return(
       <div className='task structureHistory-details'>
           <div className='structureHistory-details-center-test'>
               # {props.match.params.historyName}
           </div>
           <StructureHistoryDetailsTop
               historyId={historyId}
               deleteHistoryLog={deleteHistoryLog}
           />
           <StructureHistoryDetailsCenter
               {...props}
               historyLog={historyLog}
           />
           <StructureHistoryDetailsBottom
               historyLog={historyLog}
           />
       </div>
    )
}

export default withRouter(inject('StructureStore')(observer(StructureHistoryDetails)))