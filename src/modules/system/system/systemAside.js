import React, { useEffect, useState} from 'react';
import { DownOutlined,UpOutlined} from '@ant-design/icons';
import {PrivilegeButton} from "doublekit-privilege-ui";

const SystemAside= props =>  {

    const path = props.location.pathname
    const [selectKey,setSelectKey] = useState(path)
    const [expandedTree, setExpandedTree] = useState(['/index/system/power/feature'])  // 树的展开与闭合

    useEffect(()=>{
        setSelectKey(path)
    },[path])

    useEffect(()=>{
        if(path === '/index/system/power/feature' || path ==='/index/system/power/role'){
            setExpandedTree([path,'1'])
        }
    },[])

    const router = [
        {
            key:'/index/system/base',
            label:'用户管理',
            icon:'icon-gongzuotongji',
            enCode:'A',
        },
        {
            key:'/index/system/list',
            label:'用户列表',
            icon:'icon-gongzuotongji',
            enCode:'B',
        },
        {
            key:'/index/system/directory',
            label:'用户目录',
            icon:'icon-gongzuotongji',
            enCode:'C',
        },
        {
            key:'/index/system/organ',
            label:'组织管理',
            icon:'icon-gongzuotongji',
            enCode:'D',
        },
        {
            key:1,
            label:'权限管理',
            icon:'icon-gongzuotongji',
            enCode:'E',
            children:[
                {
                    key:'/index/system/power/feature',
                    label:'功能管理',
                    icon:'icon-gongzuotongji',
                    enCode:'E',
                },
                {
                    key:'/index/system/power/role',
                    label:'角色管理',
                    icon:'icon-gongzuotongji',
                    enCode:'E',
                }
            ]
        },
        {
            key:'/index/system/proof',
            label:'凭证设置',
            icon:'icon-gongzuotongji',
            enCode:'F',
        },
        {
            key:'/index/system/plugin',
            label:'插件管理',
            icon:'icon-gongzuotongji',
            enCode:'G',
        },
        {
            key:'/index/system/info',
            label:'系统信息',
            icon:'icon-gongzuotongji',
            enCode:'H',
        },
        {
            key:'/index/system/log',
            label:'系统日志',
            icon:'icon-gongzuotongji',
            enCode:'J',
        },
    ]

    const select = key =>{
        props.history.push(key)
    }

    const renderMenu = (data,deep)=> {
        return (
            <PrivilegeButton key={data.key} code={data.enCode}>
                <li
                    style={{cursor: "pointer",paddingLeft: `${deep * 20 + 20}`}}
                    className={`orga-aside-li orga-aside-second ${data.key=== selectKey ? "orga-aside-select" : ""}`}
                    onClick={()=>select(data.key)}
                    key={data.code}
                >
                    <svg className="icon" aria-hidden="true">
                        <use xlinkHref={`#${data.icon}`} />
                    </svg>
                    <span>{data.label}</span>
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

    const renderSubMenu = (item,deep)=> {
        return (
            <PrivilegeButton  key={item.key} code={item.enCode}>
                <li key={item.code} title={item.label} className="orga-aside-li">
                    <div
                        className="orga-aside-item orga-aside-first"
                        style={{paddingLeft: `${deep * 20 + 20}`}}
                        onClick={() => setOpenOrClose(item.key)}
                    >
                    <span style={{color: "$blue-main"}}>
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref={`#${item.icon}`} />
                        </svg>
                        <span className="orga-aside-title">{item.label}</span>
                    </span>
                        <div className="orga-aside-item-icon">
                            {
                                item.children ?
                                    (isExpandedTree(item.key)?
                                            <DownOutlined style={{fontSize: "10px"}}/> :
                                            <UpOutlined style={{fontSize: "10px"}}/>
                                    ): ""
                            }
                        </div>
                    </div>
                    <ul
                        title={item.label}
                        className={`orga-aside-ul ${isExpandedTree(item.key) 
                            ? null: 'orga-aside-hidden'}`}
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

    return (
        <div className="orga-aside">
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
