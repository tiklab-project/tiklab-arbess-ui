import React from "react";
import {withRouter} from "react-router-dom";
import "../components/pipeline.scss";
import PipelineSearch from "../components/pipelineSearch";
import PipelineTabs from "../components/pipelineTabs";

const Pipeline = props =>{
    return(
        <div className="pipeline">
            <PipelineSearch />
            <PipelineTabs/>
        </div>
    )
}

export default withRouter(Pipeline)