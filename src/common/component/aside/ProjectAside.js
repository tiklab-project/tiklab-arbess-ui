import React from "react";
import {ProjectNav,PrivilegeProjectButton} from "thoughtware-privilege-ui";
import {renderRoutes} from 'react-router-config';
import "./ProjectAside.scss";

const ProjectAside = props =>{

    const {route,domainId,outerPath,projectRouters} = props

    const path = props.location.pathname

    //渲染菜单
    const navContent = item =>{
        return (
            <div
                key={item.id}
                className={`project-nav-aside-item ${path === item.id ?"project-nav-aside-select":""} `}
                onClick={()=>props.history.push(item.id)}
            >
                <span className="project-nav-aside-item-title">{item.title}</span>
            </div>
        )
    }

    const renderRouter = item => {
        return (
            <PrivilegeProjectButton key={item.id} code={item.purviewCode} domainId={domainId}>
                {navContent(item)}
            </PrivilegeProjectButton>
        )
    }

    return(
        <ProjectNav
            {...props}
            domainId={domainId}
            projectRouters={projectRouters}
            outerPath={outerPath}
            noAccessPath={"/noaccess"}
        >
            <div className='project-nav'>
                <div className="project-nav-aside">
                    <div className='project-nav-aside-head'>
                        {route.path === '/pipeline/:id/set' && "设置"}
                        {route.path === '/pipeline/:id/test' && "测试报告"}
                        {route.path === '/pipeline/:id/statistics' && "统计"}
                    </div>
                    { projectRouters.map(item=>renderRouter(item)) }
                </div>
                <div className='project-nav-content'>
                    { renderRoutes(route.routes) }
                </div>
            </div>
        </ProjectNav>
    )
}

export default ProjectAside
