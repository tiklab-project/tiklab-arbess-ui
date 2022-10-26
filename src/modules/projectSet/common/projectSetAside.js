import React,{useState,useEffect} from "react";
import {PrivilegeButton} from "tiklab-privilege-ui";
import {inject,observer} from "mobx-react";
import "./projectSetAside.scss";
import {SettingOutlined} from "@ant-design/icons";

const ProjectSetAside = props =>{

    const {pipelineStore} = props

    let path = props.location.pathname
    const [nav,setNav] = useState("")

    const {pipelineId,setLastPath} = pipelineStore

    useEffect(()=>{
        setLastPath(path.substring(path.lastIndexOf('/') + 1))
        setNav(path)
    },[path])

    // 侧边流水线设置的第二级导航
    const secondRouter = [
        {
            key:`/index/task/${pipelineId}/assembly/user`,
            label:"项目成员",
            enCode:"DD1",
        },
        {
            key:`/index/task/${pipelineId}/assembly/role`,
            label:"角色管理",
            enCode:"DD2",
        },
        {
            key:`/index/task/${pipelineId}/assembly/proof`,
            label:"凭证管理",
            enCode:"DD3",
        },
        {
            key:`/index/task/${pipelineId}/assembly/redel`,
            label:"其他管理",
            enCode:"DD4",
        },
    ]
    
    const renderRouter = item => {
        return(
            <PrivilegeButton key={item.key} code={item.enCode} {...props}>
                <div className={`projectSet-item ${nav===item.key?"projectSet-select":""} `}
                     onClick={()=>props.history.push(item.key)}
                >
                    <span className="projectSet-item-icon">
                        <SettingOutlined/>
                    </span>
                    <span className="projectSet-item-label">
                        {item.label}
                    </span>
                </div>
            </PrivilegeButton>
        )
    }

    return(
        <div className="projectSet-aside">
            {secondRouter.map(item=>{
                    return renderRouter(item)
            })}
        </div>
    )
}

export default inject("pipelineStore")(observer(ProjectSetAside))