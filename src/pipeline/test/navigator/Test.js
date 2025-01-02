import React from 'react';
import PipelineSetAside from "../../../common/component/aside/PipelineSetAside";

/**
 * 流水线测试导航--三级导航
 * @param props
 * @returns {Element}
 * @constructor
 */
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
                    title: 'Maven',
                }
            ]
        },
        {
            id: 'automated',
            title: '自动化测试',
            children: [
                {
                    id: `/pipeline/${pipelineId}/test/testHubo`,
                    title: 'TestHubo',
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
