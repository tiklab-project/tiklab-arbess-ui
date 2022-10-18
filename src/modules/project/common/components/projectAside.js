import React,{useEffect,useState} from "react";
import "./projectAside.scss";
import {PrivilegeButton} from "tiklab-privilege-ui";
import {Dropdown} from "antd";
import {CaretDownOutlined,SettingOutlined,TagOutlined} from "@ant-design/icons";
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
            to:`/index/task/${pipelineId}/work`,
            title:"概况",
            icon:"#icon-gongzuotongji",
            key:"2",
            enCode:"AA"
        },
        {
            to:`/index/task/${pipelineId}/config`,
            title: "配置",
            icon: "#icon-jiekoupeizhi",
            key:"3",
            enCode:"BB"
        },
        {
            to:`/index/task/${pipelineId}/structure`,
            title: "历史",
            icon:"#icon-lishijishi",
            key:"4",
            enCode:"CC"
        },
    ]

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

    const changeNav = item=>{
        props.history.push(item)
    }

    // 切换流水线的路由跳转
    const changePipeline = item => {
        if(pipelineName!==item.pipelineName){
            setState(0)
            setEnforcer(null)
            setMode(0)
            if(path.indexOf(`/index/task/${pipelineId}/assembly`) === 0) {
                props.history.push(`/index/task/${item.pipelineId}/assembly/${lastPath}`)
            }else {
                props.history.push(`/index/task/${item.pipelineId}/${lastPath}`)
            }
        }
    }

    // 切换项目菜单列表
    const pipelineMenu = item =>{
        return  <div onClick={()=>{changePipeline(item)}}
                     key={item.pipelineId}
                     className={`opt-content-group_item ${item.pipelineId===pipelineId?"opt-content-active":""}`}
                >
                    <span className="opt-content-group-icon">
                        <TagOutlined />
                    </span>
                    <span className="opt-content-group-name">
                        {item.pipelineName}
                    </span>
                </div>
    }

    // 切换项目菜单
    const changPipelineMenu = (
        <div className="opt">
            <div className="opt-content">
                <div className="opt-content-title">流水线名称</div>
                <div className="opt-content-group">
                    {
                        pipelineList && pipelineList.map(item=>{
                            return pipelineMenu(item)
                        })
                    }
                </div>
            </div>
        </div>
    )

    // 渲染左侧一级菜单
    const renderTaskRouter = item => {
        return   <PrivilegeButton code={item.enCode} key={item.key} {...props}>
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
    }

    // 渲染左侧弹出形式的二级菜单详情
    const renderSettingMenu = item => {
        return   <PrivilegeButton key={item.key} code={item.enCode} {...props}>
                    <div
                        className="projectSetMenu-li"
                        onClick={()=>changeNav(item.key)}
                        key={item.key}
                    >
                         <span className="projectSetMenu-li-icon">
                             <SettingOutlined/>
                         </span>
                         <span className="projectSetMenu-li-name">
                             {item.label}
                         </span>
                    </div>
                </PrivilegeButton>
    }

    // 左侧弹出形式的二级菜单
    const settingMenu = (
        <div className="projectSetMenu">
            <div className="projectSetMenu-ul">
                {
                    secondRouter && secondRouter.map(item=>{
                        return renderSettingMenu(item)
                    })
                }
            </div>
        </div>
    )

    return(
         <div className="aside">
            <ul  className="content">

                <Dropdown overlay={changPipelineMenu} trigger={["click"]} overlayStyle={{paddingLeft:10}}>
                    <li className="aside_content"
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

                {
                    firstRouters.map(item=>{
                        return renderTaskRouter(item)
                    })
                }

                <PrivilegeButton code={"DD"} {...props}>
                    <Dropdown overlay={settingMenu}>
                        <li
                            onClick={(e)=>e.preventDefault()}
                            className={`aside_content aside_item ${path.indexOf(`/index/task/${pipelineId}/assembly`) === 0 ? "aside_active": ""}`}
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
