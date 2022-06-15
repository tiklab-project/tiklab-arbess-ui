import React, {Fragment, useEffect, useState} from "react";
import {renderRoutes} from "react-router-config";
import SecondaryMenu from "../../asideMenu/secondaryMenu";

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

    return(
        <Fragment>
            <SecondaryMenu router={router} nav={nav}/>
            <div className='secure'>
                {renderRoutes(route.routes)}
            </div>
        </Fragment>
    )
}

export default Plug