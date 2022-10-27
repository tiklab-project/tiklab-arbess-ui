import React,{useState} from "react";
import ConfigTop from "../components/common/configTop";
import {inject,observer} from "mobx-react";
import ConfigView from "../components/common/configView";

const Config = props =>{

    const {pipelineStore} = props

    const {pipelineId,pipeline} = pipelineStore

    const [view,setView] = useState("forms")

    return (
        <div className="config">
            <ConfigTop
                view={view}
                setView={setView}
                pipelineId={pipelineId}
                pipelineName={pipeline.pipelineName}
            />
            <ConfigView view={view}/>
        </div>
    )
}

export default inject("pipelineStore")(observer(Config))