import React,{useState} from "react";
import {CaretDownOutlined,CaretRightOutlined} from "@ant-design/icons";
import {getTime} from "../../../common/client/Client";
import TaskIcon from "../../design/processDesign/processDesign/components/TaskIcon";

const HistoryDetailTree = props =>{

    const {treeData,logData,setLogData,setId,isRun} = props

    const [expandedTree,setExpandedTree] = useState([])

    const isExpandedTree = key => expandedTree.some(item => item === key)

    /**
     * 展开闭合
     * @param group
     */
    const setOpenOrClose = group => {
        if (isExpandedTree(group.id)) {
            setExpandedTree(expandedTree.filter(item => item!==group.id))
        } else {
            setExpandedTree(expandedTree.concat(group.id))
        }
        taskLog(group)
    }

    /**
     * 设置日志
     * @param item
     */
    const taskLog = item => {
        if(isRun){
            return setId(item.id)
        }
        setLogData(item)
    }

    const renderLi = (item,itemIndex) =>{
        return(
            <div className={`tree-li ${logData.id===item.id?"tree-li-active":""}`} key={itemIndex}
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

    const renderSubLi = (group,groupIndex) =>{
        return(
            <div className="tree-li" key={groupIndex}>
                <div className={`tree-li-firsts ${logData.id===group.id?"tree-li-active":""}`}
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
                        group?.taskInstanceList.map((list,listIndex)=>{
                            return renderLi(list,listIndex)
                        })
                    }
                </div>
            </div>
        )
    }


    return(
        <div className="tree-ul">
            {
                treeData?.stageInstanceList && treeData.stageInstanceList.map((group,groupIndex)=>{
                    return renderSubLi(group,groupIndex)
                })
            }

        </div>
    )
}

export default HistoryDetailTree
