import React from "react";
import {TodoTypeList} from "tiklab-todotask-ui";

/**
 * 待办类型
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const TodoType = props =>{

    return <TodoTypeList {...props} bgroup={"matflow"}/>

}

export default TodoType
