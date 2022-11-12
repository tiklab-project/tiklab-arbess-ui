import React from "react";
import {HistoryOutlined} from "@ant-design/icons";
import Guide from "../../common/guide/guide";
import ListName from "../../common/list/listname";
import EmptyText from "../../common/emptyText/emptyText";

// 最近访问的流水线
const PipelineNear = props =>{

    const {pipelineNearList} = props

    const goPipeline = pipelineId => {
        props.history.push(`/index/task/${pipelineId}/survey`)
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
        <Guide
            title={"最近访问的流水线"}
            icon={<HistoryOutlined />}
        />
        <div className="pipelineNear-bottom">
            {
                pipelineNearList && pipelineNearList.length > 0 ?
                    pipelineNearList && pipelineNearList.map(item=>{
                        return renderList(item)
                    })
                    :
                    <div className="homePage-empty">
                        <EmptyText
                            title={"最近没有访问记录"}
                        />
                    </div>
            }
        </div>
    </div>
}

export default PipelineNear