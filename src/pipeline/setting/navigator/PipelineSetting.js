import React from "react";
import {ProjectNav,PrivilegeProjectButton} from "thoughtware-privilege-ui";
import {renderRoutes} from 'react-router-config';
import "./PipelineSetting.scss";

/**
 * 流水线左侧导航（三级导航）
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const PipelineSetting = props =>{

    const {route,match} = props

    let path = props.location.pathname
    const pipelineId = match.params.id

    // 左侧导航（三级标题）
    const secondRouter = [
        {
            id:`/pipeline/${pipelineId}/set/info`,
            title:"流水线信息",
            purviewCode:"pipeline_seting",
        },
        {
            id:`/pipeline/${pipelineId}/set/message`,
            title:"消息通知方案",
            purviewCode:"pip_message_notice",
        },
        {
            id:`/pipeline/${pipelineId}/set/user`,
            title:"成员",
            purviewCode:"pipeline_user",
        },
        {
            id:`/pipeline/${pipelineId}/set/role`,
            title:"权限",
            purviewCode:"pipeline_auth",
        },
    ]

    // 渲染菜单
    const navContent = item =>{
        return (
            <div key={item.id}
                 className={`project-nav-aside-item ${path === item.id ?"project-nav-aside-select":""} `}
                 onClick={()=>props.history.push(item.id)}
            >
                <span className="project-nav-aside-item-title">{item.title}</span>
            </div>
        )
    }

    const renderRouter = item => {
        return (
            <PrivilegeProjectButton key={item.id} code={item.purviewCode} domainId={pipelineId}>
                {navContent(item)}
            </PrivilegeProjectButton>
        )
    }

    return(
        <ProjectNav
            {...props}
            domainId={pipelineId}
            projectRouters={secondRouter}
            outerPath={`/pipeline/${pipelineId}/set`}
            noAccessPath={"/noaccess"}
        >
            <div className='project-nav'>
                <div className="project-nav-aside">
                    <div className='project-nav-aside-head'>设置</div>
                    {
                        secondRouter.map(item=>renderRouter(item))
                    }
                </div>
                <div className='project-nav-content'>
                    { renderRoutes(route.routes) }
                </div>
            </div>
        </ProjectNav>
    )
}

export default PipelineSetting
