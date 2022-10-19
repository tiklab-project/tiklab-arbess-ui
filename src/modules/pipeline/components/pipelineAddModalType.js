import React from "react";
import {NodeIndexOutlined} from "@ant-design/icons";

const rightLis = [
    {
        id:2,
        title:"Java",
        desc:"Linux",
        first:"构建",
        second:"部署",
        type:2131,
    },
    {
        id:3,
        title:"Java",
        desc: "docker",
        first:"构建",
        second:"部署",
        type:2132,
    },
    {
        id:4,
        title:"Java",
        desc: "Linux",
        zreo: "测试",
        first:"构建",
        second:"部署",
        type:112131,
    },
    {
        id:5,
        title:"Java",
        desc: "docker",
        zreo: "测试",
        first:"构建",
        second:"部署",
        type:112132,
    },
    {
        id:6,
        title:"Node.js",
        desc: "Linux",
        first:"构建",
        second:"部署",
        type:2231,
    },
    {
        id:7,
        title:"Node.js",
        desc: "Linux",
        first:"构建",
        second:"部署",
        type:2232,
    },
]

const PipelineAddModalType = props =>{

    const {templateType,setTemplateType} = props

    const renderLis = rightLis =>{
        return rightLis.map(item=>{
            return(
                <div key={item.id}
                     className={`pipelineAddModalType-li ${templateType==item.type?"pipelineAddModalType-selected":""}`}
                     onClick={()=>setTemplateType(item.type)}
                >
                    <div className="pipelineAddModalType-li-header">
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
                    <div className="pipelineAddModalType-li-content">
                        { item.zreo? name(item.zreo) : null }
                        { name(item.first) }
                        { name(item.second) }
                    </div>
                </div>
            )
        })
    }

    const name = liName =>{
        return  <div className="li-step">
                    <span className="li-step-name">{liName}</span>
                </div>
    }

    return(
       <>
           <div className="pipelineAddModalType">
               <div className="pipelineAddModalType-ul"  id="pipelineAddModalType">
                   <div style={{height:40}}>自定义模板</div>
                   <div
                       className={`pipelineAddModalType-li ${templateType==1?"pipelineAddModalType-selected":""}`}
                       onClick={()=>setTemplateType(1)}
                   >
                       <div className="li-self">自定义配置</div>
                   </div>
                   <div style={{height:50,lineHeight:"50px"}}>推荐模板</div>
                   {renderLis(rightLis)}
               </div>
           </div>
       </>
    )
}

export default PipelineAddModalType