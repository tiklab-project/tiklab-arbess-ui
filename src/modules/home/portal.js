import React  from "react";
import "./header.scss";
import {renderRoutes} from "react-router-config";
import Heads from "./header";

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
            title:'系统设置',
        }
    ]

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