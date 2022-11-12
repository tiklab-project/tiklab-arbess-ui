import React from "react";
import BreadcrumbContent from "../../common/breadcrumb/breadcrumb";
import {withRouter} from "react-router";
import {inject,observer} from "mobx-react";

const PipelineDyna = props =>{

    const {pipelineStore} = props

    const {pipelineId,pipeline} = pipelineStore

    const goBack = () => props.history.push(`/index/task/${pipelineId}/survey`)

    return(
        <div className="home-limited">
            <BreadcrumbContent
                firstItem={pipeline.pipelineName}
                secondItem={"流水线动态详情"}
                goBack={goBack}
            />
        </div>
    )
}

export default withRouter(inject("pipelineStore")(observer(PipelineDyna)))