import React from "react";
import {MessageSendType} from "tiklab-message-ui";

/*
    消息发送方式
 */
const MessageSendTypeContent = props => {
    return <MessageSendType {...props} bgroup={"pipeline"}/>
}

export default MessageSendTypeContent