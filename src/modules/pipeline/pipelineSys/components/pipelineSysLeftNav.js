import React from "react";
import {Menu} from "antd";
import {PrivilegeButton} from "doublekit-privilege-ui";

const {SubMenu} = Menu
const PipelineSysLeftNav = props =>{

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
                    <PrivilegeButton  key={item.key} code={item.enCode} >
                        <SubMenu
                            key={item.key}
                            title={
                                <div className='left-content-nav'>
                                    <div className='left-content-nav-icon'>
                                        {item.icon}
                                    </div>
                                    <div className='left-content-nav-title'>{item.label}</div>
                                </div>}
                            style={{paddingLeft:25}}
                        >
                            {getPipelineSysRouter(item.children)}
                        </SubMenu>
                    </PrivilegeButton>
                )
            }
        })
    }

    const onclick = e => {
        props.history.push(e.key)
    }

    return(
        <Menu
            style={{height:'100%'}}
            mode={'inline'}
            defaultOpenKeys={['1']}
            defaultSelectedKeys={['/index/task/assembly/domain']}
            selectedKeys={[path]}
        >
            { getPipelineSysRouter(router) }
        </Menu>
    )
}

export default PipelineSysLeftNav