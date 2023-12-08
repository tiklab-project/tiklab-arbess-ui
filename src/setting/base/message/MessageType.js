import React from "react";
import {MessageType} from "thoughtware-message-ui";

/**
 * 消息类型
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const MessageTypeContent = props => {

    return <MessageType {...props} bgroup={"matflow"}/>

}
export default MessageTypeContent
