import React from "react";
import {Menu} from "antd";
import {PrivilegeButton} from "doublekit-privilege-ui";

const {SubMenu} = Menu

const SystemAside = props =>{

    const {router} = props
    const path=props.location.pathname

    const getSystemRouter = router => {
        return router.map(item=>{
            if(!item.children){
                return(
                    <Menu.Item  onClick={()=>onclick(item)}  key={item.key}>
                        <div className='left-content-nav'>
                            <div className='left-content-nav-icon'>
                                <svg className="icon" aria-hidden="true">
                                    <use xlinkHref= {item.icon}/>
                                </svg>
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
                                    <svg className="icon" aria-hidden="true">
                                        <use xlinkHref= {item.icon}/>
                                    </svg>
                                </div>
                                <div className='left-content-nav-title'>{item.label}</div>
                            </div>}
                    >
                        {getSystemRouter(item.children)}
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
            style={{height:'100%'}}
            mode={'inline'}
            defaultOpenKeys={['1','3']}
            defaultSelectedKeys={['/index/system/user/base']}
            selectedKeys={[path]}
        >
            { getSystemRouter(router) }
        </Menu>
    )
}

export default SystemAside