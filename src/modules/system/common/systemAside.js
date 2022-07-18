import React,{useEffect,useState} from "react";
import {DownOutlined,UpOutlined} from "@ant-design/icons";
import {PrivilegeButton} from "doublekit-privilege-ui";

const SystemAside= props =>  {

    const path = props.location.pathname
    const [selectKey,setSelectKey] = useState(path)
    const [expandedTree, setExpandedTree] = useState(["/index/system/power/feature"])  // 树的展开与闭合

    useEffect(()=>{
        setSelectKey(path)
    },[path])

    useEffect(()=>{
        if(path.indexOf("/index/system/power")===0){
            setExpandedTree([path,"1"])
        }
        if(path.indexOf("/index/system/project")===0){
            setExpandedTree([path,"2"])
        }
    },[])

    const router = [
        {
            key:"/index/system/base",
            label:"用户管理",
            icon:"#icon-gongzuotongji",
            enCode:"A",
        },
        {
            key:"/index/system/list",
            label:"用户列表",
            icon:"#icon-gongzuotongji",
            enCode:"B",
        },
        {
            key:"/index/system/directory",
            label:"用户目录",
            icon:"#icon-gongzuotongji",
            enCode:"C",
        },
        {
            key:"/index/system/org",
            label:"组织管理",
            icon:"#icon-gongzuotongji",
            enCode:"D",
        },
        {
            key:"1",
            label:"系统权限中心",
            icon:"#icon-gongzuotongji",
            enCode:"E",
            children:[
                {
                    key:"/index/system/power/feature",
                    label:"系统功能",
                    icon:"#icon-gongzuotongji",
                    enCode:"E",
                },
                {
                    key:"/index/system/power/role",
                    label:"系统角色",
                    icon:"#icon-gongzuotongji",
                    enCode:"E",
                }
            ]
        },
        {
            key:"2",
            label:"项目权限中心",
            icon:"#icon-gongzuotongji",
            enCode:"I",
            children:[
                {
                    key:"/index/system/project/feature",
                    label:"项目功能",
                    icon:"#icon-gongzuotongji",
                    enCode:"I",
                },
                {
                    key:"/index/system/project/role",
                    label:"项目角色",
                    icon:"#icon-gongzuotongji",
                    enCode:"I",
                }
            ]
        },
        {
            key:"/index/system/proof",
            label:"凭证管理",
            icon:"#icon-gongzuotongji",
            enCode:"F",
        },
        {
            key:"/index/system/plug",
            label:"插件管理",
            icon:"#icon-gongzuotongji",
            enCode:"G",
        },
        {
            key:"/index/system/info",
            label:"系统信息",
            icon:"#icon-gongzuotongji",
            enCode:"H",
        },
    ]

    const select = key =>{
        props.history.push(key)
    }

    const renderMenu = (data,deep)=> {
        return (
            <PrivilegeButton key={data.key} code={data.enCode} {...props}>
                <li style={{cursor: "pointer",paddingLeft: `${deep * 20 + 20}`}}
                    className={`system-aside-li system-aside-second ${data.key=== selectKey ? "system-aside-select" : ""}`}
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
                <li key={item.code} title={item.label} className="system-aside-li">
                    <div className="system-aside-item system-aside-first"
                         style={{paddingLeft: `${deep * 20 + 20}`}}
                         onClick={() => setOpenOrClose(item.key)}
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
                    <ul title={item.label}
                        className={`system-aside-ul ${isExpandedTree(item.key) ? null: "system-aside-hidden"}`}
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

export default SystemAside
