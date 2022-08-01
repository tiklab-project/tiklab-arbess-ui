import React,{useEffect,useState} from "react";
import {DownOutlined,UpOutlined} from "@ant-design/icons";
import {PrivilegeButton} from "tiklab-privilege-ui";
import {inject,observer} from "mobx-react";

const ProjectSetLeftNav= props =>  {

    const {match,matFlowStore} = props

    const {setLastPath} = matFlowStore

    let path = props.location.pathname
    const matFlowName = match.params.matFlowName
    const [selectKey,setSelectKey] = useState(path)
    const [expandedTree, setExpandedTree] = useState(["/index/task/assembly/feature"])   // 树的展开与闭合

    useEffect(()=>{
        if(path.substring(path.lastIndexOf('/') + 1) !=="assembly"){
            setLastPath(path.substring(path.lastIndexOf('/') + 1))
        }
        setSelectKey(path)
    },[path])


    const router = [
        {
            key:`/index/task/${matFlowName}/assembly/user`,
            label:"项目成员",
            icon:"#icon-gongzuotongji",
            enCode:"DD1",
        },
        {
            key:`/index/task/${matFlowName}/assembly/role`,
            label:"角色管理",
            icon:"#icon-gongzuotongji",
            enCode:"DD2",
        },
        {
            key:`/index/task/${matFlowName}/assembly/proof`,
            label:"凭证管理",
            icon:"#icon-gongzuotongji",
            enCode:"DD3",
        },
        {
            key:`/index/task/${matFlowName}/assembly/redel`,
            label:"其他管理",
            icon:"#icon-gongzuotongji",
            enCode:"DD4",
        },
    ]

    const select = key =>{
        props.history.push(key)
    }

    const renderMenu = (router,deep)=> {
        return router.map(data=>{
            return  <PrivilegeButton key={data.key} code={data.enCode} {...props}>
                <li style={{cursor: "pointer",paddingLeft: `${deep * 20 + 20}`}}
                    className={`projectSet-aside-li projectSet-aside-second ${data.key=== selectKey ? "projectSet-aside-select" : ""}`}
                    onClick={()=>select(data.key)}
                    key={data.key}
                >
                    <svg className="icon" aria-hidden="true">
                        <use xlinkHref={data.icon} />
                    </svg>
                    <span>{data.label}</span>
                </li>
            </PrivilegeButton>
            })
    }

    return (
        <div className="projectSet-aside">
            <ul style={{padding: 0}} key="0">
                {renderMenu(router,0)}
            </ul>
        </div>
    )
}

export default inject("matFlowStore")(observer(ProjectSetLeftNav))
