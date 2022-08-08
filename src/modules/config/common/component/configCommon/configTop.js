import React from "react";
import "./configTop.scss";
import BreadcrumbContent from "../../../../../common/breadcrumb/breadcrumb";
import ConfigChangeView from "./configChangeView";

const ConfigTop = props =>{

    const {view,setView,matFlowId,matFlowName,setIsPrompt,userId,isBtn,setRunOrSave} = props

    return(
        <div className="config-top-content">
            <BreadcrumbContent config={"config"} firstItem={"流水线"} secondItem={"配置"}/>
            <ConfigChangeView
                userId={userId}
                view={view}
                setView={setView}
                setIsPrompt={setIsPrompt}
                matFlowId={matFlowId}
                matFlowName={matFlowName}
                isBtn={isBtn}
                setRunOrSave={setRunOrSave}
            />
        </div>
    )
}

export default ConfigTop