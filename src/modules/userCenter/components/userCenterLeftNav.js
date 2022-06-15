import React, {useEffect, useState} from "react";
import SecondaryMenu from "../../asideMenu/secondaryMenu";

const UserCenterLeftNav = props =>{

    let path = props.location.pathname
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
        },
        {
            key:2,
            title:'用户列表',
            to:'/index/system/user/list',
            icon:'#icon-fenleiguanli',
        },
        {
            key:3,
            title:'用户视图',
            to:'/index/system/user/view',
            icon:'#icon-fenleiguanli'
        },
    ]

    return <SecondaryMenu router={router} nav={nav}/>
}

export default UserCenterLeftNav