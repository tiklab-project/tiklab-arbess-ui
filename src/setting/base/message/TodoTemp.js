/**
 * @Description: 待办模板
 * @Author: gaomengyuan
 * @Date:
 * @LastEditors: gaomengyuan
 * @LastEditTime: 2025/3/12
 */
import React from "react";
import {TodoTemp} from "tiklab-message-ui";

const TodoTempContent = props =>{

    return (
        <TodoTemp
            {...props}
            bgroup={"arbess"}
        />
    )

}


export default TodoTempContent
