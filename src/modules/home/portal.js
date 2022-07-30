import React,{useEffect} from "react";
import "./header.scss";
import Heads from "./header";
import {privilegeStores} from "tiklab-privilege-ui/es/store";
import {getUser} from "tiklab-core-ui";
import {renderRoutes} from "react-router-config";
import {inject,observer} from "mobx-react";

const Portal= props=>{

    const {route,configItemStore}=props
    const {fileAddress} = configItemStore

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
        // 全局配置文件地址(默认值)
        fileAddress()
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

export default inject("configItemStore")(observer(Portal))