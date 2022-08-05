import React,{useEffect} from "react";
import "../components/header.scss";
import Heads from "../components/header";
import {privilegeStores} from "tiklab-privilege-ui/es/store";
import {getUser} from "tiklab-core-ui";
import {renderRoutes} from "react-router-config";

const Portal= props=>{

    const {route}=props

    const headerRoutes=[
        {
            key:"homePage",
            to:"/index/home",
            title: "首页",
        },
        {
            key:"matFlow",
            to:"/index/matFlow",
            title: "流水线",
        },
        {
            key:"system",
            to:"/index/system",
            title:"系统设置",
        }
    ]

    useEffect(()=>{
        // 导航控制
        privilegeStores.systemRoleStore.getSystemPermissions(getUser().userId)
    },[])

    return(
        <div className="frame">
            <Heads {...props} routers={headerRoutes}/>
            <div className="frame-content">
                {renderRoutes(route.routes)}
            </div>
        </div>
    )
}

export default Portal