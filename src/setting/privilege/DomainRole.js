import React from "react";
import {DomainRoleList} from "tiklab-privilege-ui";
import {inject,observer} from "mobx-react";

/**
 * 项目权限
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const DomainRoleContent = props =>{

    const {pipelineStore} = props
    const {pipeline} = pipelineStore

    return <DomainRoleList {...props} domainId={pipeline.id}  bgroup={"matflow"}/>

}

export default inject("pipelineStore")(observer(DomainRoleContent))
