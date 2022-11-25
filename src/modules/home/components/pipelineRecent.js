import React from "react";
import {Space} from "antd";
import {
    HistoryOutlined
} from "@ant-design/icons";
import Guide from "../../common/guide/guide";
import "./pipelineRecent.scss";
import success from "../../../assets/images/svg/success.svg";
import error from "../../../assets/images/svg/error.svg";
import fog from "../../../assets/images/svg/fog.svg";
import halt from "../../../assets/images/svg/halt.svg";

const PipelineRecent = props =>{

    const {pipelineNearList} = props

    const goPipeline = pipelineId => {
        props.history.push(`/index/task/${pipelineId}/survey`)
    }

    const src = buildStatus =>{
        switch (buildStatus) {
            case 10:
                return  success
            case 1:
                return  error
            case 0:
                return  fog
            case 20:
                return  halt
        }
    }

    const renderList = item => {
        return  <div className="pipelineRecent-item" key={item.pipelineId}
                     onClick={()=>goPipeline(item.pipelineId)}
                >
            <div className="pipelineRecent-item-title">
                <Space>
                    <span className={`mf-icon-${item.pipeline.color} pipelineRecent-icon`}>
                        {item.pipelineName.substring(0,1).toUpperCase()}
                    </span>
                    <span className="pipelineRecent-name">
                        {item.pipelineName}
                    </span>
                </Space>
            </div>
            <div className="pipelineRecent-item-details">
                <div className="pipelineRecent-item-detail">
                    <span>状态</span>
                    <span><img src={src(item.pipelineMassage.buildStatus)} alt={"log"} className="detail-imgs"/></span>
                </div>
                <div className="pipelineRecent-item-detail">
                    <span>成功</span>
                    <span>{item.pipelineExecState.successNumber}</span>
                </div>
                <div className="pipelineRecent-item-detail">
                    <span>失败</span>
                    <span>{item.pipelineExecState.errorNumber}</span>
                </div>
            </div>
        </div>
    }


    return(
        <div className="pipelineRecent">
            <Guide
                title={"最近访问的流水线"}
                icon={<HistoryOutlined />}
            />
            <div  className="pipelineRecent-content">
                {
                    pipelineNearList && pipelineNearList.map(item=>{
                        return renderList(item)
                    })
                }
            </div>
        </div>
    )
}

export default PipelineRecent