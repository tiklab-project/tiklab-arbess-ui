import React from "react";
import {withRouter} from "react-router-dom";
import backpack from "../../../assets/images/svg/backpack.svg";
import buzzer from "../../../assets/images/svg/buzzer.svg";
import candy from "../../../assets/images/svg/candy.svg";
import helmet from "../../../assets/images/svg/helmet.svg";
import EmptyText from "../../common/emptyText/emptyText";
import "./dynaList.scss";

const DynaList = props =>{

    const {dynamicList,pipelineId} = props

    const dynaGo = item =>{
        if(isPipeline(item.opLogTemplate.link)){
            props.history.push(item.opLogTemplate.link)
        }
    }

    // 判断流水线是否还存在
    const isPipeline = id =>{
        const arr = id.split('/')
        return pipelineId && pipelineId.some(item=>item===arr[3])
    }

    const img = actionType =>{
        switch (actionType) {
            case "LOG_PIPELINE":
                return backpack
            case "LOG_PIPELINE_AUTH":
                return helmet
            case "LOG_PIPELINE_CONFIG":
                return buzzer
            case "LOG_PIPELINE_RUN":
                return candy
            case "LOG_PIPELINE_USER":
                return buzzer
        }
    }

    const renderLis = (item,index) => {
        return <div key={index} className="dynamic-item" onClick={()=>dynaGo(item)}>
            <div className="dynamic-item-icon">
                <img src={img(item.actionType.id)} alt={""}/>
            </div>
            <div className="dynamic-item-message">
                <div className="dynamic-item-message-title">
                    {item.opLogTemplate.title}
                </div>
                <div
                    dangerouslySetInnerHTML={{__html: item.opLogTemplate.content}}
                />
            </div>
            <div>{item.timestamp}</div>
        </div>
    }

    return (
        <div className="dynamic-center">
            {
                dynamicList && dynamicList.length>0?
                dynamicList.map((item,index)=>{
                    return renderLis(item,index)
                })
                :
                <EmptyText title={"没有近期动态"}/>
            }
        </div>
    )
}

export default withRouter(DynaList)