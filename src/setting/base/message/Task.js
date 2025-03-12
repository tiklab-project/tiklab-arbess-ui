/**
 * @Description: 待办
 * @Author: gaomengyuan
 * @Date:
 * @LastEditors: gaomengyuan
 * @LastEditTime: 2025/3/12
 */
import React from "react";
import {Task} from "tiklab-message-ui";

const TaskContent = props =>{

    return (
        <Task
            {...props}
            bgroup={"arbess"}
        />
    )

}

export default TaskContent
