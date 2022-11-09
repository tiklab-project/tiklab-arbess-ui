import React from "react";
import Guide from "./guide";
import ListName from "../../../common/list/listname";

// 最近访问的流水线
const PipelineNear = props =>{

    const {pipelineNearList} = props

    const goPipeline = pipelineId => {
        props.history.push(`/index/task/${pipelineId}/work`)
    }

    const renderList = (item) => {
        return  <div className="pipelineNear-item" key={item.pipelineId}>
            <div className="pipelineNear-item-title">
                <ListName
                    text={item.pipelineName}
                    onClick={()=>goPipeline(item.pipelineId)}
                    colors={item.pipeline.color}
                />
            </div>
            <div>{item.pipeline.pipelineCreateTime}</div>
        </div>
    }

    return <div className="pipelineNear">
        <Guide title={"最近访问的流水线"}/>
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