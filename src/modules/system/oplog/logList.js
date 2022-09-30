import React from "react";
import {LogList} from "tiklab-oplog-ui";

const LogListContent = props => {
    return <LogList {...props} bgroup={"pipeline"}/>
}

export default LogListContent