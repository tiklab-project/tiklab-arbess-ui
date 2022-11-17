import React from "react";
import {Profile} from "tiklab-eam-ui";
import {Space} from "antd";
import {withRouter} from "react-router-dom";
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