/**
 * @Description: 系统消息通知方案
 * @Author: gaomengyuan
 * @Date:
 * @LastEditors: gaomengyuan
 * @LastEditTime: 2025/3/12
 */
import React from "react";
import {MessageNotice} from "tiklab-message-ui";

const MessageNoticeContentTrue = props =>{

    return (
        <MessageNotice
            {...props}
            bgroup={"arbess"}
            isBase={true}
        />
    )

}

export default MessageNoticeContentTrue
