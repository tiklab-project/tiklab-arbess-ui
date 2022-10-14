import React from "react";
import EmptyText from "./emptyText";

// 最近打开的流水线
const PipelineNear = props =>{
    const {pipelineNearList} = props

    const goPipeline = pipelineId => {
        props.history.push(`/index/task/${pipelineId}/work`)
    }

    return <div className="pipelineNear">
        <div className="pipelineNear-title">最近打开的流水线</div>
        <div className="pipelineNear-list">
            {
                pipelineNearList && pipelineNearList.length>0 ?
                    pipelineNearList.map((item,index)=>{
                        return  <div key={item.pipelineId} className="pipelineNear-list-item">
                            <div className="pipelineNear-list-item-desc">
                                <span>{index+1}、</span>
                                <span onClick={()=>goPipeline(item.pipelineId)} className="name">
                                    {item.pipelineName}
                                 </span>
                            </div>
                        </div>
                    })
                    :
                    <EmptyText/>
            }
        </div>
    </div>
}

export default PipelineNear