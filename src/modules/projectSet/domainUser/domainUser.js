import React from "react";
import {DomainUserList} from "tiklab-user-ui";
import {inject,observer} from "mobx-react";

/*
    项目成员
 */
const DomainUser = props =>{

    const {pipelineStore} = props
    const {pipelineId} = pipelineStore

    return <DomainUserList {...props} domainId={pipelineId} bgroup={"matflow"}/>

}

export default inject("pipelineStore")(observer(DomainUser))