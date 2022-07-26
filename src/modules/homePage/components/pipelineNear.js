import React, {Fragment} from "react";
import {List} from "antd";

const PipelineNear = props =>{

    const {pipelineNearList} = props

    const goPipeline = item => {
        props.history.push(`/index/task/${item.pipelineName}/work`)
    }

    return(
        <div className="homePage-content-pipelineNear">
            <div className="pipelineNear-title">最近打开的流水线</div>
            <div className="pipelineNear-active">
                <List
                    size="small"
                    locale={{emptyText:
                            <Fragment>
                                <svg className="icon" aria-hidden="true" >
                                    <use xlinkHref="#icon-meiyouxiangguan"/>
                                </svg>
                                <div>没有数据</div>
                            </Fragment>
                    }}
                    dataSource={pipelineNearList}
                    renderItem={(item,index)=><List.Item>
                        <div key={item.pipelineId} className="pipelineNear-active-group">
                            <div className="pipelineNear-active-group-desc">
                                <span>{index+1}、</span>
                                <span  onClick={()=>goPipeline(item)} className="name">
                                    {item.pipelineName}
                                </span>
                            </div>
                        </div>
                    </List.Item>}
                />
            </div>
        </div>
    )
}

export default PipelineNear