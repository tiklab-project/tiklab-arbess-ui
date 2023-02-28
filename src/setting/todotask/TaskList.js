import React from "react";
import {TaskList} from "tiklab-todotask-ui";

/**
 * 待办列表
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const TaskListContent = props =>{

    return <TaskList {...props} bgroup={"matflow"}/>

}

export default TaskListContent
