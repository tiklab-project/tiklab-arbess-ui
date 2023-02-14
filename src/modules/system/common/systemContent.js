import React,{useEffect,useState} from "react";
import {DownOutlined,UpOutlined} from "@ant-design/icons";
import {PrivilegeButton} from "tiklab-privilege-ui";
import {departmentRouters,templateRouter} from "./sysRouters";
import {inject,observer} from "mobx-react";
import {SYSTEM_ROLE_STORE} from "tiklab-privilege-ui/lib/store";
import {getUser} from "tiklab-core-ui";
import {renderRoutes} from "react-router-config";
import "./system.scss";

const SystemContent= props =>  {

    const {route,isDepartment,applicationRouters,systemRoleStore} = props

    const {getSystemPermissions} = systemRoleStore

    const path = props.location.pathname
    const [selectKey,setSelectKey] = useState(path)
    const [expandedTree,setExpandedTree] = useState([""])  // 树的展开与闭合
    const [department,setDepartment] = useState(["","","",""])

    const x = (type,data) => {
        let arr = []
        let a = "matflow"
        switch (type){
            case 0:
                arr = ["orga","user","user_dir"]
                break
            case 1:
                arr = ["resources_server","resources_host"]
                break
            case 2:
                arr = ["message_type","message_setting"]
                break
            case 3:
                arr = ["pipeline_log"]
                break
        }
        for (let i = 0; i < arr.length; i++) {
            if (data.indexOf(arr[i]) > -1){
                return arr[i]
            }
        }
        return a
    }

    useEffect(()=>{
        getSystemPermissions(getUser().userId).then(res=>{
            const data = res.data && res.data
            for(let i=0;i<department.length;i++){
                department[i] = x(i,data)
            }
            setDepartment([...department])
        })
    },[])

    useEffect(()=>{
        setSelectKey(path)
    },[path])

    const select = data =>{
        props.history.push(data.id)
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

    const menu = (data,deep) =>{
        return(
            <li style={{cursor:"pointer",paddingLeft:`${deep*20+20}`}}
                className={`system-aside-li system-aside-second ${data.id=== selectKey ? "system-aside-select" :null}`}
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
                {menu(data,deep)}
            </PrivilegeButton>
        )
    }

    const subMenu = (item,deep) =>{
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
                        item.children && item.children.map(item =>{
                            const deepnew = deep +1
                            return item.children && item.children.length?
                                subMenu(item,deepnew) : menu(item,deepnew)
                        })
                    }
                </ul>
            </li>
        )
    }

    const renderSubMenu = (item,deep)=> {
        return (
            <PrivilegeButton key={item.id} code={item.purviewCode} {...props}>
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

    return (
       <div className="system">
           <div className="system-aside">
               <ul className="system-aside-top" style={{padding:0}}>
                   {
                       isDepartment && departmentRouters(department && department).map(firstItem => {
                           return firstItem.children && firstItem.children.length > 0 ?
                               renderSubMenu(firstItem,0) : renderMenu(firstItem,0)
                       })
                   }

                   {
                       applicationRouters(department && department).map(firstItem => {
                           return firstItem.children && firstItem.children.length > 0 ?
                               renderSubMenu(firstItem,0) : renderMenu(firstItem,0)
                       })
                   }

                   {
                       devProduction && templateRouter.map(firstItem=>{
                           return firstItem.children && firstItem.children.length > 0 ?
                               subMenu(firstItem,0) : menu(firstItem,0)
                       })
                   }
               </ul>
           </div>
           <div className="system-content">
               {renderRoutes(route.routes)}
           </div>
       </div>
    )

}

export default inject(SYSTEM_ROLE_STORE)(observer(SystemContent))
