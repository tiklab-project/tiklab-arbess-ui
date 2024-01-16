import React from "react";
import {ProjectMessageNotice} from "thoughtware-message-ui";

/**
 * 项目消息通知方案
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const ProjectMessageNoticeContent = props =>{

    return <ProjectMessageNotice {...props} bgroup={"matflow"} isBase={true}/>

}

export default ProjectMessageNoticeContent
