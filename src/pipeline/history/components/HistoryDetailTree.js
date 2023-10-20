import React,{useState} from "react";
import {CaretDownOutlined,CaretRightOutlined} from "@ant-design/icons";
import {TaskIcon} from "../../design/processDesign/gui/TaskTitleIcon";
import {runStatusIcon,getTime} from "./HistoryCommon";

const HistoryDetailTree = props =>{

    const {pipeline,id,changeAnchor,execData} = props

    const [expandedTree,setExpandedTree] = useState([])

    const isExpandedTree = key => expandedTree.some(item => item === key)

    /**
     * 展开闭合
     */
    const setOpenOrClose = (group) => {
        if (isExpandedTree(group.id)) {
            setExpandedTree(expandedTree.filter(item => item!==group.id))
        } else {
            setExpandedTree(expandedTree.concat(group.id))
        }
        taskLog(group)
    }

    /**
     * 日志
     */
    const taskLog = (item) => {
        changeAnchor(item.id)
    }

    const renderLi = (item,deep) =>{
        return(
            <div className={`tree-li ${id===item.id?"tree-li-active":""}`} key={item.id}
                 onClick={()=>taskLog(item)}
            >
                <div className="tree-li-firsts" style={{cursor:"pointer",paddingLeft:deep}}>
                    <div className="tree-li-first">
                        <div className="tree-li-icon">
                            <TaskIcon type={item.taskType} />
                        </div>
                        <div className="tree-li-name">{item.taskName}</div>
                    </div>
                    <div className="tree-li-state">{runStatusIcon(item.runState)}</div>
                    <div className="tree-li-time">{item.runTimeDate}</div>
                </div>
            </div>
        )
    }

    const renderSubLi = (group,deep) =>{
        const {taskInstanceList} = group
        return(
            <div className="tree-li" key={group.id}>
                <div className={`tree-li-firsts ${id===group.id?"tree-li-active":""}`}
                     style={{paddingLeft: deep,fontSize:15}}
                     onClick={()=>setOpenOrClose(group)}
                >
                    <div className="tree-li-first">
                        <div className="tree-li-icon">
                            {
                                isExpandedTree(group.id)?
                                    <CaretDownOutlined style={{fontSize: "10px"}}/> :
                                    <CaretRightOutlined style={{fontSize: "10px"}}/>
                            }
                        </div>
                        <div className="tree-li-name">{group.stageName}</div>
                    </div>
                    <div className="tree-li-state">{runStatusIcon(group.stageState)}</div>
                    <div className="tree-li-time">{getTime(group.stageTime)}</div>
                </div>
                <div className={`tree-ul ${isExpandedTree(group.id) ? null:"tree-li-hidden"}`}>
                    {
                        taskInstanceList && taskInstanceList.map(list=>renderLi(list,45))
                    }
                </div>
            </div>
        )
    }


    return(
        <div className="bottom-tree">
            <div className="tree-ul">
                {
                    pipeline?.type===1?
                    execData && execData.map(item=>renderLi(item,5))
                    :
                    execData && execData.map(group=>{
                        const {stageInstanceList} = group
                        return (
                            <div className="tree-li" key={group.id}>
                                <div className={`tree-li-firsts ${id===group.id?"tree-li-active":""}`}
                                     style={{paddingLeft:5,fontSize:16}}
                                     onClick={()=>setOpenOrClose(group)}
                                >
                                    <div className="tree-li-first">
                                        <div className="tree-li-icon">
                                            {
                                                isExpandedTree(group.id)?
                                                    <CaretDownOutlined style={{fontSize: "10px"}}/> :
                                                    <CaretRightOutlined style={{fontSize: "10px"}}/>
                                            }
                                        </div>
                                        <div className="tree-li-name">{group.stageName}</div>
                                    </div>
                                    <div className="tree-li-state">{runStatusIcon(group.stageState)}</div>
                                    <div className="tree-li-time">{getTime(group.stageTime)}</div>
                                </div>
                                <div className={`tree-ul ${isExpandedTree(group.id) ? null:"tree-li-hidden"}`}>
                                    {
                                        stageInstanceList && stageInstanceList.map(list=>{
                                            return renderSubLi(list,25)
                                        })
                                    }
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default HistoryDetailTree
