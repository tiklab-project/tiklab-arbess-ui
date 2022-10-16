import React,{useEffect,useState} from "react";
import {PrivilegeButton} from "tiklab-privilege-ui";

const OrgaAside= props =>  {

    const path = props.location.pathname
    const [selectKey,setSelectKey] = useState(path)

    useEffect(()=>{
        setSelectKey(path)
    },[path])

    const router = [
        {
            key:"/index/orga/dashbord",
            label:"组织管理",
            icon:"#icon-gongzuotongji",
            enCode:"F",
        },
        {
            key:"/index/orga/directory",
            label:"目录管理",
            icon:"#icon-gongzuotongji",
            enCode:"G",
        },
        {
            key:"/index/orga/list",
            label:"用户列表",
            icon:"#icon-gongzuotongji",
            enCode:"H",
        }
    ]

    const select = key =>{
        props.history.push(key)
    }

    const renderMenu = (data,deep)=> {
        return (
            <PrivilegeButton key={data.key} code={data.enCode} {...props}>
                <li style={{cursor:"pointer",paddingLeft:`${deep*20+20}`}}
                    className={`orga-aside-li orga-aside-second ${data.key=== selectKey ? "orga-aside-select" : ""}`}
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

    return (
        <div className="orga-aside">
            <ul style={{padding: 0}} key="0" className="orga-aside-top">
                {
                    router && router.map(firstItem => renderMenu(firstItem,0))
                }
            </ul>
            <div className="orga-aside-sys" onClick={()=>props.history.push("/index/system")}>
                系统设置
            </div>
        </div>
    )
}

export default OrgaAside
