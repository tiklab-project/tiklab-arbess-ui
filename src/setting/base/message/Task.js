import React from "react";
import {Task} from "thoughtware-message-ui";

/**
 * 待办列表
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const TaskContent = props =>{

    return <Task {...props} bgroup={"matflow"}/>

}

export default TaskContent
