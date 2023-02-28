import React from "react";
import {UserList} from "tiklab-user-ui";

/**
 * 用户
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const List = props =>{

    return <UserList {...props} bgroup={"matflow"}/>

}

export default List
