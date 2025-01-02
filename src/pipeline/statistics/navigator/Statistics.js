import React from 'react';
import PipelineSetAside from "../../../common/component/aside/PipelineSetAside";

/**
 * 统计侧边栏--三级导航
 * @param props
 * @returns {Element}
 * @constructor
 */
const Statistics = (props) => {

    const {match} = props

    const pipelineId = match.params.id;

    const projectRouters = [
        {
            id: `/pipeline/${pipelineId}/statistics/operate`,
            title: '运行统计',
        },
        {
            id: `/pipeline/${pipelineId}/statistics/result`,
            title: '结果统计',
        },
    ]

    return (
        <PipelineSetAside
            {...props}
            domainId={pipelineId}
            projectRouters={projectRouters}
            outerPath={`/pipeline/${pipelineId}/statistics`}
        >
        </PipelineSetAside>
    )
}

export default Statistics
