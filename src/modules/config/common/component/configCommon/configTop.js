import React from "react";
import "./configTop.scss";
import BreadcrumbContent from "../../../../../common/breadcrumb/breadcrumb";
import ConfigChangeView from "./configChangeView";

const ConfigTop = props =>{
    const {view,setView,pipelineId,pipelineStartStructure,setIsPrompt,userId,isBtn} = props
    return(
        <div className="config-top-content">
            <BreadcrumbContent config={"config"} type={"project"}/>
            <ConfigChangeView
                userId={userId}
                view={view}
                setView={setView}
                setIsPrompt={setIsPrompt}
                pipelineId={pipelineId}
                pipelineStartStructure={pipelineStartStructure}
                isBtn={isBtn}
            />
        </div>
    )
}

export default ConfigTop