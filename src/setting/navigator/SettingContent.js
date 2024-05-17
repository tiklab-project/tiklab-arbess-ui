import React, {useState} from "react";
import {DownOutlined, ProjectOutlined, UpOutlined} from "@ant-design/icons";
import {SystemNav,PrivilegeButton} from "thoughtware-privilege-ui";
import {applyJump} from 'thoughtware-core-ui';
import {inject,observer} from "mobx-react";
import {renderRoutes} from "react-router-config";
import  {ExportOutlined} from "@ant-design/icons";
import "./SettingContent.scss";

// 基础数据路由
const templateRouter = [
    {
        id:"base",
        title:"基础数据",
        icon:<ProjectOutlined />,
        children:[
            {
                id:"/setting/syr/feature",
                title:"系统功能",
            },
            {
                id:"/setting/roletrue",
                title:"系统角色",
            },
            {
                id:"/setting/project/feature",
                title:"项目功能",
            },
            {
                id:"/setting/project/role",
                title:"项目角色",
            },
            {
                id:"/setting/project/vRole",
                title:"项目虚拟角色",
            },
            {
                id:"/setting/todoTask",
                title:"待办任务",
            },
            {
                id:"/setting/task",
                title:"待办事项",
            },
            {
                id:"/setting/todoTemp",
                title:"待办模板 ",
            },
            {
                id:"/setting/todoType",
                title:"待办类型 ",
            },
            {
                id:"/setting/logTemplate",
                title:"日志模板",
            },
            {
                id:"/setting/logType",
                title:"日志类型",
            },
            {
                id:"/setting/type",
                title:"消息类型",
            },
            {
                id:"/setting/sendtrue",
                title:"消息发送方式",
            },
            {
                id:"/setting/systemNotice",
                title:"系统消息通知方案",
            },
            {
                id:"/setting/projectNotice",
                title:"项目消息通知方案",
            },
            {
                id:"/setting/userGrouptrue",
                title:"用户组true",
            },
        ]
    }
]

const SettingContent= props =>  {

    const {route,applicationRouters,systemRoleStore} = props

    const {systemPermissions} = systemRoleStore

    let path = props.location.pathname

    // 菜单
    let menus = () => {
        try{
            if(devProduction){
                return [...applicationRouters,...templateRouter]
            }else {
                return applicationRouters
            }
        }catch {
            return applicationRouters
        }
    }

    // 树的展开与闭合
    const [expandedTree,setExpandedTree] = useState([""])

    const li = ['orga','user','user_group','user_dir'];
    const authConfig = JSON.parse(localStorage.getItem("authConfig"));
    const isUnify = data =>{
        if(!authConfig?.authType){
            const isAuth = li.some(item => item===data.purviewCode)
            if(isAuth){return false}
        }
        return true
    }

    /**
     * 路由跳转
     * @param data
     * @returns {*}
     */
    const select = data => {
        if(!isUnify(data)){
            return applyJump(`${authConfig?.authServiceUrl}/#${data.id}`)
        }
        props.history.push(data.id)
    }


    const isExpandedTree = key => expandedTree.some(item => item ===key)


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

    const renderMenu = (data,deep)=> {
        return (
            <PrivilegeButton key={data.id} code={data.purviewCode} {...props}>
                <li style={{cursor:"pointer",paddingLeft:deep}}
                    className={`system-aside-li system-aside-second ${path === data.id  ? "system-aside-select":""}`}
                    onClick={()=>select(data)}
                    key={data.id}
                >
                    {data?.icon && <span className="sys-content-icon">{data.icon}</span>}
                    <span className='aside-second-title'>{data.title}</span>
                    {!isUnify(data)&&<span className='aside-second-link'><ExportOutlined /></span>}
                </li>
            </PrivilegeButton>
        )
    }

    const subMenu = (item,deep) =>{
        return(
            <li key={item.id} className="system-aside-li">
                <div className="system-aside-item system-aside-first"
                     style={{paddingLeft: deep}}
                     onClick={()=>setOpenOrClose(item.id)}
                >
                    <div>
                        {
                            item?.icon &&
                            <span className="sys-content-icon">{item.icon}</span>
                        }
                        <span className="system-aside-title">{item.title}</span>
                    </div>
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
                            const deepnew = deep + 20
                            return item.children && item.children.length ?
                                renderSubMenu(item,deepnew) : renderMenu(item,deepnew)
                        })
                    }
                </ul>
            </li>
        )
    }

    const renderSubMenu = (item,deep)=> {
        const isCode = item.children.some(list=>!list.purviewCode)
        if(isCode) return subMenu(item,deep)
        const isPromise = item.children.some(list=> systemPermissions.includes(list.purviewCode))
        return isPromise && subMenu(item,deep)
    }

    return (
        <SystemNav
            {...props}
            applicationRouters={menus()}
            expandedTree={expandedTree}
            setExpandedTree={setExpandedTree}
            outerPath={"/setting"}
            noAccessPath={"/noaccess"}
        >
            <div className="system">
                <div className="system-aside">
                    <ul className="system-aside-top" style={{padding:0}}>
                        {
                            menus().map(firstItem => {
                                return firstItem.children && firstItem.children.length > 0 ?
                                    renderSubMenu(firstItem,30) : renderMenu(firstItem,30)
                            })
                        }
                    </ul>
                </div>
                <div className="system-content">
                    { renderRoutes(route.routes) }
                </div>
            </div>
        </SystemNav>
    )
}

export default inject("systemRoleStore")(observer(SettingContent))

