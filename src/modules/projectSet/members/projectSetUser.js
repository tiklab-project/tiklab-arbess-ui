import React from "react";
import {DomainUserList} from "tiklab-user-ui";
import {inject,observer} from "mobx-react";

/*
    项目成员
 */
const ProjectSetUser = props =>{
    const {matFlowStore} = props
    const {matFlowId} = matFlowStore
    return <DomainUserList {...props} domainId={matFlowId}/>
}

export default inject("matFlowStore")(observer(ProjectSetUser))