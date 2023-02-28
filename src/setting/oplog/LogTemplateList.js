import React from "react";
import {LogTemplateList} from "tiklab-oplog-ui";

/**
 * 日志模板
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const LogTemplateListContent = props => {

    return <LogTemplateList {...props} bgroup={"matflow"}/>

}

export default LogTemplateListContent
