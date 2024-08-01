import React from "react";
import PipelineSetAside from "../../../common/component/aside/PipelineSetAside";

/**
 * 流水线左侧导航（三级导航）
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const PipelineSetting = props =>{

    const {match} = props

    const pipelineId = match.params.id

    // 左侧导航（三级标题）
    const projectRouters = [
        {
            id:`/pipeline/${pipelineId}/set/info`,
            title:"流水线信息",
            purviewCode:"pipeline_seting",
        },
        {
            id:`/pipeline/${pipelineId}/set/message`,
            title:"消息通知方案",
            purviewCode:"pip_message_notice",
        },
        {
            id:`/pipeline/${pipelineId}/set/user`,
            title:"成员",
            purviewCode:"pipeline_user",
        },
        {
            id:`/pipeline/${pipelineId}/set/role`,
            title:"权限",
            purviewCode:"pipeline_auth",
        },
    ]

    return(
        <PipelineSetAside
            {...props}
            domainId={pipelineId}
            projectRouters={projectRouters}
            outerPath={`/pipeline/${pipelineId}/set`}
        >
        </PipelineSetAside>
    )
}

export default PipelineSetting
