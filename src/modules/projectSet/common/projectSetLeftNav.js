import React,{useEffect,useState} from "react";
import {DownOutlined,UpOutlined} from "@ant-design/icons";

const ProjectSetLeftNav= props =>  {

    let path = props.location.pathname

    const [selectKey,setSelectKey] = useState(path)
    const [expandedTree, setExpandedTree] = useState(["/index/task/assembly/feature"])   // 树的展开与闭合

    useEffect(()=>{
        setSelectKey(path)
    },[path])

    useEffect(()=>{
        if(path === "/index/task/assembly/feature" || path ==="/index/task/assembly/role"){
            setExpandedTree([path,"1"])
        }
    },[])

    const router = [
        {
            key:"/index/task/assembly/user",
            label:"项目成员",
            icon:"#icon-gongzuotongji",
            enCode:"1",
        },
        {
            key:"/index/task/assembly/role",
            label:"角色管理",
            icon:"#icon-gongzuotongji",
            enCode:"1",
        },
        {
            key:"/index/task/assembly/proof",
            label:"凭证管理",
            icon:"#icon-gongzuotongji",
            // enCode:"3",
        },
        {
            key:"/index/task/assembly/redel",
            label:"其他管理",
            icon:"#icon-gongzuotongji",
            // enCode:"3",
        },
    ]

    const select = key =>{
        props.history.push(key)
    }

    const renderMenu = (data,deep)=> {
        return (
            <li style={{cursor: "pointer",paddingLeft: `${deep * 20 + 20}`}}
                className={`projectSet-aside-li projectSet-aside-second ${data.key=== selectKey ? "projectSet-aside-select" : ""}`}
                onClick={()=>select(data.key)}
                key={data.key}
            >
                <svg className="icon" aria-hidden="true">
                    <use xlinkHref={data.icon} />
                </svg>
                <span>{data.label}</span>
            </li>
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

    const renderSubMenu = (item,deep)=> {
        return (
            <li key={item.key} title={item.label} className="projectSet-aside-li">
                <div className="projectSet-aside-item projectSet-aside-first"
                     style={{paddingLeft: `${deep * 20 + 20}`}}
                     onClick={() => setOpenOrClose(item.key)}
                >
                    <span style={{color: "$blue-main"}}>
                         <svg className="icon" aria-hidden="true">
                            <use xlinkHref={item.icon} />
                        </svg>
                        <span className="projectSet-aside-title">{item.label}</span>
                    </span>
                    <div className="projectSet-aside-item-icon">
                        {
                            item.children ?
                                (isExpandedTree(item.key)?
                                        <DownOutlined style={{fontSize: "10px"}}/> :
                                        <UpOutlined style={{fontSize: "10px"}}/>
                                ): ""
                        }
                    </div>
                </div>
                <ul title={item.label}
                    className={`projectSet-aside-ul ${isExpandedTree(item.key) ? null: "projectSet-aside-hidden"}`}
                >
                    {
                        item.children && item.children.map(item =>{
                            const deepnew = deep +1
                            return item.children && item.children.length?
                                renderSubMenu(item,deepnew) : renderMenu(item,deepnew)
                        })
                    }
                </ul>
            </li>
        )
    }

    return (
        <div className="projectSet-aside">
            <ul style={{padding: 0}} key="0">
                {
                    router && router.map(firstItem => {
                        return firstItem.children && firstItem.children.length > 0 ?
                            renderSubMenu(firstItem,0) : renderMenu(firstItem,0)
                    })
                }
            </ul>
        </div>
    )
}

export default ProjectSetLeftNav
