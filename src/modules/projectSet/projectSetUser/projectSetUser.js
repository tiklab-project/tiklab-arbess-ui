import React from "react";
import { DomainUserList } from "doublekit-user-ui";

// 项目成员
const ProjectSetUser = props =>{
    const pipelineId = localStorage.getItem("pipelineId")
    return <DomainUserList {...props} domainId={pipelineId}/>
}

export default ProjectSetUser