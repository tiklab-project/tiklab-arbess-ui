import React from "react";
import {UserOutlined} from "@ant-design/icons";
import Guide from "./guide";

const DynamicList = props =>{

    const {dynamicList} = props

    const goPipeline = item => {
        props.history.push(`/index/task/${item.pipelineId}/config`)
    }

    
    const renderType = type => {
        switch (type) {
            case "delete":
                return "删除"
            case "update":
                return "更新"
            case "create":
                return "创建"
        }
    }

    const renderLis = (item,index) => {
        return <div className="dynamic-item" key={index}>
            <div className="dynamic-item-left">
                <div className="dynamic-item-icon">
                    <UserOutlined/>
                </div>
                <div>
                    <div className="dynamic-item-userName">
                        {item.userName}
                    </div>
                    <div className="dynamic-item-message">
                        <span>{renderType(item.type)}了流水线</span>
                        {
                            item.templateType === "pipeline" && item.type === "delete" ?
                                <span className="pipelineName">
                                    {item.pipelineName}
                                </span>
                                :
                                <span
                                    className={"pipelineName dynamic-item-pipelineName"}
                                    onClick={()=>goPipeline(item)}
                                >
                                    {item.pipelineName}
                                </span>
                        }
                        <span>{item.message}</span>
                    </div>
                </div>
            </div>
            <div>{item.createTime}</div>
        </div>
    }


    return(
        <div className={"dynamic"}>
            <Guide
                title={"近期动态"}
                type={"dynamic"}
            />
            <div className="dynamic-bottom">
                {
                    dynamicList && dynamicList.map((item,index)=>{
                        return renderLis(item,index)
                    })
                }
            </div>

        </div>
    )
}

export default DynamicList