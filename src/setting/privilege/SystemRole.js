import React from "react";
import {SystemRole} from "thoughtware-privilege-ui";

/**
 * 系统权限
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const SystemRoleContent = props =>{

    return <SystemRole {...props} bgroup={"matflow"}/>

}

export default SystemRoleContent
