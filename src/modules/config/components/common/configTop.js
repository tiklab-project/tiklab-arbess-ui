import React from "react";
import "./configTop.scss";
import BreadcrumbContent from "../../../../common/breadcrumb/breadcrumb";
import ConfigChangeView from "./configChangeView";

const ConfigTop = props =>{

    const {view,setView,pipelineId,pipelineName} = props

    return(
        <div className="config-top top-limited">
            <div className="config-top-content">
                <BreadcrumbContent
                    firstItem={pipelineName}
                    secondItem={"配置"}
                />
                <ConfigChangeView
                    view={view}
                    setView={setView}
                    pipelineId={pipelineId}
                />
            </div>
        </div>
    )
}

export default ConfigTop