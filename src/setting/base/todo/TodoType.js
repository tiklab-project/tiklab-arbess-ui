import React from "react";
import {TodoType} from "tiklab-todotask-ui";

/**
 * 待办类型
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const TodoTypeContent = props =>{

    return <TodoType {...props} bgroup={"matflow"}/>

}

export default TodoTypeContent