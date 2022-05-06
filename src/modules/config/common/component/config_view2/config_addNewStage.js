import React ,{Fragment} from "react";

const Config_addNewStage = props =>{

    const {setNewStageDrawer} = props

    return(
       <Fragment>
           <div className='group-flow'>
               <div className='group-flow_btn' />
           </div>
           <div className='group-create'>
               <div className='group-head'>
                   <div className='name' style={{opacity:0}}>新阶段</div>
               </div>
               <div className='newStages'>
                   <div className='newStages-content'  >
                       <div className='newStages-task'>
                           <div className='newStages-job'>
                               <div className='newStages-job_text' onClick={()=>setNewStageDrawer(true)}>
                                   新任务
                               </div>
                           </div>
                       </div>
                   </div>
               </div>
           </div>
       </Fragment>
    )
}

export default Config_addNewStage