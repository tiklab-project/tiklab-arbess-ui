import React from "react";
import {DomainUserList} from "doublekit-user-ui";
import {DOMAIN_USER_STORE} from "doublekit-user-ui/lib/store"
import {inject,observer} from "mobx-react";

// 项目成员
const ProjectSetUser = props =>{
    const pipelineId = localStorage.getItem("pipelineId")
    return <DomainUserList {...props} domainId={pipelineId}/>
}

export default inject(DOMAIN_USER_STORE)(observer(ProjectSetUser))