import React,{useEffect,useState} from "react";
import {PrivilegeButton} from "tiklab-privilege-ui";
import {inject,observer} from "mobx-react";
import "./projectSetMenu.scss";

const ProjectSetMenu= props =>  {

    const {match,matFlowStore} = props

    const {setLastPath} = matFlowStore

    let path = props.location.pathname
    const matFlowName = match.params.matFlowName
    const [selectKey,setSelectKey] = useState(path)

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
            enCode:"DD1",
        },
        {
            key:`/index/task/${matFlowName}/assembly/role`,
            label:"角色管理",
            enCode:"DD2",
        },
        {
            key:`/index/task/${matFlowName}/assembly/proof`,
            label:"凭证管理",
            enCode:"DD3",
        },
        {
            key:`/index/task/${matFlowName}/assembly/redel`,
            label:"其他管理",
            enCode:"DD4",
        },
    ]

    const select = key =>{
        props.history.push(key)
    }

    const renderMenu = router => {
        return router.map(data=>{
            return  <PrivilegeButton key={data.key} code={data.enCode} {...props}>
                        <div
                            className="projectSetMenu-li"
                            onClick={()=>select(data.key)}
                            key={data.key}
                        >
                            <span>{data.label}</span>
                        </div>
                    </PrivilegeButton>
            })
    }

    return (
        <div className="projectSetMenu">
            <div className="projectSetMenu-ul">
                {renderMenu(router)}
            </div>
        </div>
    )
}

export default inject("matFlowStore")(observer(ProjectSetMenu))
