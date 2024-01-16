import React from "react";
import {DomainMessageNotice} from "thoughtware-message-ui";

/**
 * 项目域消息通知方案
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const DomainMessageNoticeContent = props =>{

    return <DomainMessageNotice {...props} domainId={props.match.params.id}  bgroup={"matflow"}/>

}

export default DomainMessageNoticeContent
