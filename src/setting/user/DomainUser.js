import React from "react";
import {DomainUserList} from "tiklab-user-ui";
import {inject,observer} from "mobx-react";

/**
 * 项目成员
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const DomainUser = props =>{

    const {pipelineStore} = props
    const {pipeline} = pipelineStore

    return <DomainUserList {...props} domainId={pipeline && pipeline.id} bgroup={"matflow"}/>

}

export default inject("pipelineStore")(observer(DomainUser))
