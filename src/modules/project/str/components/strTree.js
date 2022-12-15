import React,{useState} from "react";
import {CaretDownOutlined,CaretRightOutlined,FileOutlined} from "@ant-design/icons";

const li = [
    {
        id:"1",
        title:"阶段1",
        children:[
            {
                id:"1-1",
                title:"阶段1-1",
                children:[
                    {
                        id:"1-1-1",
                        title:"阶段1-1-1"
                    },
                    {
                        id:"1-1-2",
                        title:"阶段1-1-2",
                        children:[
                            {
                                id:"1-1-2-1",
                                title:"阶段1-1-2-1",
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        id:"2",
        title:"阶段2",
        children:[
            {
                id:"2-1",
                title:"阶段2-1",
                children:[
                    {
                        id:"2-1-1",
                        title:"阶段2-1-1"
                    }
                ]
            }
        ]
    },
]

const StrTree = props =>{

    const [expandedTree, setExpandedTree] = useState([]);

    const isExpandedTree = (key) => {
        return expandedTree.some(item => item === key)
    }

    //展开闭合 分类
    const setOpenOrClose = key => {
        if (isExpandedTree(key)) {
            setExpandedTree(expandedTree.filter(item => item !== key))
        } else {
            setExpandedTree(expandedTree.concat(key))
        }
    }

    const renderLi = (item,deep) =>{
        return(
            <div className="tree-li" key={item.id}
                 style={{cursor:"pointer",paddingLeft:`${ deep*20 }`}}
            >
                <div className="tree-li-first">
                    <div className="tree-li-icon">
                        <FileOutlined />
                    </div>
                    <div>{item.title}</div>
                </div>
            </div>
        )
    }

    const renderSubLi = (group,deep) =>{
        return(
            <div key={group.id} className="tree-li">
                <div className="tree-li-first"
                     style={{paddingLeft: `${deep * 20 }`}}
                     onClick={()=>setOpenOrClose(group.id)}
                >
                    <div className="tree-li-icon">
                        {
                            group.children?
                                (isExpandedTree(group.id)?
                                        <CaretDownOutlined style={{fontSize: "10px"}}/> :
                                        <CaretRightOutlined style={{fontSize: "10px"}}/>
                                ): ""
                        }
                    </div>
                    <div>{group.title}</div>
                </div>
                <div className={`tree-ul ${isExpandedTree(group.id) ? null:"tree-li-hidden"}`}>
                    {
                        group.children && group.children.map(item=>{
                            const deepnew = deep + 1
                            return item.children && item.children.length?renderSubLi(item,deepnew):renderLi(item,deepnew)
                        })
                    }
                </div>
            </div>
        )
    }

    return(
        <div className="tree-ul">
            {
                li.map(group=>{
                    return group.children && group.children.length > 0 ?
                        renderSubLi(group,0):renderLi(group,0)
                })
            }
        </div>
    )
}

export default StrTree