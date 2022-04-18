import React from "react";

const Config_addNewStage = props =>{

    const {setNewStageVisible} = props

    return(
        <div className='config-details-tail'>
            <div className='config-details-Headline'>新阶段</div>
            <div
                className='config-details-handle'
                onClick={()=> setNewStageVisible(true)}
            >新任务</div>
        </div>
    )
}

export default Config_addNewStage