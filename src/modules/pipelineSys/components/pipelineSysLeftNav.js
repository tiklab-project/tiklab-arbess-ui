import React,{useState,useEffect} from "react";
import {Menu} from "antd";
import '../../asideMenu/secondaryMenu.scss'

const {SubMenu} = Menu

const PipelineSysLeftNav = props =>{

    // const [nav,setNav] = useState('')
    // const path = props.location.pathname

    const route = [
        {
            key:1,
            title:'角色设置',
            icon:'#icon-fenleiguanli',
            children:[
                {
                    key:11,
                    to:'/index/task/assembly/domain',
                    title:'功能设置',
                    icon:'#icon-fenleiguanli',
                },
                {
                    key:12,
                    to:'/index/task/assembly/role',
                    title:'角色设置',
                    icon:'#icon-fenleiguanli',
                }
            ]
        },
        {
            key:2,
            to:'/index/task/assembly/membro',
            title:'成员设置',
            icon:'#icon-fenleiguanli',
        },
        {
            key:3,
            to:'/index/task/assembly/proof',
            title:'凭证设置',
            icon:'#icon-fenleiguanli'
        },
        {
            key:4,
            to:'/index/task/assembly/other',
            title:'其他设置',
            icon:'#icon-fenleiguanli',
        },
    ]
    
    const onclick = item => {
        props.history.push(item.to)
    }

    const getRouter = route =>{
        return route.map(item=>{
            if(!item.children){
                return(
                    <Menu.Item key={item.key} onClick={()=>onclick(item)}>
                        <div className='left-content-nav'>
                            <div className='left-content-nav-icon'>
                                <svg className="icon" aria-hidden="true">
                                    <use xlinkHref={item.icon}/>
                                </svg>
                            </div>
                            <div className='left-content-nav-title'>{item.title}</div>
                        </div>
                    </Menu.Item>
                )
            }else {
                return (
                    <SubMenu key={item.key} title={
                        <div className='left-content-nav'>
                            <div className='left-content-nav-icon'>
                                <svg className="icon" aria-hidden="true">
                                    <use xlinkHref={item.icon}/>
                                </svg>
                            </div>
                            <div className='left-content-nav-title'>{item.title}</div>
                        </div>
                    }>
                        {getRouter(item.children)}
                    </SubMenu>
                )
            }
        })
    }

    return(
        <div className='left'>
            <div className='left-content'>
                <Menu
                    mode="inline"
                    defaultSelectedKeys={[11]}
                    defaultOpenKeys={[11]}
                >
                    { getRouter(route) }
                </Menu>
            </div>
        </div>
    )
}

export default PipelineSysLeftNav