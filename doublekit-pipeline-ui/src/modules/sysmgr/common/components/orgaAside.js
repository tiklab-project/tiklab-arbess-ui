/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-06-01 13:24:51
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-12-20 16:31:16
 */
import React,{Fragment,useState,useEffect} from 'react';
import { DownOutlined,UpOutlined} from '@ant-design/icons';
import {withRouter} from "react-router-dom";
import {inject, observer} from "mobx-react";
import { PrivilegeSystem } from "doublekit-privilege-ui";
import orgaRouter from "./orgaRouter"

const OrgaAside=(props)=>  {
    // 无子级菜单处理
    const [selectKey,setSelectKey] = useState()
    const select = (key)=>{
        setSelectKey(key)
        props.history.push(key)
        console.log(orgaRouter)
    }

    const renderMenu = (data,deep)=> {
        return (
            // <PrivilegeSystem code={data.encoded} disabled ={"hidden"} key={data.key}>
            <li style={{cursor: "pointer"}} 
                className={`orga-aside-li ${data.key=== selectKey ? "orga-aside-select" : ""}`}
                onClick={()=>select(data.key)}
                style={{paddingLeft: `${deep * 20 + 20}`}}
            >   
                <svg className="icon" aria-hidden="true">
                    <use xlinkHref={`#${data.icon}`}></use>
                </svg>
                {data.title}
            </li>
            // </PrivilegeSystem>
        )
    }
    // 树的展开与闭合
    const [expandedTree, setExpandedTree] = useState([])

    const isExpandedTree = (key) => {
        
        return expandedTree.some(item => item ===key)
    }

    const setOpenOrClose = key => {
        if (isExpandedTree(key)) {
            setExpandedTree(expandedTree.filter(item => item !== key))
        } else {
            setExpandedTree(expandedTree.concat(key))

        }
    }

    const [level,setLevel] = useState(0)
    // 子级菜单处理
    
    const renderSubMenu = ({title,key,children,encoded,icon},deep)=> {

        return (
                // <PrivilegeSystem code={encoded} key={key} disabled ={"hidden"}>
                <li key={key} title={title} className="orga-aside-li">
                    <div className="orga-aside-item"  style={{paddingLeft: `${deep * 20 + 20}`}}>
                        <span to={key} style={{color: "#0053ca"}}>
                            <svg className="icon" aria-hidden="true">
                                <use xlinkHref={`#${icon}`}></use>
                            </svg>
                            {title}
                        </span>
                        <div className="orga-aside-item-icon">
                            {
                                children ? 
                                (isExpandedTree(key)? 
                                    <DownOutlined onClick={() => setOpenOrClose(key)} style={{fontSize: "10px"}}/> :
                                    <UpOutlined onClick={() => setOpenOrClose(key)} style={{fontSize: "10px"}}/>
                                ): ""
                            }
                        </div>
                    </div>
                    
                    <ul key={key} title={title} className={`orga-aside-ul ${isExpandedTree(key) ? null: 'orga-aside-hidden'}`}>
                        {
                            children && children.map(item =>{
                                const deepnew = deep +1
                                return item.children && item.children.length?
                                    renderSubMenu(item,deepnew) : renderMenu(item,deepnew)
                                })
                        }
                    </ul>
                </li>
                // </PrivilegeSystem>
            
            
        )
    }

    return (
        <Fragment>
            <div className="orga-aside">
                <ul style={{padding: 0}} >
                    {
                        console.log(orgaRouter)
                    }
                    {
                        orgaRouter && orgaRouter.map(firstItem => {
                            return firstItem.children && firstItem.children.length > 0 ? 
                                    renderSubMenu(firstItem,0) : renderMenu(firstItem,0)
                        })
                    }
                </ul>
            </div>
        </Fragment>
    )
}
export default withRouter(OrgaAside);
