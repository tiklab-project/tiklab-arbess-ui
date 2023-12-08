import React from "react";
import {MessageManagement} from "thoughtware-message-ui";

/**
 * 消息管理页面
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const MessageManagementContent = props => {

    return <MessageManagement {...props} bgroup={"matflow"}/>

}

export default MessageManagementContent
