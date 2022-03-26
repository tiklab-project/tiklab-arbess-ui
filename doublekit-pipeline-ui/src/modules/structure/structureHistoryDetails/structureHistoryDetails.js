import React,{useEffect} from 'react'
import './structureHistoryDetails.scss'
import StructureHistoryDetailsTop from "./structureHistoryDetailsTop";
import StructureHistoryDetailsLeft from "./structureHistoryDetailsLeft";
import StructureHistoryDetailsRight from "./structureHistoryDetailsRight";
import {withRouter} from "react-router-dom";
import {inject, observer} from "mobx-react";

const StructureHistoryDetails = props =>{

    const {StructureStore}=props
    const {SelectHistoryLog,deleteHistoryLog,historyLog}=StructureStore

    const historyId=localStorage.getItem('historyId')

    // useEffect(()=>{
    //     SelectHistoryLog(historyId)
    //     return () =>{
    //         localStorage.removeItem('historyId')
    //     }
    // },[])

    return(
       <div className='task structureHistory-details'>
           <StructureHistoryDetailsTop
               {...props}
               historyId={historyId}
               deleteHistoryLog={deleteHistoryLog}
           />
           <div className='structureHistory-details-log'>
               <StructureHistoryDetailsLeft
                   historyLog={historyLog}
               />
               <StructureHistoryDetailsRight
                   historyLog={historyLog}
               />
           </div>
       </div>
    )
}

export default withRouter(inject('StructureStore')(observer(StructureHistoryDetails)))