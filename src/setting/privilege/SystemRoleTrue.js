import React from "react";
import {SystemRoleList} from "tiklab-privilege-ui";

/**
 * 系统权限
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const SystemRoleTrue = props =>{

    return <SystemRoleList {...props} bgroup={"matflow"} isBase={true}/>

}

export default SystemRoleTrue
