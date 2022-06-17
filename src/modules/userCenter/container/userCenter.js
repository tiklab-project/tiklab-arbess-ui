import React, {useEffect, useState} from "react";
import './userCenter.scss'
import SecondaryMenuRender from "../../menu/renderMenu/secondaryMenuRender";

const UserCenter = props =>{
    const {route}=props
    const path = props.location.pathname
    const [nav,setNav] = useState('')

    useEffect(()=>{
        setNav(path)
    },[path])

    const router = [
        {
            key:1,
            title:'基本信息',
            to:'/index/system/user/base',
            icon:'#icon-fenleiguanli',
            enCode:'12',
        },
        {
            key:2,
            title:'用户列表',
            to:'/index/system/user/list',
            icon:'#icon-fenleiguanli',
            enCode:'11',
        },
        {
            key:3,
            title:'用户视图',
            to:'/index/system/user/view',
            icon:'#icon-fenleiguanli',
            enCode:'13',
        },
    ]

    return  <SecondaryMenuRender
                {...props}
                className={'userCenter'}
                router={router}
                route={route}
                nav={nav}
            />
}

export default UserCenter