import React from "react";
import TaskIcon from "./TaskIcon";
import { taskTitle } from "./TaskTitle";

/**
 * task的标题&&图标
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const TaskTitleIcon = props =>{

    const {type} = props


    return  <>
                <TaskIcon type={type} width={20} height={22}/>
                <span style={{paddingLeft:8}}>
                    {
                        taskTitle(type)
                    }
                </span>
            </>
}

export default TaskTitleIcon
