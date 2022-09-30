import React from "react";
import {MessageType} from "tiklab-message-ui";

/*
    消息类型管理
 */
const MessageTypeContent = props => {
    return <MessageType {...props} bgroup={"pipeline"}/>
}
export default MessageTypeContent