/**
 * @Description: 待办类型
 * @Author: gaomengyuan
 * @Date:
 * @LastEditors: gaomengyuan
 * @LastEditTime: 2025/3/12
 */
import React from "react";
import {TodoType} from "tiklab-message-ui";

const TodoTypeContent = props =>{

    return (
        <TodoType
            {...props}
            bgroup={"arbess"}
        />
    )

}

export default TodoTypeContent
