import React from "react";
import {Menu} from "antd";
import {withRouter} from "react-router-dom";
import './secondaryMenu.scss';
import { PrivilegeButton } from 'doublekit-privilege-ui'

const {SubMenu} = Menu

const SecondarySubMenu = props =>{

    const { pipelineSysRouter,type,secureRouter } = props
    const path=props.location.pathname

    const getPipelineSysRouter = pipelineSysRouter => {
        return pipelineSysRouter.map(item=>{
            if(!item.children){
                return(
                    <PrivilegeButton  key={item.key} code={item.enCode} >
                        <Menu.Item  onClick={()=>onclick(item)}  key={item.key}>
                            <div className='left-content-nav'>
                                <div className='left-content-nav-icon'>
                                    {item.icon}
                                </div>
                                <div className='left-content-nav-title'>{item.label}</div>
                            </div>
                        </Menu.Item>
                    </PrivilegeButton>
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
                        >
                            {getPipelineSysRouter(item.children)}
                        </SubMenu>
                    </PrivilegeButton>
                )
            }
        })
    }

    const getSecureRouter = secureRouter => {
        return secureRouter.map(item=>{
            if(!item.children){
                return(
                    <Menu.Item key={item.key} onClick={()=>onclick(item)}>
                        <div className='left-content-nav' >
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
                        title={ <div className='left-content-nav'>
                            <div className='left-content-nav-icon'>
                                {item.icon}
                            </div>
                            <div className='left-content-nav-title'>{item.label}</div>
                        </div>}
                    >
                        {getSecureRouter(item.children)}
                    </SubMenu>
                )
            }
        })
    }

    const onclick = e => {
        props.history.push(e.key)
    }

    return(
        <div className='left'>
            <div className='left-content'>
                <Menu
                    mode={'inline'}
                    defaultOpenKeys={['1']}
                    defaultSelectedKeys={[
                        type==='sys'
                        ? '/index/task/assembly/role'
                        : '/index/system/secure/powerDomain'
                    ]}
                    selectedKeys={[path]}
                >
                    {
                        type==='sys' ?
                            getPipelineSysRouter(pipelineSysRouter)
                            :
                            getSecureRouter(secureRouter)
                    }
                </Menu>
            </div>
        </div>
    )
}

export default withRouter(SecondarySubMenu)