import React from "react";
import "./pipelineAddTemplate.scss";

const lis = [
    {
        id:2,
        first:"构建",
        firstIcon:"goujiangongju",
        second:"部署",
        secondIcon:"bushubanben"
    },
    {
        id:3,
        first:"部署",
        firstIcon:"bushubanben",
        second:"构建",
        secondIcon:"goujiangongju",
    },
]

const PipelineAddTemplate = props =>{

    const {templateType,setTemplateType} = props

    const renderLis = lis =>{
        return lis.map(item=>{
            return(
                <div key={item.id}
                     className={`pipelineTemplate-li ${templateType==item.id?"pipelineTemplate-selected":""}`}
                     onClick={()=>setTemplateType(item.id)}
                >
                    <div className="pipelineTemplate-li-content">
                        <div className="li-step">
                            <svg className="icon" aria-hidden="true">
                                <use xlinkHref={`#icon-${item.firstIcon}`} />
                            </svg>
                            <span className="li-step-name">
                                {item.first}
                            </span>
                        </div>
                        <div className="li-step">
                            <svg className="icon" aria-hidden="true">
                                <use xlinkHref={`#icon-${item.secondIcon}`} />
                            </svg>
                            <span className="li-step-name">
                                {item.second}
                            </span>
                        </div>
                    </div>
                </div>
            )
        })
    }

    return(
        <div className="pipelineTemplate">
            <div className="pipelineTemplate-title">快速配置模板</div>
            <div className="pipelineTemplate-ul">
                <div
                    className={`pipelineTemplate-li ${templateType==1?"pipelineTemplate-selected":""}`}
                    onClick={()=>setTemplateType(1)}
                >
                    <div className="li-step li-self">自定义模板</div>
                </div>
                {renderLis(lis)}
            </div>
        </div>
    )
}

export default PipelineAddTemplate