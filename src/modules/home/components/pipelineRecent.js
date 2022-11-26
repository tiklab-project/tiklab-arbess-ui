import React from "react";
import {Space} from "antd";
import {
    HistoryOutlined
} from "@ant-design/icons";
import Guide from "../../common/guide/guide";
import EmptyText from "../../common/emptyText/emptyText";

const PipelineRecent = props =>{

    const {pipelineNearList} = props

    const goPipeline = pipelineId => {
        props.history.push(`/index/task/${pipelineId}/survey`)
    }


    const renderList = item => {
        return  <div className="pipelineRecent-item" key={item.openId}
                     onClick={()=>goPipeline(item.pipeline.pipelineId)}
                >
            <div className="pipelineRecent-item-title">
                <Space>
                    <span className={`mf-icon-${item.pipeline.color} pipelineRecent-icon`}>
                        {item.pipeline && item.pipeline.pipelineName.substring(0,1).toUpperCase()}
                    </span>
                    <span className="pipelineRecent-name">
                        {item.pipeline && item.pipeline.pipelineName}
                    </span>
                </Space>
            </div>
            <div className="pipelineRecent-item-details">
                <div className="pipelineRecent-item-detail">
                    <span className="details-desc">成功</span>
                    <span>{item.pipelineExecState.successNumber}</span>
                </div>
                <div className="pipelineRecent-item-detail">
                    <span className="details-desc">失败</span>
                    <span>{item.pipelineExecState.errorNumber}</span>
                </div>
            </div>
        </div>
    }


    return(
        <div className="pipelineRecent">
            <Guide title={"最近访问的流水线"} icon={<HistoryOutlined />}/>
                {
                    pipelineNearList && pipelineNearList.length > 0 ?
                        <div  className="pipelineRecent-content">
                            {
                                pipelineNearList.map(item=>{
                                    return renderList(item)
                                })
                            }
                        </div>
                        :
                        <EmptyText title={"最近没有访问流水线"}/>
                }
        </div>
    )
}

export default PipelineRecent