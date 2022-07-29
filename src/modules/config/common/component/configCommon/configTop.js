import React from "react";
import "./configTop.scss";
import BreadcrumbContent from "../../../../../common/breadcrumb/breadcrumb";
import ConfigChangeView from "./configChangeView";

const ConfigTop = props =>{
    const {view,setView,matFlowId,matFlowName,matFlowStartStructure,setIsPrompt,userId,isBtn} = props
    return(
        <div className="config-top-content">
            <BreadcrumbContent config={"config"} type={"project"}/>
            <ConfigChangeView
                userId={userId}
                view={view}
                setView={setView}
                setIsPrompt={setIsPrompt}
                matFlowId={matFlowId}
                matFlowName={matFlowName}
                matFlowStartStructure={matFlowStartStructure}
                isBtn={isBtn}
            />
        </div>
    )
}

export default ConfigTop