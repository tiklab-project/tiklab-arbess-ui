import React from "react";
import {MessageNotice} from "tiklab-message-ui";
import MessageSendTypeContentTrue from "./messageSendTypeTrue";

/*
    消息通知方案
*/
const MessageNoticeContentTrue = props =>{

    return <MessageNotice {...props} bgroup={"matflow"} isBase={true}/>
    
}

export default MessageNoticeContentTrue