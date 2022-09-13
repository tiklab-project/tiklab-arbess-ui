import React from "react";
import "./projectAsideOpt.scss";
import {Dropdown} from "antd";
import {inject,observer} from "mobx-react";

const ProjectAsideOpt = props =>{

    const {matFlowStore,structureListStore,path} = props

    const {matFlowName,matFlowList,lastPath,matFlowId} = matFlowStore
    const {setState,setEnforcer,setMode} = structureListStore

    const changeMatFlow = item => {
        if(matFlowName!==item.matFlowName){
            setState(0)
            setEnforcer(null)
            setMode(0)
            if(path===`/index/task/${matFlowName}/assembly`){
                props.history.push(`/index/task/${item.matFlowName}/assembly`)
            }else if(path.indexOf(`/index/task/${matFlowName}/assembly`) === 0) {
                props.history.push(`/index/task/${item.matFlowName}/assembly/${lastPath}`)
            }else {
                props.history.push(`/index/task/${item.matFlowName}/${lastPath}`)
            }
        }
    }

    const menu = (
        <div className="opt">
            <div className="opt-content">
                <div className="opt-content-title">流水线名称</div>
                <div className="opt-content-group">
                    {
                        matFlowList && matFlowList.map(item=>{
                            return(
                                <div onClick={()=>{changeMatFlow(item)}}
                                     key={item.matFlowId}
                                     className={`opt-content-group_item ${item.matFlowId===matFlowId ? "opt-content-active" : ""}`}
                                >
                                    <span>
                                        {item.matFlowName}
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
            <li className="aside_content aside_dropdown"
                style={{padding:10}}
                onClick={(e)=>e.preventDefault()}
            >
                    <svg  className="icon" aria-hidden="true">
                        <use xlinkHref="#icon-shaixuan1"/>
                    </svg>
            </li>
        </Dropdown>
    )
}

export default inject("structureListStore","matFlowStore")(observer(ProjectAsideOpt))