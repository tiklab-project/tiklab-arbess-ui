import React from "react";
import {UserGroup} from "thoughtware-user-ui";

/**
 * 用户组
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const GroupTrue = props => {
    return <UserGroup {...props} bgroup={"matflow"} isBase={true}/>
}

export default GroupTrue
