import React from "react";
import { DomainUserList } from 'doublekit-user-ui';

const PipelineSysMembro = props =>{

    const pipelineId = localStorage.getItem('pipelineId')

    return <DomainUserList {...props} domainId={pipelineId}/>
}

export default PipelineSysMembro