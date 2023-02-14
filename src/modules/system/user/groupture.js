import React from "react";
import {UserGroup} from "tiklab-user-ui";

/**
 * 用户组
 */
const GroupTrue = props => {
    return <UserGroup {...props} bgroup={"matflow"} isBase={true}/>
}

export default GroupTrue
