import React from "react";
import {DomainMessageNotice} from "tiklab-message-ui";

/**
 * 项目域消息通知方案
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const DomainMessageNoticeContent = props =>{

    return (
        <DomainMessageNotice
            {...props}
            domainId={props.match.params.id}
            bgroup={"arbess"}
        />
    )

}

export default DomainMessageNoticeContent
