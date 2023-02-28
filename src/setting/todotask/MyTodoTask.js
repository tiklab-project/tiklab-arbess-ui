import React from "react";
import {MyTodoTask} from "tiklab-todotask-ui";

/**
 * 待办
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const MyTodoTaskContent = props =>{

    return <MyTodoTask {...props} bgroup={"matflow"}/>

}

export default MyTodoTaskContent
