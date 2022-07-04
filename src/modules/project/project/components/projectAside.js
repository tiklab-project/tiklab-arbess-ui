import React, {useEffect, useState} from "react";
import "./projectAside.scss";
import {Dropdown} from "antd";
import ProjectAsideOpt from "./projectAsideOpt";

const ProjectAside = props =>{

    const {pipelineList,visible,setVisible,isPrompt,setPipeline} = props

    const [nav,setNav] = useState("")
    let path = props.location.pathname

    useEffect(()=>{
        if (path.indexOf("/index/task/assembly") === 0) {
            path="/index/task/assembly"
        }
        setNav(path)
    },[path])

    const  taskRouters=[
        {
            to:"/index/task/work",
            title:"工作空间",
            icon:"#icon-gongzuotongji",
            key:"2",
        },
        {
            to:"/index/task/config",
            title: "配置",
            icon: "#icon-jiekoupeizhi",
            key:"3",
        },
        {
            to:"/index/task/structure",
            title: "历史",
            icon:"#icon-lishijishi",
            key:"4",
        },
        {
            to:"/index/task/assembly",
            title: "设置",
            icon:"#icon-shezhi",
            key:"5",
        }
    ]

    const changeNav = item=>{
        props.history.push(item.to)
        setVisible(false)
    }
    
    const renderTaskRouter = taskRouters => {
        return taskRouters && taskRouters.map(item=>{
            return(
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
            )
        })
    }

    return(
         <div className="aside">
            <ul  className="content">
                <ProjectAsideOpt
                    {...props}
                    setPipeline={setPipeline}
                    pipelineList={pipelineList}
                    visible={visible}
                    setVisible={setVisible}
                    isPrompt={isPrompt}
                />

                { renderTaskRouter(taskRouters) }
            </ul>
        </div>
    )
}

export default ProjectAside