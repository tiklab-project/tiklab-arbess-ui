import React from "react";
import {LogTypeList} from "tiklab-oplog-ui";

/**
 * 日志类型
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const LogType = props =>{

    return <LogTypeList {...props} bgroup={"matflow"}/>

}

export default LogType
