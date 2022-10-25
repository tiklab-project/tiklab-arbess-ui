import React,{useEffect,useState} from "react";
import {DownOutlined,UpOutlined} from "@ant-design/icons";
import {PrivilegeButton} from "tiklab-privilege-ui";
import {userRouter,Router} from "./sysRouters";

const SystemAside= props =>  {

    const path = props.location.pathname
    const [selectKey,setSelectKey] = useState(path)
    const [expandedTree,setExpandedTree] = useState(["/index/system/syr/feature"])  // 树的展开与闭合

    useEffect(()=>{
        setSelectKey(path)
    },[path])

    const select = key =>{
        props.history.push(key)
    }

    const renderMenu = (data,deep)=> {
        return (
            <PrivilegeButton key={data.key} code={data.enCode} {...props}>
                <li style={{cursor:"pointer",paddingLeft:`${deep*20+20}`}}
                    className={`system-aside-li system-aside-second ${data.key=== selectKey ? "system-aside-select" :null}`}
                    onClick={()=>select(data.key)}
                    key={data.key}
                >
                    <svg className="icon" aria-hidden="true">
                        <use xlinkHref={data.icon} />
                    </svg>
                    <span>{data.label}</span>
                </li>
            </PrivilegeButton>
        )
    }

    const renderSubMenu = (item,deep)=> {
        return (
            <PrivilegeButton key={item.key} code={item.enCode} {...props}>
                <li key={item.code} className="system-aside-li">
                    <div className="system-aside-item system-aside-first"
                         style={{paddingLeft: `${deep * 20 + 20}`}}
                         onClick={()=>setOpenOrClose(item.key)}
                    >
                        <span style={{color: "$blue-main"}}>
                            <svg className="icon" aria-hidden="true">
                                <use xlinkHref={item.icon} />
                            </svg>
                            <span className="system-aside-title">{item.label}</span>
                        </span>
                        <div className="system-aside-item-icon">
                            {
                                item.children ?
                                    (isExpandedTree(item.key)?
                                        <DownOutlined style={{fontSize: "10px"}}/> :
                                        <UpOutlined style={{fontSize: "10px"}}/>
                                    ): ""
                            }
                        </div>
                    </div>
                    <ul className={`system-aside-ul ${isExpandedTree(item.key) ? null: "system-aside-hidden"}`}>
                        {
                            item.children && item.children.map(item =>{
                                const deepnew = deep +1
                                return item.children && item.children.length?
                                    renderSubMenu(item,deepnew) : renderMenu(item,deepnew)
                            })
                        }
                    </ul>
                </li>
            </PrivilegeButton>
        )
    }

    const isExpandedTree = key => {
        return expandedTree.some(item => item ===key)
    }

    const setOpenOrClose = key => {
        if (isExpandedTree(key)) {
            setExpandedTree(expandedTree.filter(item => item !== key))
        } else {
            setExpandedTree(expandedTree.concat(key))
        }
    }

    return (
        <div className="system-aside">
            <ul style={{padding: "10px 0 0"}} key="0" className="system-aside-top">
                {
                    userRouter && userRouter.map(firstItem => {
                        return firstItem.children && firstItem.children.length > 0 ?
                            renderSubMenu(firstItem,0) : renderMenu(firstItem,0)
                    })
                }
            </ul>
        </div>
    )
}

export default SystemAside
