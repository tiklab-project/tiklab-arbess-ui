import React from "react";
import {MyTodoTask} from "thoughtware-message-ui";

/**
 * 待办
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const MyTodoTaskContent = props =>{

    return <MyTodoTask {...props} bgroup={"arbess"}/>

}

export default MyTodoTaskContent
