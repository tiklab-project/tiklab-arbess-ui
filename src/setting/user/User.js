import React from "react";
import {User as UserList} from "thoughtware-user-ui";

/**
 * 用户
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const UserContent = props =>{

    return <UserList {...props} bgroup={"matflow"}/>

}

export default UserContent
