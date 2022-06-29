import React from "react";
import {withRouter} from "react-router-dom";
import "./pipeline.scss";
import PipelineSearch from "../../pipelineSearch/pipelineSearch";
import PipelineTabs from "../components/pipelineTabs";

const Pipeline = props =>{
    return(
        <div className="pipeline" shouldupdate="true" >
            <PipelineSearch />
            <PipelineTabs/>
        </div>
    )
}

export default withRouter(Pipeline)