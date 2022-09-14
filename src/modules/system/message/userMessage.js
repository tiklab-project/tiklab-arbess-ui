import React from "react";
import {UserMessage} from "tiklab-message-ui";

const UserMessageContent = props => {
    return <UserMessage {...props} application={"matflow"}/>
}

export default UserMessageContent