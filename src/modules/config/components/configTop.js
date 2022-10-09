import React from "react";
import "./configTop.scss";
import BreadcrumbContent from "../../../common/breadcrumb/breadcrumb";
import ConfigChangeView from "./configChangeView";

const ConfigTop = props =>{

    const {view,setView,pipelineId,pipelineName,userId} = props

    return(
        <div className="config-top-content">
            <BreadcrumbContent config={"config"} firstItem={pipelineName} secondItem={"配置"}/>
            <ConfigChangeView
                userId={userId}
                view={view}
                setView={setView}
                pipelineId={pipelineId}
                pipelineName={pipelineName}
            />
        </div>
    )
}

export default ConfigTop