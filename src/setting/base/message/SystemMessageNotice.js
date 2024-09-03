import React from "react";
import {MessageNotice} from "thoughtware-message-ui";

/**
 * 消息通知方案
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const MessageNoticeContentTrue = props =>{

    return <MessageNotice {...props} bgroup={"arbess"} isBase={true}/>

}

export default MessageNoticeContentTrue
