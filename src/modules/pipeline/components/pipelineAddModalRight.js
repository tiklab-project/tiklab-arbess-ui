import React from "react";
import {NodeIndexOutlined} from "@ant-design/icons";
import ProjectRename from "../../project/reDel/projectRename";

const PipelineAddModalRight = props =>{

    const {templateType,setTemplateType,pipelineList,form,onScroll,lis} = props

    const renderLis = lis =>{
        return lis.map(item=>{
            return(
                <div key={item.id}
                     id={item.type}
                     className={`pipelineAddModalRight-li ${templateType==item.id?"pipelineAddModalRight-selected":""}`}
                     onClick={()=>setTemplateType(item.id)}
                >
                    <div className="pipelineAddModalRight-li-header">
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
                    <div className="pipelineAddModalRight-li-content">
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
           <ProjectRename
               form={form}
               pipelineList={pipelineList}
               layout={"vertical"}
           />
           <div className="pipelineAddModalRight">
               <div className="pipelineAddModalRight-ul"  id="pipelineAddModalRight" onScroll={onScroll}>
                   <div style={{height:40}}>自定义模板</div>
                   <div
                       id={"1"}
                       className={`pipelineAddModalRight-li ${templateType==1?"pipelineAddModalRight-selected":""}`}
                       onClick={()=>setTemplateType(1)}
                   >
                       <div className="li-self">自定义配置</div>
                   </div>
                   <div style={{height:50,lineHeight:"50px"}}>推荐模板</div>
                   {renderLis(lis)}
               </div>
           </div>
       </>
    )
}

export default PipelineAddModalRight