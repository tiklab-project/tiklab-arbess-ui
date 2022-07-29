import React,{useEffect,useState} from "react";
import "./projectAside.scss";
import ProjectAsideOpt from "./projectAsideOpt";
import {PrivilegeButton} from "doublekit-privilege-ui";

const ProjectAside = props =>{

    const {pipelineName,setLastPath} = props

    let path = props.location.pathname
    const [nav,setNav] = useState("")

    useEffect(()=>{
        if (path.indexOf(`/index/task/${pipelineName}/assembly`) === 0) {
            path=`/index/task/${pipelineName}/assembly`
        }
        setLastPath(path.substring(path.lastIndexOf('/') + 1))
        setNav(path)
    },[path])

    const  taskRouters=[
        {
            to:`/index/task/${pipelineName}/work`,
            title:"工作空间",
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
        {
            to:`/index/task/${pipelineName}/assembly`,
            title: "设置",
            icon:"#icon-shezhi",
            key:"5",
            enCode:"DD"
        }
    ]

    const changeNav = item=>{
        props.history.push(item.to)
    }
    
    const renderTaskRouter = taskRouters => {
        return taskRouters && taskRouters.map(item=>{
            return(
                <PrivilegeButton code={item.enCode} key={item.key} {...props}>
                    <li key={item.key}
                        className={nav===item.to ? "aside_content aside_active" : "aside_content"}
                        onClick={()=>changeNav(item)}
                    >
                        <div className="aside_content_icon">
                            <svg className="icon" aria-hidden="true">
                                <use xlinkHref= {item.icon}/>
                            </svg>
                        </div>
                        <div className="aside_content_title">{item.title}</div>
                    </li>
                </PrivilegeButton>
            )
        })
    }

    return(
         <div className="aside">
            <ul  className="content">
                <ProjectAsideOpt{...props} path={path}/>
                { renderTaskRouter(taskRouters) }
            </ul>
        </div>
    )
}

export default ProjectAside
