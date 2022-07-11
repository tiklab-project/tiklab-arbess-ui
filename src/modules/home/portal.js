import React ,{useEffect} from "react";
import "./header.scss";
import Heads from "./header";
import {privilegeStores} from "doublekit-privilege-ui";
import {getUser} from "doublekit-core-ui";
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
            key:"pipeline",
            to:"/index/pipeline",
            title: "流水线",
        },
        {
            key:"system",
            to:"/index/system",
            title:"系统设置",
        }
    ]

    // 导航控制
    useEffect(()=>{
        privilegeStores.systemRoleStore.getSystemPermissions(getUser().userId)
    },[])

    return(
        <div className="frame">
            <Heads {...props} routers={headerRoutes} />
            <div className="frame-content">
                {renderRoutes(route.routes)}
            </div>
        </div>
    )
}

export default Portal