import React from "react";
import {MyLogList} from "tiklab-oplog-ui";

const MyLogListContent = props => {
    return <MyLogList {...props} bgroup={"pipeline"}/>
}

export default MyLogListContent