import React from "react";
import {MessageSendType} from "tiklab-message-ui";

/*
    消息发送方式
 */
const MessageSendTypeContentTrue = props => {

    return <MessageSendType {...props} bgroup={"matflow"} isBase={true}/>

}

export default MessageSendTypeContentTrue