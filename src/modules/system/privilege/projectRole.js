import React from "react";
import {DomainRoleList} from "tiklab-privilege-ui";
import {inject,observer} from "mobx-react";

/*
    项目权限
 */
const ProjectRole = props =>{

    const {pipelineStore} = props
    const {pipelineId} = pipelineStore

    return <DomainRoleList {...props} domainId={pipelineId}  bgroup={"matflow"}/>
    
}

export default inject("pipelineStore")(observer(ProjectRole))