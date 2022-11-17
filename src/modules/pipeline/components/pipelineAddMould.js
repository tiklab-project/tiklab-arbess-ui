import React from "react";
import {NodeIndexOutlined,RightOutlined} from "@ant-design/icons";

const PipelineAddMould = props =>{

    const {item,index,changTemplate} = props

    const renderLis = item =>{
        return <div className={`pipeline-template-li ${index? "pipeline-template-li-step1":""}`}
                    onClick={()=>changTemplate && changTemplate(index)}
                >
                <div>
                    <div className="pipeline-template-li-header">
                        <div className="li-header-title">
                        <span className="li-header-icon">
                            <NodeIndexOutlined />
                        </span>
                            <span className="li-header-name">
                            {item.title}-
                        </span>
                        </div>
                        <div className="li-header-desc">
                            <span>部署到</span>
                            <span className="li-header-title">
                            {item.desc}
                        </span>
                            <span>环境</span>
                        </div>
                    </div>
                    <div className="pipeline-template-li-content">
                        { item.zreo? name(item.zreo) : null }
                        { name(item.first) }
                        { name(item.second) }
                    </div>
                </div>
                {
                    index &&
                    <div className="pipeline-template-arrow">
                        <RightOutlined />
                    </div>
                }
            </div>
    }

    const name = liName =>{
        return  <div className="li-step">
                    <span className="li-step-name">{liName}</span>
                </div>
    }

    return(
       <>
           {
               renderLis(item)
           }
       </>
    )
}

export default PipelineAddMould