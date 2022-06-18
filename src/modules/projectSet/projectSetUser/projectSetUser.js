import React from "react";
import { DomainUserList } from 'doublekit-user-ui';

const ProjectSetUser = props =>{
    const pipelineId = localStorage.getItem('pipelineId')
    return <DomainUserList {...props} domainId={pipelineId}/>
}

export default ProjectSetUser