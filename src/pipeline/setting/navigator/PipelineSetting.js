import React from "react";
import Setting from "../../../common/aside/Setting";

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
    const secondRouter = [
        {
            key:`/index/pipeline/${pipelineId}/assembly/set`,
            label:"流水线信息",
            enCode:"pipeline_seting",
        },
        {
            key:`/index/pipeline/${pipelineId}/assembly/user`,
            label:"成员",
            enCode:"pipeline_user",
        },
        {
            key:`/index/pipeline/${pipelineId}/assembly/role`,
            label:"权限",
            enCode:"pipeline_auth",
        }
    ]

    return  <Setting
                {...props}
                pipelineId={pipelineId}
                secondRouter={secondRouter}
            />

}

export default PipelineSetting
