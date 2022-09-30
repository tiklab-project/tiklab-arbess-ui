import React,{useEffect,useState} from "react";
import "./projectAside.scss";
import ProjectAsideOpt from "./projectAsideOpt";
import {PrivilegeButton} from "tiklab-privilege-ui";
import {Dropdown} from "antd";

const ProjectAside = props =>{

    const {pipelineName,setLastPath} = props

    let path = props.location.pathname
    const [nav,setNav] = useState("")

    useEffect(()=>{
        setLastPath(path.substring(path.lastIndexOf('/') + 1))
        setNav(path)
    },[path])

    const  firstRouters=[
        {
            to:`/index/task/${pipelineName}/work`,
            title:"概况",
            icon:"#icon-gongzuotongji",
            key:"2",
            enCode:"AA"
        },
        {
            to:`/index/task/${pipelineName}/config`,
            title: "配置",
            icon: "#icon-jiekoupeizhi",
            key:"3",
            enCode:"BB"
        },
        {
            to:`/index/task/${pipelineName}/structure`,
            title: "历史",
            icon:"#icon-lishijishi",
            key:"4",
            enCode:"CC"
        },
    ]

    const secondRouter = [
        {
            key:`/index/task/${pipelineName}/assembly/user`,
            label:"项目成员",
            enCode:"DD1",
        },
        {
            key:`/index/task/${pipelineName}/assembly/role`,
            label:"角色管理",
            enCode:"DD2",
        },
        {
            key:`/index/task/${pipelineName}/assembly/proof`,
            label:"凭证管理",
            enCode:"DD3",
        },
        {
            key:`/index/task/${pipelineName}/assembly/redel`,
            label:"其他管理",
            enCode:"DD4",
        },
    ]

    const changeNav = item=>{
        props.history.push(item)
    }
    
    const renderTaskRouter = taskRouters => {
        return taskRouters && taskRouters.map(item=>{
            return(
                <PrivilegeButton code={item.enCode} key={item.key} {...props}>
                    <li key={item.key}
                        className={`aside_content aside_item ${nav===item.to ? "aside_active": ""}`}
                        onClick={()=>changeNav(item.to)}
                    >
                        <div className="aside_content_icon">
                            <svg className="icon" aria-hidden="true">
                                <use xlinkHref = {item.icon}/>
                            </svg>
                        </div>
                        <div className="aside_content_title">{item.title}</div>
                    </li>
                </PrivilegeButton>
            )
        })
    }

    const renderMenu = router => {
        return router.map(data=>{
            return  <PrivilegeButton key={data.key} code={data.enCode} {...props}>
                        <div
                            className="projectSetMenu-li"
                            onClick={()=>changeNav(data.key)}
                            key={data.key}
                        >
                            <span>{data.label}</span>
                        </div>
                    </PrivilegeButton>
        })
    }

    const menu = (
        <div className="projectSetMenu">
            <div className="projectSetMenu-ul">
                {renderMenu(secondRouter)}
            </div>
        </div>
    )

    return(
         <div className="aside">
            <ul  className="content">
                <ProjectAsideOpt{...props} path={path}/>
                { renderTaskRouter(firstRouters) }
                <PrivilegeButton code={"DD"} {...props}>
                    <Dropdown overlay={menu}>
                        <li
                            onClick={(e)=>e.preventDefault()}
                            className={`aside_content aside_item ${path.indexOf(`/index/task/${pipelineName}/assembly`) === 0 ? "aside_active": ""}`}
                        >
                            <div className="aside_content_icon">
                                <svg className="icon" aria-hidden="true">
                                    <use xlinkHref="#icon-shezhi"/>
                                </svg>
                            </div>
                            <div className="aside_content_title">
                                设置
                            </div>
                        </li>
                     </Dropdown>
                </PrivilegeButton>
            </ul>
        </div>
    )
}

export default ProjectAside
