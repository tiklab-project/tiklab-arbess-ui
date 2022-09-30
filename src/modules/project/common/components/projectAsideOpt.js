import React from "react";
import "./projectAsideOpt.scss";
import {Dropdown} from "antd";
import {CaretDownOutlined,SettingOutlined} from "@ant-design/icons";
import {inject,observer} from "mobx-react";

const ProjectAsideOpt = props =>{

    const {pipelineStore,structureListStore,path} = props

    const {pipelineName,pipelineList,lastPath,pipelineId} = pipelineStore
    const {setState,setEnforcer,setMode} = structureListStore

    const changePipeline = item => {
        if(pipelineName!==item.pipelineName){
            setState(0)
            setEnforcer(null)
            setMode(0)
            if(path===`/index/task/${pipelineName}/assembly`){
                props.history.push(`/index/task/${item.pipelineName}/assembly`)
            }else if(path.indexOf(`/index/task/${pipelineName}/assembly`) === 0) {
                props.history.push(`/index/task/${item.pipelineName}/assembly/${lastPath}`)
            }else {
                props.history.push(`/index/task/${item.pipelineName}/${lastPath}`)
            }
        }
    }

    const menu = (
        <div className="opt">
            <div className="opt-content">
                <div className="opt-content-title">流水线名称</div>
                <div className="opt-content-group">
                    {
                        pipelineList && pipelineList.map(item=>{
                            return(
                                <div onClick={()=>{changePipeline(item)}}
                                     key={item.pipelineId}
                                     className={`opt-content-group_item ${item.pipelineId===pipelineId ? "opt-content-active" : ""}`}
                                >
                                    <span className="opt-content-group-icon">
                                        <SettingOutlined/>
                                    </span>
                                    <span className="opt-content-group-name">
                                        {item.pipelineName}
                                    </span>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )

    return(
        <Dropdown overlay={menu} trigger={["click"]} overlayStyle={{paddingLeft:10}}>
            <li className="aside_content aside_dropdown aside_opt"
                onClick={(e)=>e.preventDefault()}
            >
                <span>
                    <svg  className="icon" aria-hidden="true">
                        <use xlinkHref="#icon-shaixuan1"/>
                    </svg>
                </span>
                <CaretDownOutlined className="dropdowns_icon"/>
            </li>
        </Dropdown>
    )
}

export default inject("structureListStore","pipelineStore")(observer(ProjectAsideOpt))