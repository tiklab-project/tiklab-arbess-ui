import React from "react";
import {DomainUser} from "tiklab-user-ui";
import {inject,observer} from "mobx-react";

/**
 * 项目成员
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const DomainUserContent = props =>{

    const {pipelineStore} = props
    const {pipeline} = pipelineStore

    return <DomainUser {...props} domainId={pipeline && pipeline.id} bgroup={"matflow"}/>

}

export default inject("pipelineStore")(observer(DomainUserContent))
