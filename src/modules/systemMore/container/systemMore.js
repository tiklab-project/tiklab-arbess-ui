import React, {Fragment, useEffect, useState} from "react";
import {renderRoutes} from "react-router-config";
import SecondaryMenu from "../../asideMenu/secondaryMenu";
import './systemMore.scss';

const SystemMore = props =>{
    const {route}=props
    const path = props.location.pathname
    const [nav,setNav] = useState('')

    const router = [
        {
            key:1,
            title:'系统信息',
            to:'/index/system/other/info',
            icon:'#icon-fenleiguanli',
            enCode:'41',
        },
        {
            key:2,
            title:'系统日志',
            to:'/index/system/other/log',
            icon:'#icon-fenleiguanli',
            enCode:'42',
        },
    ]

    useEffect(()=>{
        setNav(path)
    },[path])

    return(
        <Fragment>
            <SecondaryMenu {...props} router={router} nav={nav}/>
            <div className='systemMore'>
                {renderRoutes(route.routes)}
            </div>
        </Fragment>
    )
}

export default SystemMore