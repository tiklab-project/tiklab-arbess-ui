/**
 * @Description: 待办
 * @Author: gaomengyuan
 * @Date:
 * @LastEditors: gaomengyuan
 * @LastEditTime: 2025/3/12
 */
import React from "react";
import {MyTodoTask} from "tiklab-message-ui";

const MyTodoTaskContent = props =>{

    return (
        <MyTodoTask
            {...props}
            bgroup={"arbess"}
        />
    )

}

export default MyTodoTaskContent
