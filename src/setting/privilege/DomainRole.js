import React from "react";
import {DomainRole} from "tiklab-privilege-ui";

/**
 * 项目权限
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const DomainRoleContent = props =>{

    return <DomainRole {...props} domainId={props.match.params.id}  bgroup={"arbess"}/>

}

export default DomainRoleContent
