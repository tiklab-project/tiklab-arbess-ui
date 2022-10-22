import React from "react";
import Guide from "./guide";

// 最近访问的流水线
const PipelineNear = props =>{

    const {pipelineNearList} = props

    const goPipeline = pipelineId => {
        props.history.push(`/index/task/${pipelineId}/work`)
    }

    const renderList = (item) => {
        return <div
            onClick={()=>goPipeline(item.pipelineId)}
            className="pipelineNear-bottom-list"
            key={item.pipelineId}
        >
            <div className="pipelineNear-item">
                <div>
                    <span className="pipelineNear-item-icon">
                        U
                    </span>
                    <span className="pipelineNear-item-pipelineName">
                        {item.pipelineName}
                    </span>
                </div>
                <div>{item.pipeline.pipelineCreateTime}</div>
            </div>
        </div>
    }

    return <div className="pipelineNear">
        <Guide
            title={"最近访问的流水线"}
        />
        <div className="pipelineNear-bottom">
            {
                pipelineNearList && pipelineNearList.map(item=>{
                    return renderList(item)

                })
            }
        </div>

    </div>
}

export default PipelineNear