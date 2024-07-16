import React from 'react';
import ProjectAside from "../../../common/component/aside/ProjectAside";

const Test = (props) => {

    const {match} = props

    const pipelineId = match.params.id;

    const projectRouters = [
        {
            id: `/pipeline/${pipelineId}/test/scan`,
            title: '代码扫描',
        },
        {
            id: `/pipeline/${pipelineId}/test/maven`,
            title: 'Maven单元测试',
        },
        {
            id: `/pipeline/${pipelineId}/test/teston`,
            title: 'TestOn自动化测试',
        },
    ]

    return (
        <ProjectAside
            {...props}
            domainId={pipelineId}
            projectRouters={projectRouters}
            outerPath={`/pipeline/${pipelineId}/test`}
        >
        </ProjectAside>
    )
}

export default Test
