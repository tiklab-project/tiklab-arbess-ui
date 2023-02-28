import React from "react";
import {TodoTempList} from "tiklab-todotask-ui";

/**
 * 待办模板
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const TodoTemp = props =>{

    return <TodoTempList {...props} bgroup={"matflow"}/>

}


export default TodoTemp
