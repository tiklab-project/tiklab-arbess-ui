import React from "react";
import { DomainUserList } from 'doublekit-user-ui';

const PipelineSysMembro = props =>{

    const pipelineId = localStorage.getItem('pipelineId')

    return(
        <div className='pipelineSys-membro'>
            <DomainUserList
                {...props}
                domainId={pipelineId}
            />
        </div>
    )
}

export default PipelineSysMembro