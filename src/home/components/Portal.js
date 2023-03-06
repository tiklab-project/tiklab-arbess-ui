import React from "react";
import {renderRoutes} from "react-router-config";
import Header from "./Header";
import "./Header.scss";

/**
 * 首页
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Portal= props=>{
    const {route}=props
    return(
        <div className="frame">
            <Header {...props}/>
            <div className="frame-content">
                {renderRoutes(route.routes)}
            </div>
        </div>
    )
}

export default Portal
