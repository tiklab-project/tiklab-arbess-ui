import React, { useEffect, useState} from "react";
import './plug.scss';
import SecondarySubMenuRender from "../../menu/renderMenu/secondarySubMenuRender";

const Plug = props =>{

    const {route}=props
    const path = props.location.pathname
    const [nav,setNav] = useState('')

    const router = [
        {
            key:1,
            title:'全部',
            to:'/index/system/plugin/depot',
            icon:'#icon-fenleiguanli',
            enCode:'21'
        },
        {
            key:2,
            title:'可更新',
            to:'/index/system/plugin/update',
            icon:'#icon-fenleiguanli',
            enCode:'22'
        },
        {
            key:3,
            title:'配置',
            to:'/index/system/plugin/deploy',
            icon:'#icon-fenleiguanli',
            enCode:'23'
        },
    ]

    useEffect(()=>{
        setNav(path)
    },[path])

    return  <SecondarySubMenuRender
                {...props}
                className={'plug'}
                router={router}
                route={route}
                nav={nav}
            />
}

export default Plug