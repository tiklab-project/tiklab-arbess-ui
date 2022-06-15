import React, {Fragment, useEffect, useState} from "react";
import {renderRoutes} from "react-router-config";
import './userCenter.scss'
import SecondaryMenu from "../../asideMenu/secondaryMenu";

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

    return(
        <Fragment>
            <SecondaryMenu {...props} router={router} nav={nav}/>
            <div className='userCenter'>
                {renderRoutes(route.routes)}
            </div>
        </Fragment>
    )
}

export default UserCenter