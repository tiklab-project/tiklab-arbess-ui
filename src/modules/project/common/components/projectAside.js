import React,{useEffect,useState} from "react";
import "./projectAside.scss";
import ProjectAsideOpt from "./projectAsideOpt";
import {PrivilegeButton} from "tiklab-privilege-ui";
import {Dropdown} from "antd";

const ProjectAside = props =>{

    const {matFlowName,setLastPath} = props

    let path = props.location.pathname
    const [nav,setNav] = useState("")

    useEffect(()=>{
        if (path.indexOf(`/index/task/${matFlowName}/assembly`) === 0) {
            path=`/index/task/${matFlowName}/assembly`
        }
        setLastPath(path.substring(path.lastIndexOf('/') + 1))
        setNav(path)
    },[path])

    const  taskRouters=[
        {
            to:`/index/task/${matFlowName}/work`,
            title:"概况",
            icon:"#icon-gongzuotongji",
            key:"2",
            enCode:"AA"
        },
        {
            to:`/index/task/${matFlowName}/config`,
            title: "配置",
            icon: "#icon-jiekoupeizhi",
            key:"3",
            enCode:"BB"
        },
        {
            to:`/index/task/${matFlowName}/structure`,
            title: "历史",
            icon:"#icon-lishijishi",
            key:"4",
            enCode:"CC"
        },
    ]

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

    const changeNav = item=>{
        props.history.push(item)
    }
    
    const renderTaskRouter = taskRouters => {
        return taskRouters && taskRouters.map(item=>{
            return(
                <PrivilegeButton code={item.enCode} key={item.key} {...props}>
                    <li key={item.key}
                        className={nav===item.to ? "aside_content aside_active" : "aside_content"}
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
                {renderMenu(router)}
            </div>
        </div>
    )

    return(
         <div className="aside">
            <ul  className="content">
                <ProjectAsideOpt{...props} path={path}/>
                { renderTaskRouter(taskRouters) }
                <PrivilegeButton code={"DD"} {...props}>
                    <Dropdown overlay={menu}>
                        <li
                            onClick={(e)=>e.preventDefault()}
                            className={path.indexOf(`/index/task/${matFlowName}/assembly`) === 0 ? "aside_content aside_active" : "aside_content"}
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
