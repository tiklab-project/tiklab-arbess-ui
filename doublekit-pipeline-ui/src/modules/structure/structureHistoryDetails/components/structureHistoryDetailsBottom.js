import React,{Fragment} from 'react'

const StructureHistoryDetailsBottom = props =>{

    const {historyLog} = props

    return(
       <Fragment>
           <h3>日志</h3>
           <div className='structureHistory-details-bottom'>
               {historyLog && historyLog.logRunLog}
           </div>
       </Fragment>
    )
}

export default StructureHistoryDetailsBottom