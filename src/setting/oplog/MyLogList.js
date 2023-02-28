import React from "react";
import {MyLogList} from "tiklab-oplog-ui";

/**
 * 我的日志
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const MyLogListContent = props => {

    return <MyLogList {...props} bgroup={"matflow"}/>

}

export default MyLogListContent
