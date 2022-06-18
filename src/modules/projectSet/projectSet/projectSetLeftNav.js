import React from "react";
import {Menu} from "antd";
import {PrivilegeButton} from "doublekit-privilege-ui";

const {SubMenu} = Menu
const ProjectSetLeftNav = props =>{

    const {router} = props
    const path=props.location.pathname

    const getPipelineSysRouter = router => {
        return router.map(item=>{
            if(!item.children){
                return(
                    <Menu.Item  onClick={()=>onclick(item)}  key={item.key}>
                        <div className='left-content-nav'>
                            <div className='left-content-nav-icon'>
                                {item.icon}
                            </div>
                            <div className='left-content-nav-title'>{item.label}</div>
                        </div>
                    </Menu.Item>
                )
            }else {
                return (
                    <SubMenu
                        key={item.key}
                        title={
                            <div className='left-content-nav'>
                                <div className='left-content-nav-icon'>
                                    {item.icon}
                                </div>
                                <div className='left-content-nav-title'>{item.label}</div>
                            </div>}
                    >
                        {getPipelineSysRouter(item.children)}
                    </SubMenu>
                )
            }
        })
    }

    const onclick = e => {
        props.history.push(e.key)
    }

    return(
        <Menu
            style={{height:'100%',background:'#f8f8f8',paddingTop:20}}
            mode={'inline'}
            defaultOpenKeys={['/index/task/assembly/user','1']}
            defaultSelectedKeys={['/index/task/assembly/user']}
            selectedKeys={[path]}
        >
            { getPipelineSysRouter(router) }
        </Menu>
    )
}

export default ProjectSetLeftNav