/**
 * @Description: 消息发送方式
 * @Author: gaomengyuan
 * @Date:
 * @LastEditors: gaomengyuan
 * @LastEditTime: 2025/3/12
 */
import React from "react";
import {MessageSendType} from "tiklab-message-ui";

const MessageSendTypeContent = props => {

    return (
        <MessageSendType
            {...props}
            bgroup={"arbess"}
        />
    )

}

export default MessageSendTypeContent
