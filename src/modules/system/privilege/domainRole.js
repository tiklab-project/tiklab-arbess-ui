import React from "react";
import {DomainRoleList} from "tiklab-privilege-ui";
import {inject,observer} from "mobx-react";

const DomainRoleContent = props =>{

    const {pipelineStore} = props
    const {pipelineId} = pipelineStore

    return <DomainRoleList {...props} domainId={pipelineId}  bgroup={"matflow"}/>

}

export default inject("pipelineStore")(observer(DomainRoleContent))