import React from "react";
import {TaskList} from "tiklab-todotask-ui";

const TaskListContent = props =>{
    return <TaskList {...props} bgroup={"pipeline"}/>
}

export default TaskListContent