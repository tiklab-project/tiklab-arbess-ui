import React,{useEffect,useState} from "react";
import {DownOutlined,UpOutlined} from "@ant-design/icons";
import {PrivilegeButton,MenuList} from "tiklab-privilege-ui";
import {departmentRouter,applicationRouter,templateRouter} from "./sysRouters";
import {inject, observer} from "mobx-react";
import {SYSTEM_ROLE_STORE} from "tiklab-privilege-ui/lib/store";

const SystemAside= props =>  {

    const path = props.location.pathname
    const [selectKey,setSelectKey] = useState(path)
    const [expandedTree,setExpandedTree] = useState(["/index/system/syr/feature"])  // 树的展开与闭合
    const [selectedKeys,setSelectedKeys] = useState(["/index/system/syr/feature"])  // 树的展开与闭合

    const authType = JSON.parse(localStorage.getItem("authConfig")).authType

    useEffect(()=>{
        setSelectKey(path)
    },[path])

    const select = key =>{
        props.history.push(key)
    }

    const renderMenu = (data,deep)=> {
        return (
            <PrivilegeButton key={data.id} code={data.purviewCode} {...props}>
                <li style={{cursor:"pointer",paddingLeft:`${deep*20+20}`}}
                    className={`system-aside-li system-aside-second ${data.id=== selectKey ? "system-aside-select" :null}`}
                    onClick={()=>select(data.id)}
                    key={data.id}
                >
                    <span className="sys-content-icon">{data.icon}</span>
                    <span>{data.title}</span>
                </li>
            </PrivilegeButton>
        )
    }

    const renderSubMenu = (item,deep)=> {
        return (
            <PrivilegeButton key={item.id} code={item.purviewCode} {...props}>
                <li key={item.code} className="system-aside-li">
                    <div className="system-aside-item system-aside-first"
                         style={{paddingLeft: `${deep * 20 + 20}`}}
                         onClick={()=>setOpenOrClose(item.id)}
                    >
                        <span>
                            <span className="sys-content-icon">{item.icon}</span>
                            <span className="system-aside-title">{item.title}</span>
                        </span>
                        <div className="system-aside-item-icon">
                            {
                                item.children ?
                                    (isExpandedTree(item.id)?
                                        <DownOutlined style={{fontSize: "10px"}}/> :
                                        <UpOutlined style={{fontSize: "10px"}}/>
                                    ): ""
                            }
                        </div>
                    </div>
                    <ul className={`system-aside-ul ${isExpandedTree(item.id) ? null: "system-aside-hidden"}`}>
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
            <ul className="system-aside-top">
                {
                    authType && departmentRouter.map(firstItem => {
                        return firstItem.children && firstItem.children.length > 0 ?
                            renderSubMenu(firstItem,0) : renderMenu(firstItem,0)
                    })
                }
                {
                    applicationRouter.map(firstItem => {
                        return firstItem.children && firstItem.children.length > 0 ?
                            renderSubMenu(firstItem,0) : renderMenu(firstItem,0)
                    })
                }
                {
                    devProduction && templateRouter.map(firstItem=>{
                        return firstItem.children && firstItem.children.length > 0 ?
                            renderSubMenu(firstItem,0) : renderMenu(firstItem,0)
                    })
                }
            </ul>
        </div>
    )

    // const onSelectMenu = (e) => {
    //     setSelectedKeys([e.key])
    // }
    // return(
    //     <MenuList
    //         data={[...departmentRouter,...applicationRouter, ...templateRouter]}
    //         onSelectMenu={onSelectMenu}
    //         allPromise={props.systemRoleStore.systemPermissions}
    //
    //
    //         defaultSelectedKeys={menuKeys.selectedKeys}
    //         defaultOpenKeys={menuKeys.openKeys}
    //         selectedKeys={menuKeys.selectedKeys}
    //         openKeys={menuKeys.openKeys}
    //
    //     />
    // )

}

export default inject(SYSTEM_ROLE_STORE)(observer(SystemAside));
