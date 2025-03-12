/**
 * @Description: 项目集消息通知方案
 * @Author: gaomengyuan
 * @Date:
 * @LastEditors: gaomengyuan
 * @LastEditTime: 2025/3/12
 */
import React from "react";
import {ProjectMessageNotice} from "tiklab-message-ui";

const ProjectMessageNoticeContent = props =>{

    return (
        <ProjectMessageNotice
            {...props}
            bgroup={"arbess"}
            isBase={true}
        />
    )

}

export default ProjectMessageNoticeContent
