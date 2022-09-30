import React,{Fragment}from "react";
import {Button} from "antd";

const ConfigAddNewStage = props =>{

    const {setNewStageVisible} = props

    return(
        <Fragment>
            <div className="formView-wrapper">
                <div className="formView-wrapper-Headline">新阶段</div>
            </div>
            <div className="formView-wrapper-handle"
                 onClick={()=>setNewStageVisible(true)}
            >
                新任务
            </div>
        </Fragment>
    )
}

export default ConfigAddNewStage