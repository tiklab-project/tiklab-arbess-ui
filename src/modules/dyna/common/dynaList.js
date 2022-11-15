import React from "react";
import {Profile} from "tiklab-eam-ui";
import {Space} from "antd";
import {withRouter} from "react-router-dom";
import "./dynaList.scss";

const DynaList = props =>{

    const {dynamicList,pipelineId} = props

    const dynaGo = item =>{
        if(isPipeline(item.opLogTemplate.link)){
            switch (item.module) {
                case "pipelineConfig":
                    props.history.push(`/index/task/${item.opLogTemplate.link}/config`)
                    break
                case "pipeline":
                    props.history.push(`/index/task/${item.opLogTemplate.link}/survey`)
                    break
                case "run":
                    props.history.push(`/index/task/${item.opLogTemplate.link}/structure`)
            }
        }
    }

    // 判断流水线是否还存在
    const isPipeline = id =>{
        return pipelineId && pipelineId.some(item=>item===id)
    }

    const renderLis = (item,index) => {
        return <div key={index}
                    className="dynamic-item"
                    onClick={()=>dynaGo(item)}
                >
            <div className="dynamic-item-left">
                <Space>
                    <Profile userInfo={item.user}/>
                    <div className="dynamic-item-message">
                        <div className="dynamic-item-message-title">
                            {item.opLogTemplate.title}
                        </div>
                        <div
                            dangerouslySetInnerHTML={{__html: item.opLogTemplate.content}}
                        />
                    </div>
                </Space>
            </div>
            <div>{item.timestamp}</div>
        </div>
    }

    return (
        <div className="dynamic-center">
            {
                dynamicList && dynamicList.map((item,index)=>{
                    return renderLis(item,index)
                })
            }
        </div>
    )
}

export default withRouter(DynaList)