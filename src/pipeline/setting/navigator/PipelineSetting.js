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
            id:`/pipeline/${pipelineId}/setting/info`,
            title:"流水线信息",
            purviewCode:"pipeline_seting",
        },
        {
            id:`/pipeline/${pipelineId}/setting/message`,
            title:"消息通知方案",
            purviewCode:"pip_message_notice",
        },
        {
            id:`/pipeline/${pipelineId}/setting/user`,
            title:"成员",
            purviewCode:"pipeline_user",
        },
        {
            id:`/pipeline/${pipelineId}/setting/role`,
            title:"权限",
            purviewCode:"pipeline_auth",
        },
    ]

    return(
        <PipelineSetAside
            {...props}
            domainId={pipelineId}
            projectRouters={projectRouters}
            outerPath={`/pipeline/${pipelineId}/setting`}
        >
        </PipelineSetAside>
    )
}

export default PipelineSetting
