import React,{useEffect,useState} from "react";
import "./projectAside.scss";
import {PrivilegeButton} from "tiklab-privilege-ui";
import {Dropdown} from "antd";
import {CaretDownOutlined,SettingOutlined} from "@ant-design/icons";
import {inject,observer} from "mobx-react";

const ProjectAside = props =>{

    const {pipelineStore,structureListStore} = props

    let path = props.location.pathname
    const [nav,setNav] = useState("")

    const {lastPath,setLastPath,pipelineName,pipelineList,pipelineId} = pipelineStore
    const {setState,setEnforcer,setMode} = structureListStore

    useEffect(()=>{
        setLastPath(path.substring(path.lastIndexOf('/') + 1))
        setNav(path)
    },[path])

    // 侧边第一栏导航
    const firstRouters=[
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

    // 侧边流水线设置的第二级导航
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

    // 切换流水线的路由跳转
    const changePipeline = item => {
        if(pipelineName!==item.pipelineName){
            setState(0)
            setEnforcer(null)
            setMode(0)
            if(path===`/index/task/${pipelineName}/assembly`){
                props.history.push(`/index/task/${item.pipelineName}/assembly`)
            }else if(path.indexOf(`/index/task/${pipelineName}/assembly`) === 0) {
                props.history.push(`/index/task/${item.pipelineName}/assembly/${lastPath}`)
            }else {
                props.history.push(`/index/task/${item.pipelineName}/${lastPath}`)
            }
        }
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

    const changPipelineMenu = (
        <div className="opt">
            <div className="opt-content">
                <div className="opt-content-title">流水线名称</div>
                <div className="opt-content-group">
                    {
                        pipelineList && pipelineList.map(item=>{
                            return(
                                <div onClick={()=>{changePipeline(item)}}
                                     key={item.pipelineId}
                                     className={`opt-content-group_item ${item.pipelineId===pipelineId ? "opt-content-active" : ""}`}
                                >
                                    <span className="opt-content-group-icon">
                                        <SettingOutlined/>
                                    </span>
                                    <span className="opt-content-group-name">
                                        {item.pipelineName}
                                    </span>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )

    const renderMenu = router => {
        return router.map(data=>{
            return  <PrivilegeButton key={data.key} code={data.enCode} {...props}>
                        <div
                            className="projectSetMenu-li"
                            onClick={()=>changeNav(data.key)}
                            key={data.key}
                        >
                            <span className="projectSetMenu-li-icon">
                                <SettingOutlined/>
                            </span>
                            <span className="projectSetMenu-li-name">
                                {data.label}
                            </span>
                        </div>
                    </PrivilegeButton>
        })
    }

    const secondMenu = (
        <div className="projectSetMenu">
            <div className="projectSetMenu-ul">
                {renderMenu(secondRouter)}
            </div>
        </div>
    )

    return(
         <div className="aside">
            <ul  className="content">
                <Dropdown overlay={changPipelineMenu} trigger={["click"]} overlayStyle={{paddingLeft:10}}>
                    <li className="aside_content aside_dropdown aside_opt"
                        onClick={(e)=>e.preventDefault()}
                    >
                        <span>
                            <svg  className="icon" aria-hidden="true">
                                <use xlinkHref="#icon-shaixuan1"/>
                            </svg>
                        </span>
                        <CaretDownOutlined className="dropdowns_icon"/>
                    </li>
                </Dropdown>
                { renderTaskRouter(firstRouters) }
                <PrivilegeButton code={"DD"} {...props}>
                    <Dropdown overlay={secondMenu} trigger={["click"]}>
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

export default inject("structureListStore")(observer(ProjectAside))
