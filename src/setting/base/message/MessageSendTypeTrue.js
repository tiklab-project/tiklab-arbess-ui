import React from "react";
import {MessageSendType} from "thoughtware-message-ui";

/**
 * 消息通知类型
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const MessageSendTypeContentTrue = props => {

    return <MessageSendType {...props} bgroup={"matflow"} isBase={true}/>

}

export default MessageSendTypeContentTrue
