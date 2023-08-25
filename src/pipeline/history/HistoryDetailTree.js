import React,{useState} from "react";
import {CaretDownOutlined,CaretRightOutlined} from "@ant-design/icons";
import {getTime} from "./components/HistoryTrigger";
import TaskIcon from "../design/processDesign/processDesign/components/TaskIcon";

const HistoryDetailTree = props =>{

    const {treeData,id,changeAnchor} = props

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

    const renderLi = item =>{

        return(
            <div className={`tree-li ${id===item.id?"tree-li-active":""}`} key={item.id}
                 onClick={()=>taskLog(item)}
            >
                <div className="tree-li-firsts" style={{cursor:"pointer",paddingLeft:25}}>
                    <div className="tree-li-first">
                        <div className="tree-li-icon">
                            <TaskIcon type={item.taskType} />
                        </div>
                        <div className="tree-li-name">{item.taskName}</div>
                    </div>
                    <div className="tree-li-time">{item.runTimeDate}</div>
                </div>
            </div>
        )
    }

    const renderSubLi = group =>{
        return(
            <div className="tree-li" key={group.id}>
                <div className={`tree-li-firsts ${id===group.id?"tree-li-active":""}`}
                     style={{paddingLeft: 5}}
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
                    <div className="tree-li-time">{getTime(group.stageTime)}</div>
                </div>
                <div className={`tree-ul ${isExpandedTree(group.id) ? null:"tree-li-hidden"}`}>
                    {
                        group?.taskInstanceList.map(list=>{
                            return renderLi(list)
                        })
                    }
                </div>
            </div>
        )
    }


    return(
        <div className="bottom-tree">
            <div className="tree-ul">
                {

                    treeData?.stageInstanceList && treeData.stageInstanceList.map(group=>{
                        return renderSubLi(group)
                    })
                }
            </div>
        </div>
    )
}

export default HistoryDetailTree
