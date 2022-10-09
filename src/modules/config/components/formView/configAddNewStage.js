import React from "react";
import ConfigAddNewStageModal from "./configAddNewStageModal";

const ConfigAddNewStage = props =>{

    const {data,setData,newStageVisible,setNewStageVisible,setIsPrompt,setBuildType,setDeployType} = props

    return(
        <>
            <div className="formView-wrapper">
                <div className="formView-wrapper-Headline code-handle">新阶段</div>
            </div>
            <div className="formView-wrapper-handle"
                 onClick={()=>setNewStageVisible(true)}
            >
                新任务
            </div>
            <ConfigAddNewStageModal
                data={data}
                setData={setData}
                newStageVisible={newStageVisible}
                setNewStageVisible={setNewStageVisible}
                setIsPrompt={setIsPrompt}
                setBuildType={setBuildType}
                setDeployType={setDeployType}
            />
        </>
    )
}

export default ConfigAddNewStage