import React from "react";

// 最近访问的流水线
const PipelineNear = props =>{

    const {pipelineNearList} = props

    const goPipeline = pipelineId => {
        props.history.push(`/index/task/${pipelineId}/work`)
    }

    return <div className="pipelineNear">
        <div className="pipelineNear-title">最近访问的流水线</div>
        <div className="pipelineNear-bottom">
            {
                pipelineNearList && pipelineNearList.map(item=>{
                    return(
                        <div
                            onClick={()=>goPipeline(item.pipelineId)}
                            className="pipelineNear-bottom-list"
                            key={item.pipelineId}
                        >
                            <div className="pipelineNear-item">
                                <div>
                                        <span className="pipelineNear-item-icon">
                                            U
                                        </span>
                                    {item.pipelineName}
                                </div>
                                <div>{item.pipeline.pipelineCreateTime}</div>
                            </div>
                        </div>
                    )
                })
            }
        </div>

    </div>
}

export default PipelineNear