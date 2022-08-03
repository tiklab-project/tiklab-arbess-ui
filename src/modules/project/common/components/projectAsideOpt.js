import React from "react";
import "./projectAsideOpt.scss";
import {Dropdown,Menu} from "antd";
import {inject,observer} from "mobx-react";

const ProjectAsideOpt = props =>{

    const {matFlowStore,structureListStore,path} = props

    const {matFlowName,matFlowList,lastPath} = matFlowStore
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
                    <Menu>
                        {
                            matFlowList && matFlowList.map(item=>{
                                return(
                                    <Menu.Item
                                        onClick={()=>{changeMatFlow(item)}}
                                        key={item.matFlowId}
                                        className="opt-content-group_item"
                                    >
                                        {item.matFlowName}
                                    </Menu.Item>
                                )
                            })
                        }
                     </Menu>
                </div>
            </div>
        </div>
    )

    return(
        <Dropdown overlay={menu} trigger={["click"]}>
            <li className="aside_content aside_dropdown"
                style={{padding:10}}
                onClick={(e) => e.preventDefault()}
            >
                    <svg  className="icon" aria-hidden="true">
                        <use xlinkHref="#icon-shaixuan1"/>
                    </svg>
            </li>
        </Dropdown>
    )
}

export default inject("structureListStore","matFlowStore")(observer(ProjectAsideOpt))