import React,{useState,useEffect} from "react";
import {PrivilegeProjectButton} from "tiklab-privilege-ui";
import {SettingOutlined} from "@ant-design/icons";
import {inject,observer} from "mobx-react";
import "./projectSetAside.scss";

const ProjectSetAside = props =>{

    const {pipelineStore} = props

    let path = props.location.pathname
    const [nav,setNav] = useState("")

    const {pipelineId} = pipelineStore

    // 侧边流水线设置的第二级导航
    const secondRouter = [
        {
            key:`/index/task/${pipelineId}/assembly/set`,
            label:"设置",
            enCode:"pipeline_seting",
        },
        {
            key:`/index/task/${pipelineId}/assembly/user`,
            label:"成员",
            enCode:"pipeline_user",
        },
        {
            key:`/index/task/${pipelineId}/assembly/role`,
            label:"权限",
            enCode:"pipeline_auth",
        }
    ]

    useEffect(()=>{
        setNav(path)
    },[path])

    const navContent = item =>{
        return <div
                    key={item.key}
                    className={`projectSet-item ${nav===item.key?"projectSet-select":""} `}
                    onClick={()=>props.history.push(item.key)}
                >
                    <span className="projectSet-item-icon">
                        <SettingOutlined/>
                    </span>
                    <span className="projectSet-item-label">
                        {item.label}
                    </span>
             </div>
    }

    const renderRouter = item => {
        return  <PrivilegeProjectButton key={item.key} code={item.enCode} domainId={pipelineId}>
                    {navContent(item)}
                </PrivilegeProjectButton>
    }



    return(
        <div className="projectSet-aside">
            {
                secondRouter.map(item=>renderRouter(item))
            }
        </div>
    )
}

export default inject("pipelineStore")(observer(ProjectSetAside))
