import React from "react";
import {User} from "tiklab-user-ui";

/**
 * 用户
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const UserContent = props =>{

    return <User {...props} bgroup={"matflow"}/>

}

export default UserContent
