/**
 * @Description: 项目消息通知方案
 * @Author: gaomengyuan
 * @Date:
 * @LastEditors: gaomengyuan
 * @LastEditTime: 2025/3/12
 */
import React from "react";
import {DomainMessageNotice} from "tiklab-message-ui";

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
