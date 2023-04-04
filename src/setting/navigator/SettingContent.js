import React,{useEffect,useState} from "react";
import {DownOutlined,UpOutlined} from "@ant-design/icons";
import {PrivilegeButton} from "tiklab-user-ui";
import {inject,observer} from "mobx-react";
import {SYSTEM_ROLE_STORE} from "tiklab-user-ui/es/store";
import {getUser} from "tiklab-core-ui";
import {renderRoutes} from "react-router-config";
import {departmentRouters,templateRouter} from "./SettingRouters";
import "./Setting.scss";

const SettingContent= props =>  {

    const {route,isDepartment,applicationRouters,systemRoleStore} = props

    const {getSystemPermissions} = systemRoleStore

    const path = props.location.pathname

    // 当前路径
    const [selectKey,setSelectKey] = useState(path)

    // 树的展开与闭合
    const [expandedTree,setExpandedTree] = useState([""])

    // 系统权限
    const [systemPermissions,setSystemPermissions] = useState([])

    useEffect(()=>{
        //初始化菜单权限
        getSystemPermissions(getUser().userId).then(res=>{
            const data = res.data && res.data
            if(res.code===0){
                setSystemPermissions(data)
            }
        })
    },[])

    useEffect(()=>{
        // 激活菜单
        setSelectKey(path)
    },[path])

    const select = data =>{
        props.history.push(data.id)
    }

    const isExpandedTree = key => {
        return expandedTree.some(item => item ===key)
    }

    /**
     * 展开 || 闭合
     * @param key
     */
    const setOpenOrClose = key => {
        if (isExpandedTree(key)) {
            setExpandedTree(expandedTree.filter(item => item !== key))
        } else {
            setExpandedTree(expandedTree.concat(key))
        }
    }

    const menu = (data,deep) =>{
        return(
            <li style={{cursor:"pointer",paddingLeft:`${deep*20+20}`}}
                className={`system-aside-li system-aside-second ${data.id=== selectKey ? "system-aside-select":""}`}
                onClick={()=>select(data)}
                key={data.id}
            >
                <span className="sys-content-icon">{data.icon}</span>
                <span>{data.title}</span>
            </li>
        )
    }

    const renderMenu = (data,deep)=> {
        return (
            <PrivilegeButton key={data.id} code={data.purviewCode} {...props}>
                { menu(data,deep) }
            </PrivilegeButton>
        )
    }

    const subMenu = (item,deep,type) =>{
        return(
            <li key={item.id} className="system-aside-li">
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
                        type ?
                            item.children && item.children.map(item =>{
                                const deepnew = deep +1
                                return item.children && item.children.length?
                                    subMenu(item,deepnew,'devBaseData') : menu(item,deepnew)
                            })
                            :
                            item.children && item.children.map(item =>{
                                const deepnew = deep +1
                                return item.children && item.children.length ?
                                    renderSubMenu(item,deepnew) : renderMenu(item,deepnew)
                            })
                    }
                </ul>
            </li>
        )
    }

    const renderSubMenu = (item,deep)=> {
        const isPromise = item.children.some(list=> systemPermissions.includes(list.purviewCode))
        return isPromise && subMenu(item,deep)
    }

    return (
       <div className="system">
           <div className="system-aside">
               <ul className="system-aside-top" style={{padding:0}}>
                   {
                       isDepartment && departmentRouters.map(firstItem => {
                           return firstItem.children && firstItem.children.length > 0 ?
                               renderSubMenu(firstItem,0) : renderMenu(firstItem,0)
                       })
                   }

                   {
                       applicationRouters.map(firstItem => {
                           return firstItem.children && firstItem.children.length > 0 ?
                               renderSubMenu(firstItem,0) : renderMenu(firstItem,0)
                       })
                   }

                   {
                       devProduction && templateRouter.map(firstItem=>{
                           return firstItem.children && firstItem.children.length > 0 ?
                               subMenu(firstItem,0,"devBaseData") : menu(firstItem,0)
                       })
                   }
               </ul>
           </div>
           <div className="system-content">
               {renderRoutes(route.routes) }
           </div>
       </div>
    )

}

export default inject(SYSTEM_ROLE_STORE)(observer(SettingContent))
