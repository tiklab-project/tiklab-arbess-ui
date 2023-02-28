import React from "react";
import {SystemRoleList} from "tiklab-privilege-ui";

/**
 * 系统权限
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const SystemRole = props =>{

    return <SystemRoleList {...props} bgroup={"matflow"}/>

}

export default SystemRole
