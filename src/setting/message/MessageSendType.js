import React from "react";
import {MessageSendType} from "thoughtware-message-ui";

/**
 * 消息发送方式
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const MessageSendTypeContent = props => {

    return (
        <MessageSendType
            {...props}
            bgroup={"matflow"}
        />
    )

}

export default MessageSendTypeContent
