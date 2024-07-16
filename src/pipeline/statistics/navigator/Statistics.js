import React from 'react';
import ProjectAside from "../../../common/component/aside/ProjectAside";

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
        <ProjectAside
            {...props}
            domainId={pipelineId}
            projectRouters={projectRouters}
            outerPath={`/pipeline/${pipelineId}/statistics`}
        >
        </ProjectAside>
    )
}

export default Statistics
