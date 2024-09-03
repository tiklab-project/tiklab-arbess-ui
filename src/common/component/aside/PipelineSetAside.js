import React, {useState} from "react";
import {ProjectNav,PrivilegeProjectButton} from "thoughtware-privilege-ui";
import {renderRoutes} from 'react-router-config';
import "./PipelineSetAside.scss";
import {observer} from "mobx-react";
import {DownOutlined, UpOutlined} from "@ant-design/icons";

const PipelineSetAside = props =>{

    const {route,domainId,outerPath,projectRouters} = props

    const path = props.location.pathname;

    // 树的展开与闭合
    const [expandedTree,setExpandedTree] = useState([""])

    const isExpandedTree = key => expandedTree.some(item => item ===key)

    const select = (key) => {
        if (isExpandedTree(key)) {
            setExpandedTree(expandedTree.filter(item => item !== key))
        } else {
            setExpandedTree(expandedTree.concat(key))
        }
    }

    const menuHtml = (item,deep) => {
        return (
            <PrivilegeProjectButton key={item.id} code={item.purviewCode} domainId={domainId}>
                <div
                    key={item.id}
                    className={`project-nav-aside-item ${path === item.id ?"project-nav-aside-select":""} `}
                    onClick={()=>props.history.push(item.id)}
                    style={{paddingLeft: deep}}
                >
                    {item.title}
                </div>
            </PrivilegeProjectButton>
        )
    }

    const renderMenuHtml = (item,deep) => {
        return (
            <div key={item.id} className='project-nav-aside-ul'>
                <div
                    className="project-nav-aside-li"
                    onClick={()=>select(item.id)}
                    style={{paddingLeft: deep}}
                >
                    <div>{item.title}</div>
                    <div className="system-aside-item-icon">
                        {
                            item.children ?
                                (isExpandedTree(item.id)?
                                        <DownOutlined style={{fontSize: "10px"}}/> :
                                        <UpOutlined style={{fontSize: "10px"}}/>
                                ): ""
                        }
                    </div>
                </div>
                <div className={`project-nav-aside-ul ${isExpandedTree(item.id)?"":"project-nav-aside-hidden"}`}>
                    {
                        item.children && item.children.map(item =>{
                            const deepnew = deep + 15
                            return item.children && item.children.length ?
                                renderMenuHtml(item,deepnew) : menuHtml(item,deepnew)
                        })
                    }
                </div>
            </div>
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
                <div className={`project-nav-aside ${route.path === '/pipeline/:id/test' ? 'test-nav-aside' :'common-nav-aside'}`}>
                    <div className='project-nav-aside-head'>
                        {route.path === '/pipeline/:id/setting' && "设置"}
                        {route.path === '/pipeline/:id/test' && "测试报告"}
                        {route.path === '/pipeline/:id/statistics' && "统计"}
                    </div>
                    { projectRouters.map(item=>{
                        return item.children && item.children.length > 0 ?
                            renderMenuHtml(item,20) : menuHtml(item,20)
                    }) }
                </div>
                <div className='project-nav-content'>
                    { renderRoutes(route.routes) }
                </div>
            </div>
        </ProjectNav>
    )
}

export default observer(PipelineSetAside)
