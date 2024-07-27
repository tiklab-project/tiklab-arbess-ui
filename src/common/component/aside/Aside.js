import React, {useState} from "react";
import {ArrowLeftOutlined, DownOutlined, LeftCircleOutlined, UpOutlined} from "@ant-design/icons";
import {SystemNav,PrivilegeButton} from "thoughtware-privilege-ui";
import {applyJump, disableFunction} from 'thoughtware-core-ui';
import {inject,observer} from "mobx-react";
import {renderRoutes} from "react-router-config";
import  {ExportOutlined} from "@ant-design/icons";
import feature from '../../../assets/images/pip_feature.png';
import "./Aside.scss";

const Aside = props =>  {

    const {route,enhance,outerPath,applicationRouters,systemRoleStore} = props;

    const {systemPermissions} = systemRoleStore;

    let path = props.location.pathname;
    const disable = disableFunction();
    const authConfig = JSON.parse(localStorage.getItem("authConfig"));

    // 树的展开与闭合
    const [expandedTree,setExpandedTree] = useState([""])

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
                    <div>
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

                    <div>
                        {item?.icon && <span className="sys-content-icon">{item.icon}</span>}
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
            applicationRouters={applicationRouters}
            expandedTree={expandedTree}
            setExpandedTree={setExpandedTree}
            outerPath={outerPath}
            noAccessPath={"/noaccess"}
        >
            <div className="system">
                <div className="system-aside">
                    <ul className="system-aside-top">
                        <li className='system-aside-top-head'>
                            <span className='top-head-icon' onClick={()=>props.history.push('/home')}><ArrowLeftOutlined /></span>
                            <span className='top-head-text'>设置</span>
                        </li>
                        {
                            applicationRouters.map(firstItem => {
                                return firstItem.children && firstItem.children.length > 0 ?
                                    renderSubMenu(firstItem,30) : renderMenu(firstItem,30)
                            })
                        }
                        {props.children}
                    </ul>
                </div>
                <div className="system-content">
                    { renderRoutes(route.routes) }
                </div>
            </div>
        </SystemNav>
    )
}

export default inject("systemRoleStore")(observer(Aside))

