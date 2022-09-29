import React,{useEffect,useState} from "react";
import {DownOutlined,UpOutlined} from "@ant-design/icons";
import {PrivilegeButton} from "tiklab-privilege-ui";

const SystemAside= props =>  {

    const path = props.location.pathname
    const [selectKey,setSelectKey] = useState(path)
    const [expandedTree,setExpandedTree] = useState(["/index/system/syr/feature"])  // 树的展开与闭合

    useEffect(()=>{
        setSelectKey(path)
    },[path])

    useEffect(()=>{
        if(path.indexOf("/index/system/syr")===0){
            setExpandedTree([path,"1"])
        }
        if(path.indexOf("/index/system/project")===0){
            setExpandedTree([path,"2"])
        }
        if(path.indexOf("/index/system/mes")===0){
            setExpandedTree([path,"3"])
        }
    },[])

    const router = [
        {
            key:"1",
            label:"系统权限",
            icon:"#icon-gongzuotongji",
            enCode:"E",
            children:[
                {
                    key:"/index/system/syr/feature",
                    label:"系统功能",
                    icon:"#icon-gongzuotongji",
                    enCode:"E1",
                },
                {
                    key:"/index/system/syr/role",
                    label:"系统角色",
                    icon:"#icon-gongzuotongji",
                    enCode:"E2",
                }
            ]
        },
        {
            key:"2",
            label:"项目权限",
            icon:"#icon-gongzuotongji",
            enCode:"I",
            children:[
                {
                    key:"/index/system/project/feature",
                    label:"项目功能",
                    icon:"#icon-gongzuotongji",
                    enCode:"I2",
                },
                {
                    key:"/index/system/project/role",
                    label:"项目角色",
                    icon:"#icon-gongzuotongji",
                    enCode:"I2",
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
            key:"/index/system/plugin",
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
        {
            key:"/index/system/envi",
            label:"环境配置",
            icon:"#icon-gongzuotongji",
            enCode:"J",
        },
        {
            key:"/index/system/task",
            label:"待办事项",
            icon:"#icon-gongzuotongji",
            enCode:"J",
        },
        {
            key:"/index/system/myTodoTask",
            label:"我的待办事项 ",
            icon:"#icon-gongzuotongji",
            enCode:"F",
        },
        {
            key:"/index/system/log",
            label:"日志记录",
            icon:"#icon-gongzuotongji",
            enCode:"G",
        },
        {
            key:"/index/system/myLog",
            label:"我的日志",
            icon:"#icon-gongzuotongji",
            enCode:"H",
        },
        {
            key:"/index/system/logTemplate",
            label:"日志模板",
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
                <li style={{cursor:"pointer",paddingLeft:`${deep*20+20}`}}
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
