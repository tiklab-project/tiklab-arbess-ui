import React,{useState,useEffect} from "react";
import {PrivilegeProjectButton} from "tiklab-privilege-ui";
import {observer} from "mobx-react";
import "./projectSetAside.scss";

const ProjectSetAside = props =>{

    const {location,match} = props

    let path = location.pathname
    const pipelineId = match.params.id
    const [nav,setNav] = useState("")

    useEffect(()=>{
        setNav(path)
    },[path])

    // 侧边流水线设置的第二级导航
    const secondRouter = [
        {
            key:`/index/pipeline/${pipelineId}/assembly/set`,
            label:"流水线信息",
            enCode:"pipeline_seting",
        },
        {
            key:`/index/pipeline/${pipelineId}/assembly/user`,
            label:"成员",
            enCode:"pipeline_user",
        },
        {
            key:`/index/pipeline/${pipelineId}/assembly/role`,
            label:"权限",
            enCode:"pipeline_auth",
        }
    ]

    const navContent = item =>{
        return <div key={item.key}
                    className={`projectSet-aside-item ${nav===item.key?"projectSet-aside-select":""} `}
                    onClick={()=>props.history.push(item.key)}
                >
                    <span className="projectSet-aside-item-label">{item.label}</span>
             </div>
    }

    const renderRouter = item => {
        return  <PrivilegeProjectButton key={item.key} code={item.enCode} domainId={pipelineId}>
                    {navContent(item)}
                </PrivilegeProjectButton>
    }



    return(
        <div className="projectSet-aside">
            <div className='projectSet-aside-head'>设置</div>
            {
                secondRouter.map(item=>renderRouter(item))
            }
        </div>
    )
}

export default observer(ProjectSetAside)
