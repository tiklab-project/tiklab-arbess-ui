import React, {useState} from "react";
import {DownOutlined, HomeOutlined, ProjectOutlined, UpOutlined} from "@ant-design/icons";
import {SystemNav,PrivilegeButton} from "thoughtware-privilege-ui";
import {applyJump, disableFunction} from 'thoughtware-core-ui';
import {inject,observer} from "mobx-react";
import  {ExportOutlined} from "@ant-design/icons";
import feature from '../../../assets/images/pip_feature.png';
import "./SettingAside.scss";

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

const SettingAside = props =>  {

    const {enhance,outerPath,applicationRouters,systemRoleStore} = props;

    const {systemPermissions} = systemRoleStore;

    let path = props.location.pathname;
    const disable = disableFunction();
    const authConfig = JSON.parse(localStorage.getItem("authConfig"));

    // 树的展开与闭合
    const [expandedTree,setExpandedTree] = useState([""])

    //设置菜单
    const menus = () => {
        try{
            if(devProduction){
                return [...applicationRouters,...templateRouter]
            } else {
                return applicationRouters
            }
        }catch {
            return applicationRouters
        }
    }

    /**
     * 路由跳转
     * @param data
     * @returns {*}
     */
    const select = data => {
        const {isUnify,isEnhance,id} = data
        if(!!isUnify && !authConfig?.authType){
            return applyJump(`${authConfig?.authServiceUrl}/#${isUnify}`)
        }
        if(isEnhance && disable){
            if (typeof enhance === 'function') {
                enhance();
            }
            return
        }
        props.history.push(id)
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
                    <div className='system-aside-li-left'>
                        {data?.icon && <span className="sys-content-icon">{data.icon}</span>}
                        <span className='aside-second-title'>{data.title}</span>
                    </div>
                    {
                        !!data.isUnify && !authConfig?.authType &&
                        <span className='aside-second-link'><ExportOutlined /></span>
                    }
                    {
                        data.isEnhance && disable &&
                        <img src={feature} alt="增强功能" width={16} height={16}/>
                    }
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

                    <div className='system-aside-li-left'>
                        {item?.icon && <span className="sys-content-icon">{item.icon}</span>}
                        <span className='aside-second-title'>{item.title}</span>
                    </div>
                    <div className="system-aside-item-icon">
                        {
                            item.children ?
                                (isExpandedTree(item.id)?
                                        <DownOutlined style={{fontSize: "10px",fontWeight:"bold"}}/> :
                                        <UpOutlined style={{fontSize: "10px",fontWeight:"bold"}}/>
                                ): ""
                        }
                    </div>
                </div>
                <ul className={`system-aside-ul ${isExpandedTree(item.id) ? null: "system-aside-hidden"}`}>
                    {
                        item.children && item.children.map(item =>{
                            const deepnew = deep + 28
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
            outerPath={outerPath}
            noAccessPath={"/noaccess"}
        >
            <div className="system-aside">
                <ul className="system-aside-top">
                    <li className='system-aside-head'>
                        设置
                    </li>
                    <li className="system-aside-back" onClick={()=>props.history.push('/home')}>
                        <div className='aside-back-box'>
                           <span className="aside-back-box-icon">
                                <HomeOutlined />
                            </span>
                            <span className="aside-back-box-title">返回首页</span>
                        </div>
                    </li>
                    {
                        menus().map(firstItem => {
                            return firstItem.children && firstItem.children.length > 0 ?
                                renderSubMenu(firstItem,20) : renderMenu(firstItem,20)
                        })
                    }
                    {props.children}
                </ul>
            </div>
        </SystemNav>
    )
}

export default inject("systemRoleStore")(observer(SettingAside))

