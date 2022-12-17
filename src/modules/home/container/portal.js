import React from "react";
import {renderRoutes} from "react-router-config";
import Heads from "../components/header";
import "../components/header.scss";

const Portal= props=>{
    const {route}=props
    return(
        <div className="frame">
            <Heads/>
            <div className="frame-content">
                {renderRoutes(route.routes)}
            </div>
        </div>
    )
}

export default Portal