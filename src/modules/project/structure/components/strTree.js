import React,{useState} from "react";
import {CaretDownOutlined,CaretRightOutlined} from "@ant-design/icons";
import {getTime} from "../../../common/client/client";
import SIcon from "../../../config/common/components/sIcon";

const StrTree = props =>{

    const {treeData,logData,setLogData,setId,index} = props

    const [expandedTree,setExpandedTree] = useState([])

    const isExpandedTree = (key) => expandedTree.some(item => item === key)

    //展开闭合 分类
    const setOpenOrClose = group => {
        if (isExpandedTree(group.id)) {
            setExpandedTree(expandedTree.filter(item => item!==group.id))
        } else {
            setExpandedTree(expandedTree.concat(group.id))
        }
        taskLog(group)
    }
    
    const taskLog = item => {
        switch (index) {
            case 2:
                setLogData(item)
                break
            default:
                setId(item.id)
        }
    }
    
    const renderLi = (item,itemIndex,deep) =>{
        return(
            <div className={`tree-li ${logData.id===item.id?"tree-li-active":""}`} key={itemIndex}
                 onClick={()=>taskLog(item)}
            >
                <div className="tree-li-firsts" style={{cursor:"pointer",paddingLeft:`${ deep*20+5 }`}}>
                    <div className="tree-li-first">
                        <div className="tree-li-icon">
                            <SIcon type={item.type} />
                        </div>
                        <div className="tree-li-name">{item.name}</div>
                    </div>
                    <div className="tree-li-time">{getTime(item.time)}</div>
                </div>
            </div>
        )
    }

    const renderSubLi = (group,groupIndex,deep) =>{
        return(
            <div key={groupIndex} className="tree-li">
                <div className={`tree-li-firsts ${logData.id===group.id?"tree-li-active":""}`}
                     style={{paddingLeft: `${deep * 20+5}`}}
                     onClick={()=>setOpenOrClose(group)}
                >
                    <div className="tree-li-first">
                        <div className="tree-li-icon">
                            {
                                group.runLogList?
                                    (isExpandedTree(group.id)?
                                            <CaretDownOutlined style={{fontSize: "10px"}}/> :
                                            <CaretRightOutlined style={{fontSize: "10px"}}/>
                                    ): ""
                            }
                        </div>
                        <div className="tree-li-name">{group.name}</div>
                    </div>
                    <div className="tree-li-time">{getTime(group.time)}</div>
                </div>
                <div className={`tree-ul ${isExpandedTree(group.id) ? null:"tree-li-hidden"}`}>
                    {
                        group.runLogList && group.runLogList.map((item,itemIndex)=>{
                            const deepnew = deep + 1
                            return item.runLogList && item.runLogList.length?renderSubLi(item,itemIndex,deepnew):renderLi(item,itemIndex,deepnew)
                        })
                    }
                </div>
            </div>
        )
    }

    return(
        <div className="tree-ul">
            {
                treeData && treeData.runLogList && treeData.runLogList.map((group,groupIndex)=>{
                    return group.runLogList && group.runLogList.length > 0 ?
                        renderSubLi(group,groupIndex,0):renderLi(group,groupIndex,0)
                })
            }
        </div>
    )
}

export default StrTree