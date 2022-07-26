import React from "react";
import "./projectAsideOpt.scss";
import {Dropdown} from "antd";
import {inject,observer} from "mobx-react";

const ProjectAsideOpt = props =>{

    const {visible,setVisible,pipelineStore,structureListStore,path} = props

    const {pipelineName,pipelineList,lastPath} = pipelineStore
    const {setState,setEnforcer,setMode} = structureListStore

    const changePipeline = (e,item) => {
        e.preventDefault()
        if(pipelineName!==item.pipelineName){
            setState(0)
            setEnforcer(null)
            setMode(0)
            if(path === `/index/task/${pipelineName}/assembly`){
                props.history.push(`/index/task/${item.pipelineName}/assembly`)
            }else if (path.indexOf(`/index/task/${pipelineName}/assembly`) === 0) {
                props.history.push(`/index/task/${item.pipelineName}/assembly/${lastPath}`)
            }else {
                props.history.push(`/index/task/${item.pipelineName}/${lastPath}`)
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
                                <div onClick={e=>{changePipeline(e,item)}}
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

export default inject("structureListStore","pipelineStore")(observer(ProjectAsideOpt))