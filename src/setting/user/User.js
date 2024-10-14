import React from "react";
import {User as UserList} from "tiklab-user-ui";

/**
 * 用户
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const UserContent = props =>{

    return <UserList {...props} bgroup={"arbess"}/>

}

export default UserContent
