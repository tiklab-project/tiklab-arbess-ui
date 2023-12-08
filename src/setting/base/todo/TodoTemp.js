import React from "react";
import {TodoTemp} from "thoughtware-todotask-ui";

/**
 * 待办模板
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const TodoTempContent = props =>{

    return <TodoTemp {...props} bgroup={"matflow"}/>

}


export default TodoTempContent
