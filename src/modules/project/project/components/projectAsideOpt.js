import React  from "react";
import "./projectAsideOpt.scss";
import {Dropdown} from "antd";

const ProjectAsideOpt = props =>{

    let {pipelineList,isPrompt,visible,setVisible,setPipeline} = props
    const pipelineName = localStorage.getItem("pipelineName")

    const onClick = (e,item) => {
        e.preventDefault()
        if(pipelineName!==item.pipelineName){
            if(!isPrompt){ // 如果为false，直接改变pipelineName和pipelineId
                localStorage.setItem("pipelineName",item.pipelineName)
                localStorage.setItem("pipelineId",item.pipelineId)
            }else {
                setPipeline(item)
                props.history.push(`/home/task/config`)
            }
        }
        setVisible(false)
    }

    const menu = (
        <div className="opt">
            <div className="opt-content">
                <div className="opt-content-title">流水线名称</div>
                <div className="opt-content-group">
                    {
                        pipelineList && pipelineList.map(item=>{
                            return(
                                <div onClick={e =>{onClick(e,item)}}
                                     key={item.pipelineId}
                                     className="opt-content-group_item"
                                >
                                    {item.pipelineName}
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )

    return(
        <li onClick={()=>setVisible(!visible)}
            onBlur={()=>setVisible(false)}
            className="aside_content aside_dropdown"
            style={{padding:10}}
        >
            <Dropdown overlay={menu} visible={visible}>
                <svg  className="icon" aria-hidden="true">
                    <use xlinkHref="#icon-shaixuan1"/>
                </svg>
            </Dropdown>
        </li>
    )
}

export default ProjectAsideOpt