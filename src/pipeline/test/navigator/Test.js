import React from 'react';
import PipelineSetAside from "../../../common/component/aside/PipelineSetAside";

const Test = (props) => {

    const {match} = props

    const pipelineId = match.params.id;

    const projectRouters = [
        {
            id: `/pipeline/${pipelineId}/test/scan`,
            title: '代码扫描',
        },
        {
            id: 'unit',
            title: '单元测试',
            children: [
                {
                    id: `/pipeline/${pipelineId}/test/maven`,
                    title: 'Maven单元测试',
                }
            ]
        },
        {
            id: 'automated',
            title: '自动化测试',
            children: [
                {
                    id: `/pipeline/${pipelineId}/test/testRubo`,
                    title: 'TestRubo自动化测试',
                }
            ]
        },
    ]

    return (
        <PipelineSetAside
            {...props}
            domainId={pipelineId}
            projectRouters={projectRouters}
            outerPath={`/pipeline/${pipelineId}/test`}
        >
        </PipelineSetAside>
    )
}

export default Test
