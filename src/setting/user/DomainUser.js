import React from "react";
import {DomainUser} from "tiklab-user-ui";

/**
 * 项目成员
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const DomainUserContent = props =>{

    return <DomainUser {...props} domainId={props.match.params.id} bgroup={"matflow"}/>

}

export default DomainUserContent
